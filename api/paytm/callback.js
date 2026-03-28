import https from "https";
import PaytmChecksum from "paytmchecksum";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const paytmResponse = req.body;
  const merchantKey = process.env.PAYTM_MERCHANT_KEY;
  const mid = process.env.PAYTM_MID;
  const isStaging = (process.env.PAYTM_ENV || "staging") === "staging";
  const hostname = isStaging ? "securegw-stage.paytm.in" : "securegw.paytm.in";

  if (!merchantKey || !mid) {
    return sendRedirect(res, "error", "Server configuration error", null);
  }

  try {
    // Step 1: Verify the checksum from Paytm callback
    const paytmChecksum = paytmResponse.CHECKSUMHASH;
    const receivedData = { ...paytmResponse };
    delete receivedData.CHECKSUMHASH;

    const isVerified = PaytmChecksum.verifySignature(receivedData, merchantKey, paytmChecksum);

    if (!isVerified) {
      console.error("Checksum verification failed for order:", paytmResponse.ORDERID);
      return sendRedirect(res, "error", "Payment verification failed — checksum mismatch", paytmResponse.ORDERID);
    }

    // Step 2: Server-to-server verification via Transaction Status API
    const statusResult = await verifyTransactionStatus(mid, paytmResponse.ORDERID, merchantKey, hostname);

    const txnStatus = statusResult?.body?.resultInfo?.resultStatus;
    const txnMsg = statusResult?.body?.resultInfo?.resultMsg || "Unknown";
    const txnId = statusResult?.body?.txnId || paytmResponse.TXNID || "";
    const txnAmount = statusResult?.body?.txnAmount || paytmResponse.TXNAMOUNT || "";

    if (txnStatus === "TXN_SUCCESS") {
      return sendRedirect(res, "success", txnMsg, paytmResponse.ORDERID, txnId, txnAmount);
    } else if (txnStatus === "PENDING") {
      return sendRedirect(res, "pending", txnMsg, paytmResponse.ORDERID, txnId, txnAmount);
    } else {
      return sendRedirect(res, "failure", txnMsg, paytmResponse.ORDERID, txnId, txnAmount);
    }
  } catch (error) {
    console.error("Callback processing error:", error);
    return sendRedirect(res, "error", "Payment processing error", paytmResponse.ORDERID || null);
  }
}

/**
 * Verify transaction status with Paytm's server-to-server API
 */
function verifyTransactionStatus(mid, orderId, merchantKey, hostname) {
  return new Promise(async (resolve, reject) => {
    const paytmParams = {
      body: {
        mid: mid,
        orderId: orderId,
      },
    };

    try {
      const checksum = await PaytmChecksum.generateSignature(
        JSON.stringify(paytmParams.body),
        merchantKey
      );

      paytmParams.head = {
        signature: checksum,
      };

      const postData = JSON.stringify(paytmParams);

      const options = {
        hostname: hostname,
        port: 443,
        path: "/v3/order/status",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData),
        },
      };

      const request = https.request(options, (response) => {
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error("Failed to parse status response"));
          }
        });
      });

      request.on("error", reject);
      request.write(postData);
      request.end();
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Send HTML redirect back to the frontend with payment status
 */
function sendRedirect(res, status, message, orderId, txnId = "", amount = "") {
  const origin = process.env.PAYTM_CALLBACK_URL || "https://palmonas-jewel-haven-main.vercel.app";
  const params = new URLSearchParams({
    status,
    message: encodeURIComponent(message || ""),
    orderId: orderId || "",
    txnId: txnId || "",
    amount: amount || "",
  });
  const redirectUrl = `${origin}/payment-status?${params.toString()}`;

  // Send an HTML page that auto-redirects (Paytm callback is a form POST, so we need a page)
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Processing Payment...</title>
        <meta http-equiv="refresh" content="0;url=${redirectUrl}" />
      </head>
      <body>
        <p>Processing your payment... If you are not redirected, <a href="${redirectUrl}">click here</a>.</p>
        <script>window.location.href = "${redirectUrl}";</script>
      </body>
    </html>
  `);
}

import https from "https";
import PaytmChecksum from "paytmchecksum";

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { orderId, amount, customerId } = req.body;

  if (!orderId || !amount || !customerId) {
    return res.status(400).json({ error: "Missing required fields: orderId, amount, customerId" });
  }

  const mid = process.env.PAYTM_MID;
  const merchantKey = process.env.PAYTM_MERCHANT_KEY;
  const website = process.env.PAYTM_WEBSITE || "WEBSTAGING";
  const isStaging = (process.env.PAYTM_ENV || "staging") === "staging";
  const hostname = isStaging ? "securegw-stage.paytm.in" : "securegw.paytm.in";
  const callbackUrl = `${req.headers.origin || process.env.PAYTM_CALLBACK_URL || "https://palmonas-jewel-haven-main.vercel.app"}/api/paytm/callback`;

  if (!mid || !merchantKey) {
    return res.status(500).json({ error: "Paytm credentials not configured on server" });
  }

  // Build the request body for Initiate Transaction API
  const paytmParams = {
    body: {
      requestType: "Payment",
      mid: mid,
      websiteName: website,
      orderId: orderId,
      callbackUrl: callbackUrl,
      txnAmount: {
        value: String(amount),
        currency: "INR",
      },
      userInfo: {
        custId: customerId,
      },
    },
  };

  try {
    // Generate checksum
    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      merchantKey
    );

    paytmParams.head = {
      signature: checksum,
    };

    const postData = JSON.stringify(paytmParams);

    // Call Paytm Initiate Transaction API
    const txnToken = await new Promise((resolve, reject) => {
      const options = {
        hostname: hostname,
        port: 443,
        path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
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
            const parsed = JSON.parse(data);
            resolve(parsed);
          } catch (e) {
            reject(new Error("Failed to parse Paytm response"));
          }
        });
      });

      request.on("error", (e) => {
        reject(e);
      });

      request.write(postData);
      request.end();
    });

    // Check for errors in Paytm response
    if (txnToken.body && txnToken.body.resultInfo && txnToken.body.resultInfo.resultStatus === "F") {
      return res.status(400).json({
        error: txnToken.body.resultInfo.resultMsg || "Failed to initiate transaction",
        details: txnToken.body.resultInfo,
      });
    }

    // Return the transaction token
    return res.status(200).json({
      txnToken: txnToken.body?.txnToken,
      orderId: orderId,
      mid: mid,
      amount: String(amount),
      hostname: hostname,
    });
  } catch (error) {
    console.error("Paytm initiate error:", error);
    return res.status(500).json({ error: "Failed to initiate payment", details: error.message });
  }
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ShippingPolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 px-6 lg:px-12 container mx-auto max-w-4xl">
        <h1 className="font-heading text-3xl mb-8">Shipping Policy</h1>
        <div className="prose prose-sm max-w-none text-muted-foreground font-light leading-relaxed">
          {/* TODO: PLACEHOLDER_TEXT - Standard Shipping Policy */}
          <p>We craft each of our items with precision and love. Please review our shipping policy below.</p>
          
          <h2 className="text-foreground font-semibold mt-8 mb-4">Processing Time</h2>
          <p>All orders are processed within 1-3 business days. Customized items may require an additional 2-4 days. You will receive another notification when your order has shipped. PLACEHOLDER_TEXT</p>
          
          <h2 className="text-foreground font-semibold mt-8 mb-4">Estimated Delivery Time</h2>
          <p>Standard delivery typically takes 5-7 business days from the date of dispatch. Delivery times may vary depending on your location and carrier delays. PLACEHOLDER_TEXT</p>

          <h2 className="text-foreground font-semibold mt-8 mb-4">Shipping Rates</h2>
          <p>Shipping charges for your order will be calculated and displayed at checkout. We offer standard flat-rate shipping options. PLACEHOLDER_TEXT</p>

          <h2 className="text-foreground font-semibold mt-8 mb-4">International Shipping</h2>
          <p>We currently only ship domestic orders. We are looking into offering international shipping soon! PLACEHOLDER_TEXT</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingPolicyPage;

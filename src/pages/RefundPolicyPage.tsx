import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 px-6 lg:px-12 container mx-auto max-w-4xl">
        <h1 className="font-heading text-3xl mb-8">Refund Policy</h1>
        <div className="prose prose-sm max-w-none text-muted-foreground font-light leading-relaxed">
          {/* TODO: PLACEHOLDER_TEXT - Standard Refund Policy */}
          <p>We want you to be completely satisfied with your purchase. As our items are handcrafted with care, we have a specific return and refund policy:</p>
          
          <h2 className="text-foreground font-semibold mt-8 mb-4">7-Day Return Policy</h2>
          <p>You have 7 days after receiving your item to request a return. PLACEHOLDER_TEXT</p>
          
          <h2 className="text-foreground font-semibold mt-8 mb-4">Eligibility</h2>
          <p>To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You'll also need the receipt or proof of purchase.</p>

          <h2 className="text-foreground font-semibold mt-8 mb-4">Exceptions / Non-returnable items</h2>
          <p>Certain types of items cannot be returned, like custom products (such as special orders or personalized items). Please get in touch if you have questions or concerns about your specific item.</p>

          <h2 className="text-foreground font-semibold mt-8 mb-4">Refunds</h2>
          <p>We will notify you once we've received and inspected your return, and let you know if the refund was approved or not. If approved, you'll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RefundPolicyPage;

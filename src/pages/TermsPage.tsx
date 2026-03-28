import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 px-6 lg:px-12 container mx-auto max-w-4xl">
        <h1 className="font-heading text-3xl mb-8">Terms of Service</h1>
        <div className="prose prose-sm max-w-none text-muted-foreground font-light leading-relaxed">
          {/* TODO: PLACEHOLDER_TEXT - Standard Terms & Conditions */}
          <p>Welcome to our website. By accessing or using this website, you agree to comply with and be bound by the following terms and conditions of use. PLACEHOLDER_TEXT</p>
          
          <h2 className="text-foreground font-semibold mt-8 mb-4">1. General Conditions</h2>
          <p>We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve transmissions over various networks.</p>
          
          <h2 className="text-foreground font-semibold mt-8 mb-4">2. Products or Services</h2>
          <p>Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy. PLACEHOLDER_TEXT</p>

          <h2 className="text-foreground font-semibold mt-8 mb-4">3. Accuracy of Billing and Account Information</h2>
          <p>We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. PLACEHOLDER_TEXT</p>

          <h2 className="text-foreground font-semibold mt-8 mb-4">4. Personal Information</h2>
          <p>Your submission of personal information through the store is governed by our Privacy Policy. PLACEHOLDER_TEXT</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage;

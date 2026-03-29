import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import FlashSaleBanner from "@/components/FlashSaleBanner";
import BestSellersSection from "@/components/BestSellersSection";
import NewArrivalsSection from "@/components/NewArrivalsSection";
import BrandStorySection from "@/components/BrandStorySection";
import ReviewsSection from "@/components/ReviewsSection";
import NewsletterSection from "@/components/NewsletterSection";
import InstagramSection from "@/components/InstagramSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <CategorySection />
        <FlashSaleBanner />
        <BestSellersSection />
        <NewArrivalsSection />
        <BrandStorySection />
        <ReviewsSection />
        <NewsletterSection />
        <InstagramSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import BrandStorySection from "@/components/BrandStorySection";
import ReviewsSection from "@/components/ReviewsSection";
import InstagramSection from "@/components/InstagramSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <CategorySection />
        <BrandStorySection />
        <ReviewsSection />
        <InstagramSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

import { motion } from "framer-motion";
import craftsmanshipImg from "@/assets/crochet-tulips.jpg";

const BrandStorySection = () => {
  return (
    <section className="py-20 lg:py-28 bg-craft-warm/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden rounded-3xl shadow-lg"
          >
            <img
              src={craftsmanshipImg}
              alt="Handmade crochet tulips by MS DIY"
              className="w-full h-auto object-cover"
              loading="lazy"
              width={1200}
              height={800}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-3">Our Story</p>
            <h2 className="font-heading text-3xl lg:text-4xl mb-6">Crafted with Love</h2>
            <div className="craft-divider !mx-0 mb-8" />
            <p className="text-muted-foreground font-light leading-relaxed mb-6">
              At MS DIY, every piece is lovingly handmade — from delicate crochet flowers that never wilt,
              to stunning fuzzywire art, unique bracelets, cute phone charms, and traditional lippan art. We believe in
              the beauty of handmade art and the joy it brings.
            </p>
            <p className="text-muted-foreground font-light leading-relaxed mb-8">
              Each creation is crafted with premium materials, with attention to every stitch and detail.
              Whether it's a gift for a loved one or a treat for yourself, our pieces are made to be treasured.
            </p>
            <a
              href="https://www.instagram.com/diy_by_nandini?igsh=MWwzeGtvemMxbWVldA=="
              target="_blank"
              rel="noopener noreferrer"
              className="craft-btn-outline"
            >
              Discover More
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStorySection;

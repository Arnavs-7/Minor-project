import { motion } from "framer-motion";
import { Instagram, ExternalLink } from "lucide-react";
import bowKeychain from "@/assets/bow-keychain.jpg";
import pastelTulips from "@/assets/pastel-tulips.jpg";
import lilyValleyHanging from "@/assets/lily-valley-hanging.jpg";
import jellyfishKeychains from "@/assets/jellyfish-keychains.jpg";
import lilyFlowers from "@/assets/lily-flowers.jpg";
import lilyBouquetWrapped from "@/assets/lily-bouquet-wrapped.jpg";
import crochetTulips from "@/assets/crochet-tulips.jpg";
import pinkLilyBouquet from "@/assets/pink-lily-bouquet.jpg";

const INSTAGRAM_URL = "https://www.instagram.com/diy_by_nandini?igsh=MWwzeGtvemMxbWVldA==";
const INSTAGRAM_HANDLE = "@diy_by_nandini";

const images = [
  bowKeychain, pastelTulips, lilyValleyHanging, jellyfishKeychains,
  lilyFlowers, lilyBouquetWrapped, crochetTulips, pinkLilyBouquet,
];

const InstagramSection = () => {
  return (
    <section id="instagram" className="py-20 lg:py-28 bg-craft-warm/30">
      <div className="container mx-auto px-4 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Instagram size={20} strokeWidth={1.5} className="text-primary" />
            <p className="text-sm tracking-[0.15em] uppercase text-primary font-semibold">{INSTAGRAM_HANDLE}</p>
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl mb-3">Follow Us on Instagram</h2>
          <div className="craft-divider mb-6" />
          <p className="text-sm text-muted-foreground max-w-md mx-auto font-light leading-relaxed">
            Stay updated with our latest handmade creations, behind-the-scenes crafting, and exclusive drops!
          </p>
        </motion.div>

        {/* Image grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 mb-10">
          {images.map((img, i) => (
            <motion.a
              key={i}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="group aspect-square overflow-hidden relative rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={img}
                alt={`Instagram post ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center rounded-2xl">
                <Instagram
                  size={28}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                  strokeWidth={1.5}
                />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="craft-btn inline-flex items-center gap-2"
          >
            <Instagram size={16} />
            Follow {INSTAGRAM_HANDLE}
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramSection;

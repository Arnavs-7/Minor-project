import { motion } from "framer-motion";
import { Instagram, ExternalLink } from "lucide-react";
import bowKeychain from "@/assets/bow-keychain.jpg";
import pastelTulips from "@/assets/pastel-tulips.jpg";
import lilyValleyHanging from "@/assets/lily-valley-hanging.jpg";
import jellyfishKeychains from "@/assets/jellyfish-keychains.jpg";
import lilyFlowers from "@/assets/lily-flowers.jpg";
import lilyBouquetWrapped from "@/assets/lily-bouquet-wrapped.jpg";

const INSTAGRAM_URL = "https://www.instagram.com/diy_by_nandini?igsh=MWwzeGtvemMxbWVldA==";
const INSTAGRAM_HANDLE = "@diy_by_nandini";

const images = [bowKeychain, pastelTulips, lilyValleyHanging, jellyfishKeychains, lilyFlowers, lilyBouquetWrapped];

const InstagramSection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-12 text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Instagram size={16} strokeWidth={1.5} className="text-champagne" />
          <p className="text-xs tracking-[0.3em] uppercase text-champagne">{INSTAGRAM_HANDLE}</p>
        </div>
        <h2 className="font-heading text-3xl lg:text-4xl mb-4">Follow Us on Instagram</h2>
        <p className="text-sm text-muted-foreground font-light mb-6 max-w-md mx-auto">
          Get inspired by our latest creations, behind-the-scenes, and customer favourites.
        </p>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="luxury-btn-outline inline-flex items-center gap-2"
        >
          <Instagram size={14} strokeWidth={1.5} />
          Follow {INSTAGRAM_HANDLE}
          <ExternalLink size={12} strokeWidth={1.5} />
        </a>
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-6 gap-1">
        {images.map((img, i) => (
          <motion.a
            key={i}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="group aspect-square overflow-hidden relative"
          >
            <img
              src={img}
              alt="Instagram post"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/30 transition-colors duration-300 flex items-center justify-center">
              <Instagram
                size={24}
                className="text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                strokeWidth={1.5}
              />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default InstagramSection;

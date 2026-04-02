import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import bowKeychain from "@/assets/bow-keychain.jpg";
import pastelTulips from "@/assets/pastel-tulips.jpg";
import lilyBouquetWrapped from "@/assets/lily-bouquet-wrapped.jpg";
import lilyValleyHanging from "@/assets/lily-valley-hanging.jpg";
import lilyFlowers from "@/assets/lily-flowers.jpg";
import pinkLilyBouquet from "@/assets/pink-lily-bouquet.jpg";
import catBracelets from "@/assets/cat-bracelets.jpg";
import jellyfishKeychains from "@/assets/jellyfish-keychains.jpg";
import craftsmanship from "@/assets/craftsmanship.jpg";

const categoryCards = [
  { name: "Keychains", image: bowKeychain, path: "/keychains" },
  { name: "Crochet Flowers", image: pastelTulips, path: "/crochet-flowers" },
  { name: "Flower Bouquet", image: lilyBouquetWrapped, path: "/flower-bouquet" },
  { name: "Car Hangings", image: lilyValleyHanging, path: "/car-hangings" },
  { name: "Fuzzywire Flowers", image: lilyFlowers, path: "/fuzzywire-flowers" },
  { name: "Fuzzywire Bouquet", image: pinkLilyBouquet, path: "/fuzzywire-bouquet" },
  { name: "Flower Pots", image: pastelTulips, path: "/flower-pots" },
  { name: "Bracelets", image: catBracelets, path: "/bracelets" },
  { name: "Phone Charms", image: jellyfishKeychains, path: "/phone-charms" },
  { name: "Lippan Art", image: craftsmanship, path: "/lippan-art" },
];

const CategorySection = () => {
  return (
    <section id="categories" className="py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-champagne mb-3">Explore</p>
          <h2 className="font-heading text-3xl lg:text-4xl">Shop by Category</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {categoryCards.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
            >
              <Link to={cat.path} className="group block">
                <div className="aspect-square overflow-hidden mb-3">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    width={400}
                    height={400}
                  />
                </div>
                <h3 className="text-center text-[11px] tracking-[0.18em] uppercase text-foreground group-hover:text-champagne transition-colors duration-300">
                  {cat.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

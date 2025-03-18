import React from "react";
import "@/presentation/styles/globals.css";
import { CldImage } from "next-cloudinary";
import { servicesUrls } from "@/infrastructure/constants/servicesUrls";
import { motion } from "motion/react";

const CharactersMobile = () => {
  return (
    <div className="relative h-[240px] md:h-[398px] w-full max-w-[662px] mx-auto xl:hidden">
      <motion.div
        initial={{ opacity: 0, transform: "translateY(20px)" }}
        transition={{ duration: 0.5, delay: 0.5 }}
        whileInView={{ opacity: 1, transform: "translateY(0)" }}
        className="absolute bottom-0 left-0 z-10"
      >
        <CldImage
          width="137"
          height="225"
          src={`${servicesUrls.cloudinary}branch/mechanic-female`}
          alt={"mechanic-female"}
          format="svg"
          className="md:w-[227px] md:h-[371px]"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, transform: "translateY(20px)" }}
        transition={{ duration: 0.5, delay: 0.7 }}
        whileInView={{ opacity: 1, transform: "translateY(0)" }}
        className="absolute bottom-0 left-[120px] z-10 md:left-[175px]"
      >
        <CldImage
          width="127"
          height="231"
          src={`${servicesUrls.cloudinary}branch/client-mobile`}
          alt={"client-mobile"}
          format="svg"
          className="md:w-[209px] md:h-[382px]"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, transform: "translateY(20px)" }}
        transition={{ duration: 0.5, delay: 0.9 }}
        whileInView={{ opacity: 1, transform: "translateY(0)" }}
        className="absolute bottom-0 right-0 z-10"
      >
        <CldImage
          width="124"
          height="239"
          src={`${servicesUrls.cloudinary}branch/mechanic-male`}
          alt={"mechanic-male"}
          format="svg"
          className="md:w-[205px] md:h-[396px]"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, transform: "translateY(20px)" }}
        transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1, transform: "translateY(0)" }}
        className="absolute bottom-0 left-[85px] z-0 md:left-[115px]"
      >
        <CldImage
          width="287"
          height="169"
          src={`${servicesUrls.cloudinary}branch/motorcycle`}
          alt={"motorcycle"}
          format="svg"
          className="md:w-[477px] md:h-[281px]"
        />
      </motion.div>
    </div>
  );
};

export default CharactersMobile;

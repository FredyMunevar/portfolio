import React from "react";
import "@/presentation/styles/globals.css";
import { CldImage } from "next-cloudinary";
import { servicesUrls } from "@/infrastructure/constants/servicesUrls";
import { motion } from "motion/react";

const CharactersDesktop = () => {
  return (
    <div className="absolute -right-xl -bottom-[40%] h-[608px] w-[608px] rounded-full bg-branchSecondary hidden xl:flex">
      <motion.div
        initial={{ opacity: 0, transform: "translateY(20px)" }}
        transition={{ duration: 0.5, delay: 0.7 }}
        whileInView={{ opacity: 1, transform: "translateY(0)" }}
        className="absolute bottom-0 left-0 z-10"
      >
        <CldImage
          width="331"
          height="640"
          src={`${servicesUrls.cloudinary}branch/client-desktop`}
          alt={"client-mobile"}
          format="svg"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, transform: "translateY(20px)" }}
        transition={{ duration: 0.5, delay: 0.9 }}
        whileInView={{ opacity: 1, transform: "translateY(0)" }}
        className="absolute bottom-0 left-[190px] z-0"
      >
        <CldImage
          width="337"
          height="652"
          src={`${servicesUrls.cloudinary}branch/mechanic-male`}
          alt={"mechanic-male"}
          format="svg"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, transform: "translateY(20px)" }}
        transition={{ duration: 0.5, delay: 0.5 }}
        whileInView={{ opacity: 1, transform: "translateY(0)" }}
        className="absolute bottom-0 right-0 z-10"
      >
        <CldImage
          width="347"
          height="570"
          src={`${servicesUrls.cloudinary}branch/mechanic-female`}
          alt={"mechanic-female"}
          format="svg"
          className="scale-x-[-1]"
        />
      </motion.div>
    </div>
  );
};

export default CharactersDesktop;

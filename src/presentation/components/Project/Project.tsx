import React, { useRef } from "react";
import { Link } from "@/i18n/routing";
import { servicesUrls } from "@/infrastructure/constants/servicesUrls";
import { CldImage } from "next-cloudinary";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { sendGAEvent } from "@next/third-parties/google";
import { throttle } from "lodash";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const Project = ({ title, link, img, bg }: { title: string; link: string; img: string; bg: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = throttle((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  }, 16); // Throttle to 60 FPS (16ms)

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative hover:z-10"
    >
      <Link
        style={{
          transform: "translateZ(100px)",
          transformStyle: "preserve-3d",
        }}
        className={`flex justify-center items-center h-[16rem] ${bg}`}
        href={link}
        onClick={() => sendGAEvent("event", "projectClicked", { value: `project ${title}` })}
      >
        <CldImage
          width="158"
          height="50"
          src={`${servicesUrls.cloudinary}${img}`}
          className={"max-h-xl object-contain"}
          style={{
            transform: "translateZ(200px)",
          }}
          alt={title}
          format="svg"
          loading="lazy"
        />
      </Link>
    </motion.div>
  );
};
export default Project;

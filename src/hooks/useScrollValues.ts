import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const useScrollValues = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const [smoothedScrollY, setSmoothedScrollY] = useState<number>(0);
  const motionScroll = useScroll();
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);

    // You can adjust the smoothing factor to control how fast the smoothed value follows the actual value.
    const smoothingFactor = 0.4;
    const smoothedValue =
      smoothedScrollY + (currentScrollY - smoothedScrollY) * smoothingFactor;
    setSmoothedScrollY(smoothedValue);
  };

  useEffect(() => {
    // Add a scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return {
    scrollY,
    smoothedScrollY,
    progress: parseFloat(
      motionScroll?.scrollYProgress.getPrevious().toFixed(2)
    ),
  };
};

export default useScrollValues;

import { useEffect, useState } from "react";

export const usePointLoc = () => {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Handler to call on mouse move
    function handleMouseMove(e: MouseEvent) {
      setPointer({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    }
    // Add event listener
    window.addEventListener("mousemove", handleMouseMove);

    // Remove event listener on cleanup
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []); // Empty array ensures that effect is only run on mount

  return pointer;
};

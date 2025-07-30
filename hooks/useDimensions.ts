import { useEffect, useState } from "react";
import { Dimensions, ScaledSize } from "react-native";

export function useResponsiveDimensions() {
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));

  useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }) => {
      setDimensions(window);
      console.log("Dimensions changed:", window.width);
    };

    const subscription = Dimensions.addEventListener("change", onChange);

    return () => subscription?.remove?.();
  }, []);

  return dimensions;
}

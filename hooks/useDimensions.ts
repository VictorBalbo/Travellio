import { useCallback, useState } from "react";
import { LayoutChangeEvent } from "react-native";

export function useDimensions() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const onDimensionsChange = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    console.log("onDimensionsChange", width, height);

    setDimensions({ width, height });
  }, []);

  return { dimensions, onDimensionsChange };
}

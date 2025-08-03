import { MapView } from "@/components";
import { ThemedView } from "@/components/ui";
import {
  getThemeProperty,
  TripProvider,
  useDimensions,
  useThemeColor,
} from "@/hooks";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Slot, usePathname } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const background = useThemeColor("background");
  const activeTint = useThemeColor("activeTint");

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pathName = usePathname();

  const { dimensions, onDimensionsChange } = useDimensions();
  const useTabletView = dimensions.width >= 600;

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, pathName]);

  return (
    <TripProvider>
      <GestureHandlerRootView
        style={styles.container}
        onLayout={onDimensionsChange}
      >
        <MapView />

        {useTabletView && (
          <ThemedView background style={[styles.sideSheet]}>
            <Slot />
          </ThemedView>
        )}

        {!useTabletView && (
          <BottomSheet
            snapPoints={["20%", "50%", "90%"]}
            enableDynamicSizing={false}
            backgroundStyle={[
              styles.bottomSheet,
              { backgroundColor: background },
            ]}
            handleStyle={{
              backgroundColor: background + "90",
              position: "absolute",
              width: "100%",
              borderTopLeftRadius: borderRadius * 3,
              borderTopRightRadius: borderRadius * 3,
              padding: smallSpacing,
            }}
            handleIndicatorStyle={{
              backgroundColor: activeTint,
            }}
          >
            <BottomSheetScrollView>
              <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                <Slot />
              </Animated.View>
            </BottomSheetScrollView>
          </BottomSheet>
        )}
      </GestureHandlerRootView>
    </TripProvider>
  );
}

const borderRadius = getThemeProperty("borderRadius");
const smallSpacing = getThemeProperty("smallSpacing");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sideSheet: {
    position: "absolute",
    top: 50,
    bottom: 50,
    left: 50,

    flex: 1,
    borderRadius: borderRadius * 2,
  },
  bottomSheet: {
    borderTopLeftRadius: borderRadius * 2,
    borderTopRightRadius: borderRadius * 2,
  },
});

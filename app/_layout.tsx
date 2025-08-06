import { MapView } from "@/components";
import { ThemedView } from "@/components/ui";
import { getThemeProperty, TripProvider, useThemeColor } from "@/hooks";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Slot, usePathname } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const background = useThemeColor("background");
  const activeTint = useThemeColor("activeTint");

  const [isTabletView, setIsTabletView] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const pathName = usePathname();

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, pathName, isTabletView]);

  return (
    <TripProvider>
      <GestureHandlerRootView
        key={isTabletView ? "tablet" : "mobile"}
        style={styles.container}
        onLayout={(event) =>
          setIsTabletView(event.nativeEvent.layout.width >= 600)
        }
      >
        <MapView />

        {isTabletView && (
          <ThemedView background style={[styles.sideSheet]}>
            <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
              <Slot />
            </Animated.View>
          </ThemedView>
        )}

        {!isTabletView && (
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
    width: 350,
    flex: 1,
    borderRadius: borderRadius * 2,
  },
  bottomSheet: {
    borderTopLeftRadius: borderRadius * 2,
    borderTopRightRadius: borderRadius * 2,
  },
});

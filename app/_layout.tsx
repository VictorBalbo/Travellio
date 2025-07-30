import { MapView } from "@/components";
import { getThemeProperty, useThemeColor } from "@/hooks";
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

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, pathName]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <MapView />

      <BottomSheet
        snapPoints={["20%", "50%", "90%"]}
        enableDynamicSizing={false}
        backgroundStyle={[
          styles.viewContainer,
          { backgroundColor: background },
        ]}
        handleStyle={{
          backgroundColor: background + "90",
          position: "absolute",
          width: "100%",
          borderTopLeftRadius: borderRadius * 3,
          borderTopRightRadius: borderRadius * 3,
        }}
        handleIndicatorStyle={{
          backgroundColor: activeTint,
        }}
      >
        <BottomSheetScrollView style={styles.viewContainer}>
          <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <Slot />
          </Animated.View>
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const borderRadius = getThemeProperty("borderRadius");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    borderTopLeftRadius: borderRadius * 3,
    borderTopRightRadius: borderRadius * 3,
  },
});

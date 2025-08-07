import { Icon, PressableView, ThemedView } from "@/components/ui";
import { Colors } from "@/constants/Theme";
import { getThemeProperty, useThemeColor } from "@/hooks";
import { LinearGradient } from "expo-linear-gradient";
import type { PropsWithChildren } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";

type Props = PropsWithChildren<{
  headerImageUrl: string;
  showHeaderImageGradient?: boolean;
  closeButtonCallback?: () => void;
}>;

export const BottomSheetView = ({
  children,
  headerImageUrl,
  showHeaderImageGradient = true,
  closeButtonCallback,
}: Props) => {
  const background = useThemeColor("background");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, position: "relative" }}
    >
      <ThemedView background style={styles.container}>
        <PressableView
          style={styles.closeButton}
          onPress={closeButtonCallback!}
        >
          <Icon name="xmark" color={Colors.white} />
        </PressableView>

        <ThemedView>
          <Image source={{ uri: headerImageUrl }} style={styles.headerImage} />
          {showHeaderImageGradient && (
            <LinearGradient
              colors={["transparent", background]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 0, y: 1 }}
              style={styles.headerGradient}
            />
          )}
        </ThemedView>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
};

const borderRadius = getThemeProperty("borderRadius");
const smallSpacing = getThemeProperty("smallSpacing");
const largeSpacing = getThemeProperty("largeSpacing");
const HEADER_HEIGHT = 250;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    zIndex: 1,
    top: largeSpacing * 2,
    right: largeSpacing,
    backgroundColor: Colors.black + "B2",
    borderRadius: borderRadius * borderRadius,
    padding: smallSpacing,
  },
  headerImage: {
    height: HEADER_HEIGHT,
    width: "100%",
  },
  headerGradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    overflow: "hidden",
  },
});

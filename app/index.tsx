import { ThemedText, ThemedView } from "@/components/ui";

export default function Index() {
  return (
    <ThemedView
      
      style={{
        flex: 1,
        height: 'auto',
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      <ThemedText>Edit app/index.tsx to edit this screen.</ThemedText>
    </ThemedView>
  );
}

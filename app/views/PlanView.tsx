import {
  CardView,
  HorizontalDivider,
  Icon,
  PressableView,
  TextType,
  ThemedText,
  ThemedView,
} from "@/components/ui";
import { utcDate } from "@/helpers";
import { getThemeProperty, useTripContext } from "@/hooks";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

const PlanView = () => {
  const { trip, destinations } = useTripContext();
  const router = useRouter();

  const onDestinationSelected = (destinationId: string) => {
    router.push({
      pathname: "/views/DestinationDetailsView",
      params: { destinationId: destinationId },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type={TextType.Title}>{trip?.name}</ThemedText>
      {trip?.startDate && trip?.endDate && (
        <ThemedText type={TextType.Bold}>
          {utcDate(trip?.startDate).format("DD MMM")}
          {" - "}
          {utcDate(trip?.endDate).format("DD MMM")}
        </ThemedText>
      )}
      <CardView style={styles.destinationsCard}>
        {destinations?.map((d, i) => (
          <ThemedView key={i}>
            <PressableView onPress={() => onDestinationSelected(d.id)}>
              <Icon name="building.2.fill" />
              <ThemedView style={styles.destinationName}>
                <ThemedText type={TextType.Bold} numberOfLines={2}>
                  {d.place?.name}
                </ThemedText>
                <ThemedText type={TextType.Small}>
                  {utcDate(d.startDate).format("DD MMM")}
                  {" - "}
                  {utcDate(d.endDate).format("DD MMM")}
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.destinationActivities}>
                <ThemedText type={TextType.Bold}>
                  {d.activities?.length ?? 0}
                </ThemedText>
                <ThemedText type={TextType.Small}>
                  {(d.activities?.length ?? 0) === 1
                    ? "Activity"
                    : "Activities"}
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.destinationNights}>
                <ThemedText type={TextType.Bold}>
                  {utcDate(d.endDate).diff(d.startDate, "days")}
                </ThemedText>
                <ThemedText type={TextType.Small}>
                  {utcDate(d.endDate).diff(d.startDate, "days") === 1
                    ? "Night"
                    : "Nights"}
                </ThemedText>
              </ThemedView>
            </PressableView>
            {i !== destinations.length - 1 && <HorizontalDivider />}
          </ThemedView>
        ))}
      </CardView>
    </ThemedView>
  );
};
export default PlanView;

const largeSpacing = getThemeProperty("largeSpacing");
const smallSpacing = getThemeProperty("smallSpacing");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: largeSpacing,
  },
  destinationsCard: {
    marginVertical: smallSpacing,
  },
  destinationName: {
    flex: 2,
    alignItems: "flex-start",
  },
  destinationActivities: {
    flex: 1,
    alignItems: "center",
  },
  destinationNights: {
    flex: 1,
    alignItems: "center",
  },
});

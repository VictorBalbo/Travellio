import {
  CardView,
  Icon,
  PressableView,
  TextType,
  ThemedText,
  ThemedView,
} from "@/components/ui";
import { utcDate } from "@/helpers";
import { getThemeProperty, useTripContext } from "@/hooks";
import { StyleSheet } from "react-native";

const PlanView = () => {
  const { trip, destinations } = useTripContext();

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
            <PressableView
              onPress={() => console.log("Destination pressed", d.id)}
            >
              <Icon name='building.2.fill'/>
              <ThemedView>
                <ThemedText type={TextType.Bold}>{d.place.name}</ThemedText>
                <ThemedText type={TextType.Small}>
                  {utcDate(d.startDate).format('DD MMM')}
                  {' - '}
                  {utcDate(d.endDate).format('DD MMM')}
                </ThemedText>
              </ThemedView>
            </PressableView>
          </ThemedView>
        ))}
      </CardView>

      <ThemedText>This is the plan view component.</ThemedText>
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
});

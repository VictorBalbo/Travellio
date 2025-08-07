import { BottomSheetView } from "@/components";
import { TextType, ThemedText, ThemedView } from "@/components/ui";
import { dateDiff, utcDate } from "@/helpers";
import { useTripContext } from "@/hooks";
import { Destination } from "@/models";
import { TripService } from "@/services/TripService";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

const DestinationDetailsView = () => {
  const { destinations, transportations } = useTripContext();
  const { destinationId } = useLocalSearchParams();
  const [destination, setDestination] = useState<Destination>();

  useEffect(() => {
    const currentDestination = destinations?.find(
      (d) => d.id === destinationId
    );
    setDestination(currentDestination);
  }, [destinationId, destinations]);

  if (!destination) {
    return <ActivityIndicator />;
  }

  return (
    <BottomSheetView
      headerImageUrl={TripService.getPhotoForPlace(destination.place.images)}
    >
      <ThemedView>
        <ThemedText type={TextType.Bold}>
          {dateDiff(destination?.endDate, destination?.startDate)}
          {utcDate(destination?.endDate).diff(
            utcDate(destination?.startDate),
            "days"
          ) > 1
            ? " nights"
            : " night"}
        </ThemedText>
        <ThemedText type={TextType.Title}>{destination?.place.name}</ThemedText>
      </ThemedView>
    </BottomSheetView>
  );
};

export default DestinationDetailsView;

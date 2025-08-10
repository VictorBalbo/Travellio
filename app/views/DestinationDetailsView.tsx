import { BottomSheetView } from "@/components";
import {
  CardView,
  ExternalLink,
  HorizontalDivider,
  Icon,
  TextType,
  ThemedText,
  ThemedView,
} from "@/components/ui";
import { dateDiff, utcDate } from "@/helpers";
import { getThemeProperty, useTripContext } from "@/hooks";
import { Destination, Transportation } from "@/models";
import { TripService } from "@/services/TripService";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, StyleSheet } from "react-native";

const DestinationDetailsView = () => {
  const { destinations, transportations } = useTripContext();
  const { destinationId } = useLocalSearchParams();

  const [destination, setDestination] = useState<Destination>();
  const [arrival, setArrival] = useState<Transportation>();
  const [departure, setDeparture] = useState<Transportation>();

  const { t } = useTranslation();

  useEffect(() => {
    const currentDestination = destinations?.find(
      (d) => d.id === destinationId
    );
    setDestination(currentDestination);

    const arrivalTransport = transportations?.find(
      (t) => currentDestination?.id === t.destinationId
    );
    setArrival(arrivalTransport);

    const departureTransport = transportations?.find(
      (t) => currentDestination?.id === t.originId
    );
    setDeparture(departureTransport);
  }, [destinationId, destinations, transportations]);

  const getAccommodationType = (website: string) => {
    if (website.includes("airbnb")) {
      return "Airbnb";
    }
    if (website.includes("booking")) {
      return "Booking";
    }
    return "Hotel";
  };

  if (!destination) {
    return <ActivityIndicator />;
  }

  return (
    <BottomSheetView
      headerImageUrl={TripService.getPhotoForPlace(destination.place.images)}
    >
      <ThemedView style={styles.header}>
        <ThemedText type={TextType.Bold}>
          {t("countNight", {
            count: dateDiff(destination?.endDate, destination?.startDate),
          })}
        </ThemedText>
        <ThemedText type={TextType.Title}>{destination?.place.name}</ThemedText>
        <ThemedText type={TextType.Bold}>
          {utcDate(destination?.startDate).format("DD MMM")}
          {" - "}
          {utcDate(destination?.endDate).format("DD MMM")}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.body}>
        {destination.accommodations?.length && (
          <CardView style={styles.card}>
            <ThemedView style={styles.iconTitle}>
              {/* <Icon name="house.fill" /> */}
              <ThemedText type={TextType.Bold}>
                {t("accommodationIn", {
                  count: destination.accommodations.length,
                  name: destination.place.name,
                })}
              </ThemedText>
            </ThemedView>
            {destination.accommodations.map((a, i) => (
              <ThemedView style={styles.card} key={a.id}>
                {a.website && (
                  <ThemedText type={TextType.Small}>
                    {getAccommodationType(a.website)}
                  </ThemedText>
                )}
                <ThemedView style={styles.iconTitle}>
                  <Icon name="house.fill" />
                  <ThemedText numberOfLines={2}>
                    {a.name ?? a.place.name}
                  </ThemedText>
                </ThemedView>
                {a.checkin && a.checkout && (
                  <ThemedView style={styles.iconTitle}>
                    <Icon name="calendar" />
                    <ThemedText>
                      {utcDate(a.checkin).format("DD/MM HH:mm ")}
                    </ThemedText>
                    <Icon name="arrow.right" size={12} />
                    <ThemedText>
                      {utcDate(a.checkout).format(" DD/MM HH:mm")}
                    </ThemedText>
                  </ThemedView>
                )}
                {a.website && (
                  <ThemedView style={styles.iconTitle}>
                    <Icon name="globe" />
                    <ExternalLink
                      href={a.website}
                      displayText={t("openReservation")}
                    />
                  </ThemedView>
                )}
                {a.place.mapsUrl && (
                  <ThemedView style={styles.iconTitle}>
                    <Icon name="map.fill" />
                    <ExternalLink
                      href={a.place.mapsUrl}
                      displayText={t("openOn", { name: "Google Maps" })}
                    />
                  </ThemedView>
                )}
                {i !== destination.accommodations!.length - 1 && (
                  <HorizontalDivider />
                )}
              </ThemedView>
            ))}
          </CardView>
        )}

        {arrival && (
          <CardView style={styles.card}>
            <ThemedView style={styles.iconTitle}>
              {/* <Icon name="airplane.circle.fill" /> */}
              <ThemedText type={TextType.Bold}>
                {arrival.originId
                  ? t("arrivalFrom", { name: destination.place.name })
                  : t("arrivalHome")}
              </ThemedText>
            </ThemedView>
            <ThemedText type={TextType.Small}>
              {arrival.segments[0].type}
            </ThemedText>
            <ThemedView style={styles.iconTitle}>
              <Icon name="airplane" />
              <ThemedText>{arrival.segments[0].company}</ThemedText>
              <ThemedText type={TextType.Small}>
                {arrival.segments[0].transportIdentification}
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.iconTitle}>
              <Icon name="ticket.fill" />
              <ThemedText selectable>{arrival.segments[0].reservation}</ThemedText>
            </ThemedView>
            {arrival.segments[0].startDate && arrival.segments[0].endDate && (
              <ThemedView style={styles.iconTitle}>
                <Icon name="clock.fill" />
                <ThemedText>
                  {utcDate(arrival.segments[0].startDate).format("DD/MM HH:mm")}
                </ThemedText>
                <Icon name="arrow.right" size={12} />
                <ThemedText>
                  {utcDate(arrival.segments[0].endDate).format("DD/MM HH:mm")}
                </ThemedText>
              </ThemedView>
            )}
            <ThemedView style={styles.iconTitle}>
              <Icon name="map.fill" />
              <ExternalLink
                href={arrival.segments[0].destinationTerminal.mapsUrl!}
                displayText={arrival.segments[0].destinationTerminal.name}
              />
            </ThemedView>
          </CardView>
        )}
      </ThemedView>
    </BottomSheetView>
  );
};

export default DestinationDetailsView;

const smallSpacing = getThemeProperty("smallSpacing");
const largeSpacing = getThemeProperty("largeSpacing");

const styles = StyleSheet.create({
  header: {
    padding: smallSpacing,
  },
  body: {
    padding: smallSpacing,
    gap: largeSpacing,
  },
  iconTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: smallSpacing,
  },
  card: {
    gap: smallSpacing / 2,
  },
});

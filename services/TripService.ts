import { apiUrl } from "@/constants";
import { Destination, Trip } from "@/models";

export class TripService {
  private static BASE_URL = apiUrl;

  static getTripDetails = async (tripId: string) => {
    const url = `${this.BASE_URL}/trips/${tripId}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return null;
      }
      return (await response.json()) as Trip;
    } catch (e) {
      console.error("Error fetching trip details", url, e);
      return null;
    }
  };

  static getDestinationDetails = async (tripId: string, destinationId: string) => {
    const url = `${this.BASE_URL}/trips/${tripId}/destinations/${destinationId}`;
    try {
      console.log(url)
      const response = await fetch(url);
      if (!response.ok) {
        return null;
      }
      return (await response.json()) as Destination;
    } catch (e) {
      console.error("Error fetching Destination details", url, e);
      return null;
    }
  };

  static getPhotoForPlace = (keys?: string[]) => {
    if (keys?.length)
      return `https://itin-dev.sfo2.cdn.digitaloceanspaces.com/freeImageSmall/${keys[0]}`;
    else return "";
  };
  static getMediumPhotoForPlace = (keys?: string[]) => {
    if (keys?.length)
      return `https://itin-dev.sfo2.cdn.digitaloceanspaces.com/freeImageMedium/${keys[0]} 1200w`;
  };
}

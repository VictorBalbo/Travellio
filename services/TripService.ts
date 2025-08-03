import { apiUrl } from "@/constants";
import { Trip } from "@/models";

export class TripService {
  private static BASE_URL = apiUrl;

  static getTripDetails = async (tripId: string) => {
    const url = `${this.BASE_URL}/trips/${tripId}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return null;
      }
      return await response.json() as Trip;
    }
    catch(e) {
      console.error("Error fetching trip details", url, e);
      return null
    }
  }
}

import { tripId } from "@/constants";
import {
  Accommodation,
  Activity,
  Destination,
  Transportation,
  Trip,
} from "@/models";
import { TripService } from "@/services/TripService";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface TripContextType {
  trip?: Trip;
  setTrip: (value: Trip) => void;
  activities?: Activity[];
  destinations?: Destination[];
  accommodations?: Accommodation[];
  transportations?: Transportation[];
}
const TripContext = createContext<TripContextType | undefined>(undefined);

interface TripProviderProps {
  children: ReactNode;
}
export const TripProvider = ({ children }: TripProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [trip, setTrip] = useState<Trip>();

  const destinations = useMemo(
    () => trip?.destinations ?? [],
    [trip?.destinations]
  );

  const activities = useMemo(
    () =>
      trip?.destinations
        ?.flatMap((d) => d.activities)
        .filter((a) => a !== undefined) ?? [],
    [trip?.destinations]
  );

  const accommodations = useMemo(
    () =>
      trip?.destinations
        ?.flatMap((d) => d.accommodations)
        .filter((a) => a !== undefined) ?? [],
    [trip?.destinations]
  );

  const transportations = trip?.transportations;

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        setLoading(true);
        const responseTrip = await TripService.getTripDetails(tripId);
        if (responseTrip) {
          setTrip(responseTrip);
        }
      } catch (err) {
        console.log("Error", err);
      } finally {
      }
    };
    if (!trip && !loading) {
      fetchTrip();
    }
  }, [loading, trip]);

  return (
    <TripContext.Provider
      value={{
        trip,
        setTrip,
        activities,
        destinations,
        accommodations,
        transportations,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useTripContext = (): TripContextType => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("useTripContext must be used within an TripProvider");
  }
  return context;
};

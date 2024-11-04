import { clearWatchLocation, getCurrentLocation, watchCurrentLocation } from "@/actions/location/location";
import * as Location from 'expo-location'
import { AppLocation } from "@/infrastructure/interfaces/location";
import { create } from "zustand";

interface LocationState {
  lastKnownLocation: AppLocation | null
  userLocationHistory: AppLocation[]
  watchId: Location.LocationSubscription | null

  getLocation: () => Promise<AppLocation|null>
  watchLocation: () => void
  clearWatchLocation: () => void

}

export const useLocationStore = create<LocationState>()((set, get) => ({
  lastKnownLocation: null,
  userLocationHistory: [],
  watchId: null,

  getLocation: async () => {
    const location = await getCurrentLocation()
    set({lastKnownLocation: location})
    return location
  },

  watchLocation: async () => {
    const watchId = get().watchId
    if(watchId !== null){
      get().clearWatchLocation()
    }
    const id = await watchCurrentLocation((location) => {
      set({
        lastKnownLocation: location,
        userLocationHistory: [ ...get().userLocationHistory, location ]
      })
    })

    set({ watchId: id })
  },
  
  clearWatchLocation: () => {
    const watchId = get().watchId
    if(watchId !== null){
      clearWatchLocation(watchId)
    }
  }
}))
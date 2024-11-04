import * as Location from 'expo-location'

import { AppLocation, AppLocation as LocationEntity } from '@/infrastructure/interfaces/location'

export const getCurrentLocation = async (): Promise<LocationEntity> => {
  try {
    let location = await Location.getCurrentPositionAsync({})
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
  } catch (error) {
    throw new Error('Error getting location')
  }

}

export const watchCurrentLocation = async (
  locationCallback: (location: AppLocation) => void
): Promise<Location.LocationSubscription> => {
  const locationWatcher = await Location.watchPositionAsync({
    accuracy: Location.Accuracy.High,
    distanceInterval: 1,
    timeInterval: 1000
  }, (info) => {
    locationCallback({
      latitude: info.coords.latitude,
      longitude: info.coords.longitude
    })
  })
  return locationWatcher
}

export const clearWatchLocation = async (watcher: Location.LocationSubscription) => {
  if(!watcher) return
  watcher.remove
}
import { openSettings } from "expo-linking"
import { PermissionStatus } from "expo-location"

import * as Location from 'expo-location'

export const requestLocationPermission = async (): Promise<PermissionStatus> => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== PermissionStatus.GRANTED) {
      await openSettings()
      return await checkLocationPermission()
    }

    return status ?? PermissionStatus.UNDETERMINED

  } catch (error) {
    console.error('Error requesting location permission')
    return PermissionStatus.UNDETERMINED
  }
}

export const checkLocationPermission = async (): Promise<PermissionStatus> => {
  const { status } = await Location.getForegroundPermissionsAsync()

  return status ?? PermissionStatus.UNDETERMINED
}
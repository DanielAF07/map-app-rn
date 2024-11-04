import { checkLocationPermission, requestLocationPermission } from "@/actions/permissions/location";
import { PermissionStatus } from "expo-location";
import { create } from "zustand";

interface PermissionState {
  locationStatus: PermissionStatus

  requestLocationPermission: () => Promise<PermissionStatus>,
  checkLocationPermission: () => Promise<PermissionStatus>
}

export const usePermissionStore = create<PermissionState>()((set) => ({
  locationStatus: PermissionStatus.UNDETERMINED,

  requestLocationPermission: async () => {
    const status = await requestLocationPermission()
    set({ locationStatus: status })
    return status
  },
  checkLocationPermission: async () => {
    const status = await checkLocationPermission()
    set({ locationStatus: status })
    return status
  },
}))
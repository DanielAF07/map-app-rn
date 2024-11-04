import { PropsWithChildren, useEffect } from 'react'
import { usePermissionStore } from '../stores/permissions/usePermissionStore'
import { AppState } from 'react-native'
import { PermissionStatus } from 'expo-location'
import { useRouter } from 'expo-router'

const PermissionsChecker = ({children}: PropsWithChildren) => {
  const checkLocationPermission = usePermissionStore(state => state.checkLocationPermission)
  const locationStatus = usePermissionStore(state => state.locationStatus)
  const router = useRouter()

  useEffect(() => {
    if(locationStatus === PermissionStatus.GRANTED) {
      router.replace('/map')
    } else if(locationStatus !== PermissionStatus.UNDETERMINED) {
      router.replace('/permissions')
    }
  }, [locationStatus])

  useEffect(() => {
    checkLocationPermission()
  }, [])

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if(nextAppState === 'active') {
        checkLocationPermission()
      }
    })

    return () => {
      subscription.remove()
    }
  }, [])

  return (
    <>
      {children}
    </>
  )
}
export default PermissionsChecker
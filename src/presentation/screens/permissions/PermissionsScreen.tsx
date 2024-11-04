import { globalStyles } from '@/config/theme/styles'
import { usePermissionStore } from '@/presentation/stores/permissions/usePermissionStore'
import { PermissionStatus } from 'expo-location'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { View, Text, Pressable } from 'react-native'
const PermissionsScreen = () => {

  const locationStatus = usePermissionStore(state => state.locationStatus)
  const requestLocationPermission = usePermissionStore(state => state.requestLocationPermission)
  const router = useRouter()

  useEffect(() => {
    if(locationStatus === PermissionStatus.GRANTED) {
      router.replace('/map')
    }
  }, [locationStatus])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Habilitar ubicación</Text>
      <Pressable
        style={globalStyles.btnPrimary}
        onPress={requestLocationPermission}
      >
        <Text style={{color: 'white'}}>Habilitar localización</Text>
      </Pressable>

      <Text>Actual state: {locationStatus}</Text>
    </View>
  )
}
export default PermissionsScreen
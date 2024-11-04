import Map from '@/presentation/components/maps/Map'
import { useLocationStore } from '@/presentation/stores/location/useLocationStore'
import { View } from 'react-native'
import LoadingScreen from '../loading/LoadingScreen'
import { useEffect } from 'react'
import FAB from '@/presentation/components/ui/FAB'

const MapScreen = () => {
  const { lastKnownLocation, getLocation } = useLocationStore()

  useEffect(() => {
    if(lastKnownLocation === null) {
      getLocation()
    }
  }, [])

  if(lastKnownLocation === null) {
    return <LoadingScreen />
  }

  return (
    <View style={{flex: 1}}>
      <Map initialLocation={lastKnownLocation} />
    </View>
  )
}
export default MapScreen
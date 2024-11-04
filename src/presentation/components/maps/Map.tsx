import { AppLocation } from '@/infrastructure/interfaces/location'
import MapView, { Polyline } from 'react-native-maps'
import FAB from '../ui/FAB'
import { useEffect, useRef, useState } from 'react'
import { useLocationStore } from '@/presentation/stores/location/useLocationStore'

interface Props {
  initialLocation: AppLocation
}

const Map = ({initialLocation}: Props) => {

  const mapRef = useRef<MapView>()
  const cameraLocation = useRef<AppLocation>(initialLocation)
  const { getLocation, lastKnownLocation, watchLocation, clearWatchLocation, userLocationHistory } = useLocationStore()

  const [isFollowingUser, setIsFollowingUser] = useState<Boolean>(false)
  const [isShowingPolylines, setIsShowingPolylines] = useState<Boolean>(false)

  useEffect(() => {
    watchLocation()

    return () => {
      clearWatchLocation()
    }
  }, [])

  useEffect(() => {
    if(!lastKnownLocation || !isFollowingUser) return
    moveCameraToLocation(lastKnownLocation)

  }, [lastKnownLocation])

  const moveCameraToLocation = (location: AppLocation) => {
    if(!mapRef.current) return
    mapRef.current.animateCamera({ center: location })
  }

  const moveToCurrentLocation = async () => {
    const location = await getLocation()
    if (!location) return
    moveCameraToLocation(location)
  }

  const handleFollowUser = () => {
    setIsFollowingUser(!isFollowingUser)
  }

  const cancelFollowUser = () => {
    if(!isFollowingUser) return
    setIsFollowingUser(false)
  }

  return (
    <>
      <MapView
        ref={(map) => mapRef.current = map! }
        showsUserLocation
        style={{width: '100%', height: '100%'}}
        region={{
          latitude: cameraLocation.current.latitude,
          longitude: cameraLocation.current.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
        onPanDrag={cancelFollowUser}
      >
        { isShowingPolylines && (
          <Polyline
            coordinates={userLocationHistory}
            strokeWidth={5}
            strokeColor='red'
          />
        )}
        
        {/* <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: 12.52232
          }}
        /> */}
      </MapView>
      <FAB
        iconName={isShowingPolylines ? 'eye-outline' : 'eye-off-outline'}
        onPress={() => setIsShowingPolylines(!isShowingPolylines)}
        style={{
          bottom: 140,
          right: 20
        }}
      />
      <FAB
        iconName={isFollowingUser ? 'walk-outline' : 'accessibility-outline'}
        onPress={handleFollowUser}
        style={{
          bottom: 80,
          right: 20
        }}
      />
      <FAB
        iconName='compass-outline'
        onPress={moveToCurrentLocation}
        style={{
          bottom: 20,
          right: 20
        }}
      />
    </>
  )
}
export default Map
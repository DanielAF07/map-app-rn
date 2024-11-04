import { Ionicons } from '@expo/vector-icons'
import { View, Text, StyleProp, ViewStyle, StyleSheet, Pressable, useAnimatedValue, Animated, Easing } from 'react-native'

interface Props {
  iconName: string
  onPress: () => void
  style?: StyleProp<ViewStyle>
}

const FAB = ({iconName, onPress, style}: Props) => {

  const animatedScale = useAnimatedValue(1)

  const handlePress = () => {
    if(!onPress) return
    onPress()
  }

  const handlePressIn = () => {
    Animated.timing(animatedScale, {
      toValue: 0.8,
      duration: 80,
      easing: Easing.ease,
      useNativeDriver:true
    }).start()
  }

  const handlePressOut = () => {
    Animated.timing(animatedScale, {
      toValue: 1,
      duration: 80,
      easing: Easing.ease,
      useNativeDriver:true
    }).start()
  }

  return (
    <Animated.View
      style={[
        styles.btn,
        style,
        { transform: [{ scale: animatedScale }]}
      ]}
    >
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {/* @ts-ignore */}
        <Ionicons name={iconName} size={30} color='white' />
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  btn: {
    zIndex: 1,
    position: 'absolute',
    height: 50,
    width: 50,
    borderRadius: 30,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 0.27,
      width: 4.5
    },
    elevation: 5
  }
})

export default FAB
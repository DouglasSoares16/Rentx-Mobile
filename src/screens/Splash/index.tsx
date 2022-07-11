import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS
} from "react-native-reanimated";

import BrandSvg from "../../assets/brand.svg";
import LogoSvg from "../../assets/logo.svg";

import { Container } from "./styles";

interface NavigationProps {
  navigate(screen: string): void;
}

export function Splash() {
  const { navigate } = useNavigation<NavigationProps>();
  const splashAnimation = useSharedValue(0);

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value,
        [0, 25, 50], // steps
        [0, 0.3, 1], // values
      ),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 50],
            [50, 0],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  });

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value,
        [0, 50],
        [1, 0],
      ),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 50],
            [0, 60],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  });

  function startApp() {
    navigate("Home");
  }

  useEffect(() => {
    splashAnimation.value = withTiming(50,
      {
        duration: 2000
      },
      () => {
        "worklet"
        runOnJS(startApp)();
      }
    );
  }, [])

  return (
    <Container>
      <Animated.View style={[brandStyle, { position: "absolute" }]}>
        <BrandSvg width={80} height={50} />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: "absolute" }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
}
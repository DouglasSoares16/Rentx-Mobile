import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { BackHandler, StatusBar, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring
} from "react-native-reanimated";

import { Car } from "../../components/Car";
import { LoadAnimation } from "../../components/LoadAnimation";

import {
  CarList,
  Container,
  Header,
  HeaderContent,
  TotalCars
} from "./styles";
const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import { api } from "../../services/api";
import { ICarDTO } from "../../dtos/CarDTO";
import Logo from "../../assets/logo.svg";

interface NavigationProps {
  navigate(screen: string, { }?): void;
}

export function Home() {
  const [cars, setCars] = useState<ICarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { navigate } = useNavigation<NavigationProps>();
  const { colors } = useTheme();

  function handleCarDetails(car: ICarDTO) {
    navigate("CarDetails", { car });
  }

  function handleMyCars() {
    navigate("MyCars");
  }

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const response = await api.get("cars");

        if (isMounted) {
          setCars(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    }
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }, [])

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: positionX.value
        },
        {
          translateY: positionY.value
        }
      ]
    }
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },

    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },

    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  });

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          {
            !isLoading && (
              <TotalCars>
                Total {cars.length} carros
              </TotalCars>
            )
          }
        </HeaderContent>
      </Header>

      {isLoading ? (
        <LoadAnimation />
      ) :
        (
          <CarList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
          />
        )}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[
          myCarsButtonStyle,
          { position: "absolute", bottom: 13, right: 22 }
        ]}>
          <ButtonAnimated
            onPress={handleMyCars}
            style={[styles.button,
            { backgroundColor: colors.main }]}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={colors.shape} />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  }
});
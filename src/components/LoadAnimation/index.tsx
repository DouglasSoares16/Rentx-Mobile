import React from "react";
import LottieView from "lottie-react-native";

import { Container } from "./styles";

import LoadingCar from "../../assets/loadingCar.json";

export function LoadAnimation(){
  return (
    <Container>
      <LottieView
        source={LoadingCar}
        style={{ height: 200 }}
        resizeMode="contain"
        autoPlay
        loop />
    </Container>
  );
}
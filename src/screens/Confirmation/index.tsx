import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar, useWindowDimensions } from "react-native";

import { ConfirmButton } from "../../components/ConfirmButton";

import {
  Container,
  Content,
  Title,
  Message,
  Footer
} from "./styles";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

interface NavigationProps {
  navigate(screen: string): void;
}

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}

export function Confirmation() {
  const route = useRoute();
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation<NavigationProps>();

  const { message, nextScreenRoute, title } = route.params as Params;

  function handleBackToHome() {
    navigate(nextScreenRoute);
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>{message}</Message>

        <Footer>
          <ConfirmButton title="OK" onPress={handleBackToHome}/>
        </Footer>
      </Content>
    </Container>
  );
}
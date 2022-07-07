import React from "react";
import { useNavigation } from "@react-navigation/native";
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

export function SchedulingComplete() {
  const { width } = useWindowDimensions();

  const { navigate } = useNavigation<NavigationProps>();

  function handleBackToHome() {
    navigate("Home");
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
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {"\n"}
          até a concessionária da RENTX {"\n"}
          pegar o seu automóvel.
        </Message>

        <Footer>
          <ConfirmButton title="OK" onPress={handleBackToHome}/>
        </Footer>
      </Content>
    </Container>
  );
}
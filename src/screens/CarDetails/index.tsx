import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

import SpeedSvg from "../../assets/speed.svg";
import AccelerationSvg from "../../assets/acceleration.svg";
import ForceSvg from "../../assets/force.svg";
import GasolineSvg from "../../assets/gasoline.svg";
import ExchangeSvg from "../../assets/exchange.svg";
import PeopleSvg from "../../assets/people.svg";

import {
  Container,
  Header,
  CarImages,
  Brand,
  Content,
  Description,
  Details,
  Name,
  Period,
  Price,
  Rent,
  About,
  Accessories,
  Footer
} from "./styles";
import { ICarDTO } from "../../dtos/CarDTO";
import { StatusBar } from "react-native";

interface NavigationProps {
  navigate(screen: string): void;
  goBack(): void;
}

interface Params {
  car: ICarDTO;
}

export function CarDetails() {
  const { navigate, goBack } = useNavigation<NavigationProps>();
  const route = useRoute();

  const { car } = route.params as Params;

  function handleSchedulingCar() {
    navigate("Scheduling");
  }

  function handleBack() {
    goBack();
  }

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider
          imageUrl={car.photos}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>

            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map(accessory => (
            <Accessory
              key={accessory.name}
              name={accessory.name}
              icon={PeopleSvg} />
          ))}
        </Accessories>

        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleSchedulingCar} />
      </Footer>
    </Container>
  );
}
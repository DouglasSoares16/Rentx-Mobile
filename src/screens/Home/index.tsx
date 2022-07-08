import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";

import {
  CarList,
  Container,
  Header,
  HeaderContent,
  TotalCars
} from "./styles";
import { api } from "../../services/api";
import { ICarDTO } from "../../dtos/CarDTO";
import { Load } from "../../components/Load";

interface NavigationProps {
  navigate(screen: string, {}): void;
}

export function Home() {
  const [cars, setCars] = useState<ICarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { navigate } = useNavigation<NavigationProps>();

  function handleCarDetails(car: ICarDTO) {
    navigate("CarDetails", { car });
  }

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get("cars");

        setCars(response.data);
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

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

          <TotalCars>
            Total 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>

      {isLoading ? (
        <Load />
      ) :
        (
          <CarList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
          />
        )}
    </Container>
  );
}
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";

import {
  CarList,
  Container,
  Header,
  HeaderContent,
  MyCarsButton,
  TotalCars
} from "./styles";
import { api } from "../../services/api";
import { ICarDTO } from "../../dtos/CarDTO";
import { Load } from "../../components/Load";
import { useTheme } from "styled-components/native";

interface NavigationProps {
  navigate(screen: string, {}?): void;
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
            Total {cars.length} carros
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

        <MyCarsButton onPress={handleMyCars}>
          <Ionicons
            name="ios-car-sport"
            size={32}
            color={colors.shape} />
        </MyCarsButton>
    </Container>
  );
}
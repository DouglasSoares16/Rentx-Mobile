import React from "react"; 
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

interface NavigationProps {
  navigate(screen: string): void;
}

export function Home() {
  const { navigate } = useNavigation<NavigationProps>();

  const data = [
    {
      name: "RS5 Coupé",
      brand: "AUDI",
      price: 140,
      thumbnail: "https://ik.imagekit.io/2ero5nzbxo2/tr:w-280,q-99/FILES/generations/WO5Gkl0APWC44FnH5HDZcL7OwmXmnqdyXF8PN84n.png?ik-sdk-version=php-2.0.0",
    },
    {
      name: "Panamera",
      brand: "Porsche",
      price: 190,
      thumbnail: "https://i.pinimg.com/originals/e3/99/6c/e3996cbc32b254dd28205dd7e36a6a11.png",
    }
  ];

  function handleCarDetails() {
    navigate("CarDetails");
  }

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

      <CarList
        data={[1, 2, 3, 4, 5, 6]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => <Car data={data[0]} onPress={handleCarDetails} />}
      />
    </Container>
  );
}
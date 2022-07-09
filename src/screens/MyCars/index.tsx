import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

import { BackButton } from "../../components/BackButton";
import { Car } from "../../components/Car";
import { Load } from "../../components/Load";

import { ICarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";

import {
  Container,
  Header,
  Title,
  SubTitle,
  Appointments,
  AppointmentsQuantity,
  AppointmentsTitle,
  Content,
  CarList,
  CarFooter,
  CarFooterDate,
  CarFooterPeriod,
  CarFooterTitle,
  CarWrapper
} from "./styles";

interface NavigationProps {
  goBack(): void;
  navigate(screen: string, { }): void;
}

export interface CarsProps {
  car: ICarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState<CarsProps[]>([]);

  const { colors } = useTheme();
  const { goBack, navigate } = useNavigation<NavigationProps>();

  function handleBack() {
    goBack();
  }

  function handleCarDetails(car: ICarDTO) {
    navigate("CarDetails", { car });
  }

  useEffect(() => {
    async function loadCars() {
      try {
        const { data } = await api.get("schedules_byuser?user_id=1");

        const cars = data.map((schedule: any) => {
          return {
            car: schedule.car,
            startDate: schedule.startDate,
            endDate: schedule.endDate,
          }
        });

        setCars(cars)
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadCars();
  }, [])

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <BackButton color={colors.shape} onPress={handleBack} />

        <Title>
          Seus agendamentos, {"\n"}
          estão aqui.
        </Title>

        <SubTitle>Conforto, segurança e praticidade</SubTitle>
      </Header>

      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos</AppointmentsTitle>

          <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
        </Appointments>

        {isLoading ? (
          <Load />
        ) :
          (
            <CarList
              data={cars}
              keyExtractor={item => item.car.id}
              renderItem={({ item }) => (
                <CarWrapper>
                  <Car data={item.car} onPress={() => handleCarDetails(item.car)} />
                  <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>

                    <CarFooterPeriod>
                      <CarFooterDate>{item.startDate}</CarFooterDate>

                      <AntDesign
                        name="arrowright"
                        size={26}
                        color={colors.title}
                        style={{ marginHorizontal: 10 }} 
                      />

                      <CarFooterDate>{item.endDate}</CarFooterDate>
                    </CarFooterPeriod>
                  </CarFooter>
                </CarWrapper>
              )}
            />
          )}
      </Content>
    </Container>
  );
}
import { StatusBar } from "react-native";
import { format, parseISO } from "date-fns";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import { Car } from "../../components/Car";
import { BackButton } from "../../components/BackButton";
import { LoadAnimation } from "../../components/LoadAnimation";

import { api } from "../../services/api";
import { ICarDTO } from "../../dtos/CarDTO";

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
  start_date: string;
  end_date: string;
}

export function MyCars() {
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState<CarsProps[]>([]);

  const { colors } = useTheme();
  const { goBack, navigate } = useNavigation<NavigationProps>();

  function handleBack() {
    goBack();
  }

  function handleCarDetails(car_id: string) {
    navigate("CarDetails", { car_id });
  }

  useEffect(() => {
    async function loadCars() {
      try {
        const { data } = await api.get("/rentals");

        const cars = data.map((schedule: CarsProps) => {
          return {
            car: schedule.car,
            start_date: format(parseISO(schedule.start_date), "dd/MM/yyyy"),
            end_date: format(parseISO(schedule.end_date), "dd/MM/yyyy"),
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
          <LoadAnimation />
        ) :
          (
            <CarList
              data={cars}
              keyExtractor={item => item.car.id}
              renderItem={({ item }) => (
                <CarWrapper>
                  <Car data={item.car} onPress={() => handleCarDetails(item.car.id)} />
                  <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>

                    <CarFooterPeriod>
                      <CarFooterDate>{item.start_date}</CarFooterDate>

                      <AntDesign
                        name="arrowright"
                        size={20}
                        color={colors.title}
                        style={{ marginHorizontal: 10 }} 
                      />

                      <CarFooterDate>{item.end_date}</CarFooterDate>
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
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components/native";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Calendar, DayProps, MarkedDateProps } from "../../components/Calendar";

import ArrowSvg from "../../assets/arrow.svg";

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer
} from "./styles";
import { generateInterval } from "../../components/Calendar/generateInterval";
import { format } from "date-fns";
import { getPlatformDate } from "../../utils/getPlatformDate";

interface NavigationProps {
  navigate(screen: string): void;
  goBack(): void;
}

interface RentalPeriod {
  start: number;
  startFormatted: string;
  end: number;
  endFormatted: string;
}

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  const { colors } = useTheme();
  const { navigate, goBack } = useNavigation<NavigationProps>();

  function handleSchedulingDetailsCar() {
    navigate("SchedulingDetails");
  }

  function handleBack() {
    goBack();
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);

    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      start: start.timestamp,
      end: end.timestamp,
      startFormatted: format(getPlatformDate(new Date(firstDate)), "dd/MM/yyyy"),
      endFormatted: format(getPlatformDate(new Date(endDate)), "dd/MM/yyyy"),
    })
  }

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
          Escolha uma {"\n"}
          data de início e {"\n"}
          fim do aluguel {"\n"}
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleSchedulingDetailsCar} />
      </Footer>
    </Container>
  );
}
import { format } from "date-fns";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Alert, StatusBar, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Button } from "../../components/Button";
import { Accessory } from "../../components/Accessory";
import { ImageSlider } from "../../components/ImageSlider";
import { BackButton } from "../../components/BackButton";

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from "react-native-reanimated";

import {
  Container,
  Header,
  CarImages,
  Brand,
  Description,
  Details,
  Name,
  Period,
  Price,
  Rent,
  Accessories,
  Footer,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPeriod,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal
} from "./styles";

import { api } from "../../services/api";
import { ICarDTO } from "../../dtos/CarDTO";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

interface NavigationProps {
  navigate(screen: string, { }): void;
  goBack(): void;
}

interface Params {
  car: ICarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  const route = useRoute();
  const { colors } = useTheme();

  const { car, dates } = route.params as Params;

  const { navigate, goBack } = useNavigation<NavigationProps>();

  const rentTotal = Number(dates.length * car.price);

  async function handleSchedulingComplete() {
    try {
      setIsLoading(true);

      await api.post("/rentals", {
        user_id: 1,
        car_id: car.id,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: rentTotal
      });

      navigate("Confirmation", {
        title: "Carro Alugado!",
        message: `Agora você só precisa ir\n até a concessionária da RENTX\n pegar o seu automóvel.`,
        nextScreenRoute: "Home",
      });
    }
    catch (error) {
      setIsLoading(false);
      console.log(error);
      Alert.alert("Error", "Não foi possível confirmar o agendamento")
    }
  }

  function handleBack() {
    goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), "dd/MM/yyyy"),
    })
  }, []);


  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      )
    }
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  });

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Animated.View style={[
        headerStyleAnimation,
        styles.header,
        { backgroundColor: colors.background_secondary }
      ]}>
        <Header>
          <BackButton onPress={handleBack} />
        </Header>

        <Animated.View style={sliderCarsStyleAnimation}>
          <CarImages>
            <ImageSlider
              imagesUrl={
                !!car.photos ?
                  car.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
              }
            />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
          alignItems: "center"
        }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>

            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {
            car.accessories.map(accessory => (
              <Accessory
                key={accessory.name}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)} />
            ))
          }
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(15)}
            color={colors.text} />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>

          <RentalPriceDetails>
            <RentalPriceQuota>R$ {car.price} x{dates.length} diárias</RentalPriceQuota>

            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Animated.ScrollView>
 
      <Footer>
        <Button
          title="Alugar agora"
          color={colors.success}
          onPress={handleSchedulingComplete}
          enabled={!isLoading}
          loading={isLoading}
        />
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 1,
  }
})
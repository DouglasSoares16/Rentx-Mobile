import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { 
  About, 
  Brand, 
  CarImage, 
  Container, 
  Details, 
  Name, 
  Period, 
  Price, 
  Rent, 
  Type 
} from "./styles";

import { ICarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

interface Props extends RectButtonProps {
  data: ICarDTO;
}

export function Car({ data, ...rest }: Props){
  const MotorIcon = getAccessoryIcon(data.fuel_type)

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>Ao dia</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage resizeMode="contain" source={{ uri: data.thumbnail }} />
    </Container>
  );
}
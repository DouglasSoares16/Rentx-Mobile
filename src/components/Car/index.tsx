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

import GasolineSvg from "../../assets/gasoline.svg";
import { ICarDTO } from "../../dtos/CarDTO";

interface Props extends RectButtonProps {
  data: ICarDTO;
}

export function Car({ data, ...rest }: Props){
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
            <GasolineSvg />
          </Type>
        </About>
      </Details>

      <CarImage resizeMode="contain" source={{ uri: data.thumbnail }} />
    </Container>
  );
}
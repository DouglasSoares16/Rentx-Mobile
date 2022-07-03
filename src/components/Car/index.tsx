import React from "react";

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

interface CarData {
  name: string;
  brand: string;
  price: number;
  thumbnail: string;
}

interface Props {
  data: CarData;
}

export function Car({ data }: Props){
  return (
    <Container>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>Ao dia</Period>
            <Price>{`R$ ${data.price}`}</Price>
          </Rent>

          <Type>
            <GasolineSvg />
          </Type>
        </About>
      </Details>

      <CarImage resizeMode="cover" source={{ uri: data.thumbnail }} />
    </Container>
  );
}
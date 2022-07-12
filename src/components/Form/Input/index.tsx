import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { TextInputProps } from "react-native";

import { Container, IconContainer, InputText } from "./styles";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function Input({ iconName, value, ...rest }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { colors } = useTheme();

  function handleInputFocus() {
    setIsFocused(true);
  }
  
  function handleInputBlur() {
    setIsFocused(false);

    setIsFilled(!!value);
  }

  return (
    <Container>
      <IconContainer isFocus={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={isFocused || isFilled ? colors.main : colors.text_detail} 
        />
      </IconContainer>

      <InputText 
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocus={isFocused}
        {...rest} 
      />
    </Container>
  );
}
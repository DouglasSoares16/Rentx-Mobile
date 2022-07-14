import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { TextInputProps } from "react-native";

import {
  Container,
  IconContainer,
  InputText
} from "./styles";
import { BorderlessButton } from "react-native-gesture-handler";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: Props) {
  const [passwordVisible, setPasswordVisible] = useState(false);
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

  function handlePasswordVisibilityChange() {
    setPasswordVisible(prevState => !prevState)
  }

  return (
    <Container>
      <IconContainer isFocus={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={isFocused || isFilled ? colors.main : colors.text_detail} />
      </IconContainer>

      <InputText
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        secureTextEntry={!passwordVisible}
        isFocus={isFocused}
        autoCorrect={false}
        {...rest}
      />

      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <IconContainer>
          <Feather name={passwordVisible ? "eye" : "eye-off"} />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
}
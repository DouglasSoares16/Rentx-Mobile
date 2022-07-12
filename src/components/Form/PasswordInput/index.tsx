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
}

export function PasswordInput({ iconName, ...rest }: Props) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { colors } = useTheme();

  function handlePasswordVisibilityChange() {
    setPasswordVisible(prevState => !prevState)
  }

  return (
    <Container>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={colors.text_detail} />
      </IconContainer>

      <InputText secureTextEntry={!passwordVisible} {...rest} />

      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <IconContainer>
          <Feather name={passwordVisible ? "eye": "eye-off"} />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
}
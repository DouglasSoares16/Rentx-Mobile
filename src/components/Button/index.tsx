import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";

import { Container, Title } from "./styles";

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  enabled?: boolean;
}

export function Button({ title, color, enabled = true, ...rest }: Props) {
  const { colors } = useTheme();

  return (
    <Container
      {...rest}
      color={color ? color : colors.main}
      enabled={enabled}
      style={{ opacity: enabled ? 1 : 0.5 }}
    >
      <Title>{title}</Title>
    </Container>
  );
}
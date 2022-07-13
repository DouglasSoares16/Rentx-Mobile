import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface Props {
  isFocus?: boolean;
}

export const Container = styled.View`
  flex-direction: row;
`;

export const IconContainer = styled.View<Props>`
  width: 55px;
  height: 56px;

  justify-content: center;
  align-items: center;

  margin-right: 2px;
  background-color: ${({ theme }) => theme.colors.background_secondary};

  ${({ isFocus, theme }) => isFocus && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `}
`;

export const InputText = styled(TextInput)<Props>`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text};

  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  padding: 0 23px;

  ${({ isFocus, theme }) => isFocus && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `}
`;
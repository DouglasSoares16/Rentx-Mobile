import { ReactNode } from "react";
import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { BorderlessButton, RectButton, TouchableOpacity } from "react-native-gesture-handler";

interface ButtonProps {
  children: ReactNode;
}

interface OptionsProps {
  active: boolean;
  children: ReactNode;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(227)}px;

  background-color: ${({ theme }) => theme.colors.header};

  padding: 0 24px;

  align-items: center;
`;

export const HeaderTop = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: ${getStatusBarHeight() + RFValue(32)}px;
`;

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.shape};
`;

export const LogoutButton = styled(BorderlessButton) <ButtonProps>``;

export const PhotoContainer = styled.View`
  width: ${RFValue(180)}px;
  height: ${RFValue(180)}px;

  border-radius: 90px;
  background-color: ${({ theme }) => theme.colors.shape};
  margin-top: ${RFValue(48)}px;
`;

export const Photo = styled.Image`
  width: ${RFValue(180)}px;
  height: ${RFValue(180)}px;
  border-radius: 90px;
`;

export const PhotoButton = styled(RectButton) <ButtonProps>`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;

  background-color: ${({ theme }) => theme.colors.main};

  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 5px;
  right: 5px;
`;

export const Content = styled.ScrollView`
  flex: 1;
  padding: 0 24px;
  margin-top: ${RFValue(122)}px;
`;

export const Options = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};

  flex-direction: row;
  justify-content: space-around;

  margin-bottom: 24px;
`;

export const Option = styled(TouchableOpacity)<OptionsProps>`
  padding-bottom: 14px;

  ${({ theme, active }) => active && css`
    border-bottom-width: 3px;
    border-bottom-color: ${theme.colors.main};
  `}
`;

export const OptionTitle = styled.Text<OptionsProps>`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme, active }) => active ?
    theme.fonts.secondary_600 :
    theme.fonts.secondary_500
  };
  
  color: ${({ theme, active }) => active ?
    theme.colors.header :
    theme.colors.text_detail
  };
`;

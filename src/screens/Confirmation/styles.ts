import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.header};
`;

export const Content = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  position: absolute;
  margin-top: 30px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_600};

  margin-top: 40px;
`;

export const Message = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  text-align: center;
  line-height: 25px;

  margin-top: 16px;
  padding-bottom: 60px;
`;

export const Footer = styled.View`
  width: 100%;
  align-items: center;

  margin: 10px 0 40px;
`;

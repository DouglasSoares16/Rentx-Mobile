import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import { BackButton } from "../../components/BackButton";

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle
} from "./styles";

export function Profile() {
  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");
  const { colors } = useTheme();
  const { goBack } = useNavigation();

  function handleGoBack() {
    goBack();
  }

  function handleLogout() {
    // logout
  }

  function handleOptionChange(option: "dataEdit" | "passwordEdit") {
    setOption(option);
  }

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton color={colors.shape} onPress={handleGoBack} />

          <HeaderTitle>Editar Perfil</HeaderTitle>

          <LogoutButton onPress={handleLogout}>
            <Feather
              name="power"
              size={24}
              color={colors.shape} />
          </LogoutButton>
        </HeaderTop>

        <PhotoContainer>
          <Photo source={{ uri: "https://github.com/DouglasSoares16.png" }} />
          <PhotoButton onPress={() => { }}>
            <Feather
              name="camera"
              size={RFValue(24)}
              color={colors.shape} />
          </PhotoButton>
        </PhotoContainer>
      </Header>

      <Content>
        <Options>
          <Option
            active={option === "dataEdit"}
            onPress={() => handleOptionChange("dataEdit")}
          >
            <OptionTitle active={option === "dataEdit"}>Dados</OptionTitle>
          </Option>

          <Option
            active={option === "passwordEdit"}
            onPress={() => handleOptionChange("passwordEdit")}
          >
            <OptionTitle active={option === "passwordEdit"}>Trocar senha</OptionTitle>
          </Option>
        </Options>
      </Content>
    </Container>
  );
}
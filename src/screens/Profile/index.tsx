import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from "react-native";

import { Input } from "../../components/Form/Input";
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
  OptionTitle,
  Section
} from "./styles";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { PasswordInput } from "../../components/Form/PasswordInput";
import { useAuth } from "../../contexts/AuthContext";

export function Profile() {
  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");

  const { user } = useAuth();
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
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
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

            {
              option === "dataEdit" ? (
                <Section>
                  <Input
                    iconName="user"
                    placeholder="Nome"
                    autoCorrect={false}
                    autoCapitalize="sentences"
                    defaultValue={user.name}
                  />

                  <Input
                    iconName="mail"
                    placeholder="E-mail"
                    editable={false}
                    defaultValue={user.email}
                  />

                  <Input
                    iconName="credit-card"
                    placeholder="CNH"
                    keyboardType="numeric"
                    defaultValue={user.driver_license}
                  />
                </Section>
              ) 
              : 
              (
                <Section>
                  <PasswordInput
                    iconName="lock"
                    placeholder="Senha Atual"
                  />

                  <PasswordInput
                    iconName="lock"
                    placeholder="Nova Senha"
                  />

                  <PasswordInput
                    iconName="lock"
                    placeholder="Repetir Senha"
                  />
                </Section>
              )
            }
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
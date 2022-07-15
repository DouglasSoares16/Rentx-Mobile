import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
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
  const { user, signOut } = useAuth();

  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);
  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");

  const { colors } = useTheme();
  const { goBack } = useNavigation();

  function handleGoBack() {
    goBack();
  }

  async function handleLogout() {
    await signOut();
  }

  function handleOptionChange(option: "dataEdit" | "passwordEdit") {
    setOption(option);
  }

  async function handleSelectAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    });

    if (result.cancelled)
      return;

    if (result.uri)
      setAvatar(result.uri);
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
              {!!avatar && (<Photo source={{ uri: avatar }} />)}
              <PhotoButton onPress={handleSelectAvatar}>
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
              option === "dataEdit" ?
                (
                  <Section>
                    <Input
                      iconName="user"
                      placeholder="Nome"
                      autoCorrect={false}
                      autoCapitalize="sentences"
                      defaultValue={user.name}
                      onChangeText={setName}
                      value={name}
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
                      onChangeText={setDriverLicense}
                      value={driverLicense}
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
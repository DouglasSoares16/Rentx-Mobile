import * as Yup from "yup";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, Alert, StatusBar } from "react-native";

import { Button } from "../../components/Button";
import { Input } from "../../components/Form/Input";
import { useAuth } from "../../contexts/AuthContext";
import { BackButton } from "../../components/BackButton";
import { PasswordInput } from "../../components/Form/PasswordInput";

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

export function Profile() {
  const { user, signOut, updateUser } = useAuth();

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

  async function handleUpdateProfile() {
    const schema = Yup.object().shape({
      driverLicense: Yup.string()
        .required("CNH é obrigatória"),

      name: Yup.string()
        .required("O Nome é obrigatório")
    });

    try {
      await schema.validate({
        name,
        driverLicense
      });

      await updateUser({
        name,
        email: user.email,
        avatar,
        driver_license: driverLicense,
        id: user.id,
        token: user.token
      });

      Alert.alert("Sucesso", "Perfil Atualizado!");
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Erro", error.message);
      }
      else {
        console.log(error);
        Alert.alert("Erro", "Não foi possível atualizar o perfil");
      }
    }
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

  function handleOptionChange(option: "dataEdit" | "passwordEdit") {
    setOption(option);
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="light-content"
            backgroundColor={colors.header}
            translucent
          />

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

            <Button
              title="Salvar Alterações"
              onPress={handleUpdateProfile}
            />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Keyboard, ScrollView, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "styled-components/native";

import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { PasswordInput } from "../../../components/Form/PasswordInput";
import { api } from "../../../services/api";

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from "./styles";

interface NavigationProps {
  goBack(): void;
  navigate(screen: string, { }): void;
}

interface UserData {
  name: string;
  email: string;
  cnh: string;
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { goBack, navigate } = useNavigation<NavigationProps>();
  const route = useRoute();

  const user = route.params as UserData;

  const { colors } = useTheme();
  function handleGoBack() {
    goBack();
  }

  async function handleRegister() {
    setIsLoading(true);

    if (!password || !passwordConfirm)
      return Alert.alert("Erro", "Preencha todos os campos");

    if (password !== passwordConfirm)
      return Alert.alert("Erro", "As senhas não são iguais");

    try {
      await api.post("/users", {
        name: user.name,
        email: user.email,
        password,
        driver_license: user.cnh
      });

      navigate("Confirmation", {
        title: "Conta Criada!",
        message: `Agora é só fazer login\n e aproveitar.`,
        nextScreenRoute: "SignIn",
      });
    } catch (error: any) {
      console.log(error.message)
      Alert.alert("Opa", "Não foi possível realizar o cadastro");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <BackButton onPress={handleGoBack} />

          <Steps>
            <Bullet />
            <Bullet active />
          </Steps>
        </Header>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Title>
            Crie sua{"\n"}conta
          </Title>
          <SubTitle>
            Faça seu cadastro{"\n"}
            de forma rápido e fácil.
          </SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir Senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm} />
          </Form>

          <Button
            title="Cadastrar"
            color={colors.success}
            onPress={handleRegister}
            enabled={!isLoading}
            loading={isLoading}
          />
        </ScrollView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
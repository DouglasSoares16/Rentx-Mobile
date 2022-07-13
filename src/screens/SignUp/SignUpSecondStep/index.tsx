import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Keyboard, ScrollView, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "styled-components/native";

import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { PasswordInput } from "../../../components/Form/PasswordInput";

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
}

export function SignUpSecondStep() {
  const { goBack } = useNavigation<NavigationProps>();
  const { colors } = useTheme();

  function handleGoBack() {
    goBack();
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <BackButton onPress={handleGoBack} />

          <Steps>
            <Bullet active />
            <Bullet />
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

            <PasswordInput iconName="lock" placeholder="Senha" />
            <PasswordInput iconName="lock" placeholder="Repetir Senha" />
          </Form>

          <Button title="Cadastrar" color={colors.success} />
        </ScrollView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
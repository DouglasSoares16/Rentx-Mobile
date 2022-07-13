import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Keyboard, ScrollView, TouchableWithoutFeedback } from "react-native";

import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Form/Input";

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
  navigate(screen: string): void;
}

export function SignUpFirstStep() {
  const { goBack, navigate } = useNavigation<NavigationProps>();

  function handleGoBack() {
    goBack();
  }

  function handleNextStep() {
    navigate("SignUpSecondStep");
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
            <FormTitle>1. Dados</FormTitle>

            <Input iconName="user" placeholder="Nome" />

            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
            />

            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric" />
          </Form>

          <Button title="Próximo" onPress={handleNextStep} />
        </ScrollView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
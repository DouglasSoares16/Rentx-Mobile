import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Keyboard, ScrollView, TouchableWithoutFeedback } from "react-native";
import * as Yup from "yup";

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
  navigate(screen: string, {}): void;
}

export function SignUpFirstStep() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [driverLicense, setDriverLicense] = useState("");

  const { goBack, navigate } = useNavigation<NavigationProps>();

  function handleGoBack() {
    goBack();
  }

  async function handleNextStep() {
    const schema = Yup.object().shape({
      cnh: Yup.string().required("CNH é obrigatório"),
      
      email: Yup.string()
      .required("E-mail é obrigatório")
      .email("Digite um e-mail válido"),
      
      name: Yup.string().required("Nome é obrigatório"),
    });

    try {
      const data = {
        name,
        email,
        cnh: driverLicense
      };

      await schema.validate(data);

      navigate("SignUpSecondStep", data);
    } catch(error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Erro", error.message);
      }
    }
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
            de forma rápida e fácil.
          </SubTitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>

            <Input
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name} />

            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />

            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </Form>

          <Button title="Próximo" onPress={handleNextStep} />
        </ScrollView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
import React, { useState } from "react";
import * as Yup from "yup";
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";

import { Button } from "../../components/Button";
import { Input } from "../../components/Form/Input";
import { PasswordInput } from "../../components/Form/PasswordInput";

import {
  Container,
  Footer,
  Form,
  Header,
  SubTitle,
  Title
} from "./styles";

interface NavigationProps {
  navigate(screen: string): void;
}

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { colors } = useTheme();
  const { navigate } = useNavigation<NavigationProps>();

  async function handleSignIn() {
    const schema = Yup.object().shape({
      email: Yup.string()
        .required("E-mail obrigatório")
        .email("Digite um e-mail válido"),

      password: Yup.string().required("A senha é obrigatória")
    });

    try {
      await schema.validate({ email, password });
    } catch(error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Erro", error.message);
      } else {
        Alert.alert(
          "Erro na autenticação", 
          "Ocorreu um erro ao fazer login, verifique suas credenciais"
        );
      }
    }
  }

  function handleCreateNewAccount() {
    navigate("SignUpFirstStep");
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />

          <Header>
            <Title>Estamos{'\n'}quase lá</Title>

            <SubTitle>
              Faça seu login para começar{"\n"}
              uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button title="Login" onPress={handleSignIn} />
            <Button
              title="Criar conta gratuita"
              light
              color={colors.background_secondary}
              loading={false} 
              onPress={handleCreateNewAccount}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>

  );
}
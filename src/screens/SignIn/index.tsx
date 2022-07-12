import React, { useState } from "react";
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
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

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colors } = useTheme();

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
            <Button title="Login" />
            <Button
              title="Criar conta gratuita"
              light
              color={colors.background_secondary}
              loading={false} />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>

  );
}
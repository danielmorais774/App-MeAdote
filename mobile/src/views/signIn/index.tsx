import React, {useRef, useCallback, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  Dimensions,
  Alert,
  TouchableNativeFeedback,
} from 'react-native';

import InputText from '../../components/InputText';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import {useAuth} from '../../hooks/auth';

import {Container, LogoImage, BottomLabel, DescriptionLabel} from './styles';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const {height} = Dimensions.get('window');
  const formRef = useRef<FormHandles>(null);

  const {navigate} = useNavigation();
  const {signIn} = useAuth();

  //state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          password: Yup.string()
            .required('Senha obrigatória')
            .min(8, 'Senha deve ter pelo menos 8 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setIsLoading(true);

        await signIn({email: data.email, password: data.password});

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais',
        );
      }
    },
    [signIn],
  );

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <Container>
        <LogoImage source={require('../../assets/images/profile.png')} />
        <DescriptionLabel>
          Preencha os campos abaixo com suas credenciais.
        </DescriptionLabel>
        <Form
          ref={formRef}
          style={{height: height - 280}}
          onSubmit={handleSignIn}>
          <InputText
            name={'email'}
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder={'Email'}
            editable={!isLoading}
          />

          <InputText
            name={'password'}
            secureTextEntry
            placeholder={'Senha'}
            editable={!isLoading}
          />

          <Button
            title="Entrar"
            onPress={() => {
              formRef.current?.submitForm();
            }}
            contentStyle={{marginTop: 15}}
            labelStyle={{fontSize: 15}}
            isLoading={isLoading}
          />
        </Form>

        <TouchableNativeFeedback onPress={() => navigate('SignUp')}>
          <BottomLabel>
            Não possui uma conta?{' '}
            <Text style={{color: '#3DC162'}}>Criar conta</Text>
          </BottomLabel>
        </TouchableNativeFeedback>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

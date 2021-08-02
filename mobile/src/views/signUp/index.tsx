import React, {useRef, useCallback, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Alert,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';

import InputText from '../../components/InputText';
import Button from '../../components/Button';
import InputMask from '../../components/InputMask';
import RNPickerSelect from '../../components/RNPickerSelect';
import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  TitleView,
  Row,
  DescriptionLabel,
  BottomLabel,
} from './styles';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';

import {citiesService, usersService} from '../../services';
import {useEffect} from 'react';
import {ICity} from '../../models/city';

import {Item} from 'react-native-picker-select';

interface SignInFormData {
  name: string;
  email: string;
  city: string;
  password: string;
  passwordConfirm: string;
}

const SignUp: React.FC = () => {
  const {height} = Dimensions.get('window');
  const formRef = useRef<FormHandles>(null);

  const {goBack} = useNavigation();

  //states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingCity, setIsLoadingCity] = useState<boolean>(false);
  const [cities, setCities] = useState<ICity[]>([]);

  const loadApi = useCallback(async () => {
    try {
      setIsLoadingCity(true);
      setCities(await citiesService.getCities());
      setIsLoadingCity(false);
    } catch (e) {
      setIsLoadingCity(false);
      Alert.alert('Problema de conexão', 'Não foi possivel as cidades!', [
        {text: 'Ok'},
      ]);
    }
  }, []);

  useEffect(() => {
    loadApi();
  }, [loadApi]);

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const phoneRegExp = /\d{11}/;

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          city: Yup.string().required('Selecione uma cidade'),
          phone: Yup.string().matches(phoneRegExp, 'Telefone é inválido'),
          password: Yup.string()
            .required('Senha obrigatória')
            .min(8, 'Senha deve ter pelo menos 8 dígitos'),
          passwordConfirm: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'As senhas devem corresponder',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setIsLoading(true);

        await usersService.createUser({
          name: data.name,
          email: data.email,
          password: data.password,
          cityId: data.city,
        });

        setIsLoading(false);

        Alert.alert(
          'Conta Registrada!',
          'Volte para tela de login e use as credencias para acessar',
          [{text: 'Voltar para login', onPress: () => goBack()}],
        );
      } catch (err) {
        setIsLoading(false);

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro ao cadastrar',
          'Ocorreu um erro ao seu cadastro, tente novamente!',
        );
      }
    },
    [goBack],
  );

  const formatItensPicker = useCallback((citiesItems: ICity[]): Item[] => {
    let items: Item[] = [];

    citiesItems.forEach(city => {
      items.push({label: city.name, value: city.id});
    });

    return items;
  }, []);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <Container>
        <TitleView>Área de Cadastro</TitleView>
        <DescriptionLabel>
          Preencha os campos abaixo com suas informações.
        </DescriptionLabel>
        <Form
          ref={formRef}
          onSubmit={handleSignIn}
          style={{height: height - 200}}>
          <InputText name={'name'} placeholder={'Nome'} editable={!isLoading} />
          <InputText
            name={'email'}
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder={'Email'}
            editable={!isLoading}
          />
          <Row>
            <View style={{flex: 1, marginRight: 7}}>
              <RNPickerSelect
                items={formatItensPicker(cities)}
                name={'city'}
                placeholder="Cidade"
                isLoading={isLoadingCity || isLoading}
              />
            </View>

            <View style={{flex: 1, marginLeft: 7}}>
              <InputMask
                type="cel-phone"
                name={'phone'}
                placeholder={'Telefone'}
                editable={!isLoading}
              />
            </View>
          </Row>
          <InputText
            name={'password'}
            secureTextEntry
            placeholder={'Senha'}
            editable={!isLoading}
          />
          <InputText
            name={'passwordConfirm'}
            secureTextEntry
            placeholder={'Confirmar Senha'}
            editable={!isLoading}
          />

          <Button
            title="Criar Conta"
            onPress={() => {
              formRef.current?.submitForm();
            }}
            contentStyle={{marginTop: 15}}
            labelStyle={{fontSize: 15}}
            isLoading={isLoading}
          />
        </Form>
        <TouchableWithoutFeedback onPress={() => goBack()}>
          <BottomLabel>
            Possui uma conta?{' '}
            <Text style={{color: '#3DC162'}}>Fazer Login</Text>
          </BottomLabel>
        </TouchableWithoutFeedback>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

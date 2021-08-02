import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import ImagePicker, {Image} from 'react-native-image-crop-picker';
import Toast from 'react-native-simple-toast';
import * as Yup from 'yup';

import InputText from '../../../components/InputText';
import RNPickerSelect from '../../../components/RNPickerSelect';
import InputMask from '../../../components/InputMask';
import Button from '../../../components/Button';

import {
  Container,
  Row,
  TitleView,
  ButtonBack,
  PhofileImage,
  ProfileImageContainer,
  ProfileImageLabel,
} from './styles';

import {ICity} from '../../../models/city';
import {Item} from 'react-native-picker-select';
import {citiesService, usersService} from '../../../services';
import {formatUserProfileData} from '../../../utils/formatUserProfileData';
import getValidationErrors from '../../../utils/getValidationErrors';
import {useAuth} from '../../../hooks/auth';

interface IUserFormData {
  name: string;
  email: string;
  avatarUrl?: string | Image;
  phone: string;
  city: string;
}

const EditProfile: React.FC = () => {
  const {height} = Dimensions.get('window');

  //refs
  const formRef = useRef<FormHandles>(null);

  //hooks
  const {goBack} = useNavigation();
  const {updateUser} = useAuth();

  //states
  const [userProfile, setUserProfile] = useState<IUserFormData>(
    {} as IUserFormData,
  );

  //states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingCity, setIsLoadingCity] = useState<boolean>(false);
  const [isLoadingSave, setIsLoadingSave] = useState<boolean>(false);
  const [cities, setCities] = useState<ICity[]>([]);

  const loadApi = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsLoadingCity(true);

      const values = await Promise.all([
        usersService.getUserProfile(),
        citiesService.getCities(),
      ]);

      setIsLoading(false);
      setIsLoadingCity(false);

      setCities(values[1]);
      setUserProfile(formatUserProfileData<IUserFormData>(values[0]));

      // set manual de valor no picker city
      formRef.current?.setFieldValue('city', values[0].city.id);
    } catch (e) {
      setIsLoading(false);
      setIsLoadingCity(false);

      Alert.alert(
        'Error',
        'Não foi possivel carregar as informações, tente novamente!',
        [{text: 'Ok', onPress: () => goBack()}],
      );
    }
  }, [goBack]);

  useEffect(() => {
    loadApi();

    return () => {
      ImagePicker.clean();
    };
  }, [loadApi]);

  const uploadProfileImage = () => {
    ImagePicker.openPicker({
      height: 1000,
      width: 1000,
      cropping: true,
      mediaType: 'photo',
    })
      .then(file => {
        setUserProfile({...userProfile, avatarUrl: file});
      })
      .catch(() => {
        Toast.show('Falha ao carregar imagem');
      });
  };

  const formatItensPicker = useCallback((citiesItems: ICity[]): Item[] => {
    let items: Item[] = [];

    citiesItems.forEach(city => {
      items.push({label: city.name, value: city.id});
    });

    return items;
  }, []);

  const handleSubmitProfileSave = useCallback(
    async (data: IUserFormData): Promise<void> => {
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
          password: Yup.string().min(8, 'Senha deve ter pelo menos 8 dígitos'),
          passwordConfirm: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'As senhas devem corresponder',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setIsLoadingSave(true);

        const userUpdated = await usersService.updateUserProfile({
          name: data.name,
          cityId: data.city,
          phone: data.phone,
          avatar:
            typeof userProfile.avatarUrl !== 'string'
              ? userProfile.avatarUrl
              : null,
        });

        updateUser({
          id: userUpdated.id,
          name: userUpdated.name,
          email: userUpdated.email,
          city: userUpdated.city,
          phone: userUpdated.phone,
          avatarUrl: userUpdated.avatarUrl,
        });

        setIsLoadingSave(false);
      } catch (err) {
        setIsLoadingSave(false);

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro ao salvar',
          'Ocorreu um erro ao alterar suas informações, tente novamente!',
        );
      }
    },
    [userProfile, updateUser],
  );

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <Container>
        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <ButtonBack onPress={() => goBack()}>
            <FeatherIcons name="arrow-left" size={25} color="#343434" />
          </ButtonBack>

          <TitleView>Editar Perfil</TitleView>
          <View style={{width: 35}} />
        </Row>
        {isLoading ? (
          <View
            style={{
              height: height - 80,
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={'large'} color="#3DC162" />
          </View>
        ) : (
          <>
            <ProfileImageContainer onPress={uploadProfileImage}>
              {userProfile?.avatarUrl ? (
                <PhofileImage
                  source={
                    typeof userProfile.avatarUrl === 'string'
                      ? {uri: userProfile.avatarUrl}
                      : {uri: userProfile.avatarUrl.path}
                  }
                />
              ) : (
                <PhofileImage
                  source={require('../../../assets/images/profile.png')}
                />
              )}
              <ProfileImageLabel>Alterar Imagem</ProfileImageLabel>
            </ProfileImageContainer>

            <Form
              ref={formRef}
              onSubmit={handleSubmitProfileSave}
              initialData={userProfile}>
              <InputText
                name={'name'}
                placeholder={'Nome'}
                editable={!isLoadingSave}
              />
              <InputText
                name={'email'}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder={'Email'}
                editable={false}
              />
              <Row>
                <View style={{flex: 1, marginRight: 7}}>
                  <RNPickerSelect
                    items={formatItensPicker(cities)}
                    name={'city'}
                    placeholder="Cidade"
                    isLoading={isLoadingCity || isLoadingSave}
                  />
                </View>

                <View style={{flex: 1, marginLeft: 7}}>
                  <InputMask
                    type="cel-phone"
                    name={'phone'}
                    placeholder={'Telefone'}
                    editable={!isLoadingSave}
                  />
                </View>
              </Row>

              <Button
                title="SALVAR MODIFICAÇÕES"
                onPress={() => {
                  formRef.current?.submitForm();
                }}
                contentStyle={{marginTop: 20}}
                labelStyle={{fontSize: 13}}
                isLoading={isLoadingSave}
              />
            </Form>
          </>
        )}
      </Container>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;

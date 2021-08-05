import React, {useState, useCallback, useRef, useEffect, useMemo} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  ActivityIndicator,
  Dimensions,
  Alert,
  FlatList,
} from 'react-native';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {RouteProp, useNavigation} from '@react-navigation/native';
import ImagePicker, {Image} from 'react-native-image-crop-picker';
import Toast from 'react-native-simple-toast';
import * as Yup from 'yup';

import InputText from '../../components/InputText';
import RNPickerSelect from '../../components/RNPickerSelect';
import InputMask from '../../components/InputMask';
import Button from '../../components/Button';
import ImageItem from './ImageItem';

import {Container, Row, TitleView, ButtonBack, ContainerBottom} from './styles';

import {Item} from 'react-native-picker-select';
import getValidationErrors from '../../utils/getValidationErrors';
import {IBreed} from '../../models/breed';
import {petsService} from '../../services';
import {IImage} from '../../models/image';

interface IPetFormData {
  name: string;
  color: string;
  age: string;
  breed: string;
  gender: 'male' | 'female';
}

export interface IImageCustom extends IImage {
  id: string;
  type?: 'create';
}

interface IImageCropCustom extends Image {
  id: string;
}

export interface IImageItem {
  image: IImageCustom | IImageCropCustom;
}

const AddOrEditPet: React.FC<{
  route: RouteProp<{params: {id: string}}, 'params'>;
}> = ({route}) => {
  const {height} = Dimensions.get('window');

  //params
  const petId = route.params?.id;

  //refs
  const formRef = useRef<FormHandles>(null);

  //hooks
  const {goBack} = useNavigation();

  //states
  const [breeds, setBreeds] = useState<IBreed[]>([]);

  //states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingBreed, setIsLoadingBreed] = useState<boolean>(false);
  const [isLoadingSave, setIsLoadingSave] = useState<boolean>(false);
  const [petInfo, setPetInfo] = useState<IPetFormData>({} as IPetFormData);
  const [petImages, setPetImages] = useState<IImageItem[]>([
    {image: {type: 'create'} as IImageCustom},
  ]);
  const [petimagesDeleted, setPetImagesDeleted] = useState<string[]>([]);

  const loadApi = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsLoadingBreed(true);

      if (petId) {
        const values = await Promise.all([
          petsService.getBreeds(),
          petsService.getPetDetailsById(petId),
        ]);

        setBreeds(values[0]);
        setPetInfo({
          name: values[1].name,
          age: values[1].age.toString(),
          color: values[1].color,
          gender: values[1].gender,
          breed: values[1].breed.id,
        });

        if (values[1].images) {
          let images: IImageItem[] = [];

          values[1].images.forEach(image => {
            images.push({image: image} as IImageItem);
          });

          setPetImages(old => [...old, ...images]);
        }

        // set manual de valor no picker city
        formRef.current?.setFieldValue('gender', values[1].gender);
        formRef.current?.setFieldValue('breed', values[1].breed.id);
      } else {
        setBreeds(await petsService.getBreeds());
      }

      setIsLoading(false);
      setIsLoadingBreed(false);
    } catch (e) {
      setIsLoading(false);

      Alert.alert(
        'Error',
        'Não foi possivel carregar as informações, tente novamente!',
        [{text: 'Ok', onPress: () => goBack()}],
      );
    }
  }, [goBack, petId]);

  useEffect(() => {
    loadApi();

    return () => {
      ImagePicker.clean();
    };
  }, [loadApi]);

  const uploadImage = () => {
    ImagePicker.openPicker({
      height: 1000,
      width: 1000,
      cropping: true,
      mediaType: 'photo',
    })
      .then(file => {
        setPetImages([...petImages, {image: file as IImageCropCustom}]);
      })
      .catch(() => {
        Toast.show('Falha ao carregar imagem');
      });
  };

  const formatItensPicker = useCallback((breedItems: IBreed[]): Item[] => {
    let items: Item[] = [];

    breedItems.forEach(breed => {
      items.push({label: breed.name, value: breed.id});
    });

    return items;
  }, []);

  const handleSubmit = useCallback(
    async (data: IPetFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          color: Yup.string().required('E-mail obrigatório'),
          gender: Yup.string().required('Selecione um sexo'),
          age: Yup.string()
            .min(1, 'Idade Inválida')
            .max(3, 'Limite de idade atingido'),
          breed: Yup.string().required('Selecione uma raça'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (petImages.length <= 1) {
          Alert.alert('Imagens obrigatórias!', 'Insira pelo menos uma imagem!');
        }

        setIsLoadingSave(true);

        if (petId) {
          await petsService.updatePet(petId, {
            name: data.name,
            color: data.color,
            age: parseInt(data.age, 10),
            breedId: data.breed,
            gender: data.gender,
            images: petImages
              .filter(
                petImage =>
                  !('type' in petImage.image) && !('id' in petImage.image),
              )
              .map(petImage => {
                return petImage.image as Image;
              }),
            imagesDeleted: petimagesDeleted,
          });

          Alert.alert(
            'Pet atualizado!',
            'As novas informações do pet foi incluido na lista de adoção!',
            [{text: 'Ok', onPress: () => goBack()}],
          );
        } else {
          await petsService.createPet({
            name: data.name,
            color: data.color,
            age: parseInt(data.age, 10),
            breedId: data.breed,
            gender: data.gender,
            images: petImages
              .filter(petImage => !('type' in petImage.image))
              .map(petImage => {
                return petImage.image as Image;
              }),
          });

          Alert.alert(
            'Pet registrado!',
            'O pet foi incluido na lista de adoção!',
            [{text: 'Ok', onPress: () => goBack()}],
          );
        }

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
    [petImages, goBack, petimagesDeleted, petId],
  );

  const removeImageItem = useCallback(
    (idx: number) => {
      const petImage = petImages.find((_, index) => index === idx);

      if (petImage && petImage.image.hasOwnProperty('id')) {
        setPetImagesDeleted(old => [...old, petImage.image.id]);
      }

      setPetImages(petImages.filter((_, index) => index !== idx));
    },
    [petImages],
  );

  const handleItemRemove = useCallback(
    (idx: number) => {
      Alert.alert(
        'Tem certeza?',
        'Será deletado permanentemente',
        [
          {
            text: 'Não',
            style: 'cancel',
          },
          {
            text: 'Sim, deletar!',
            onPress: () => removeImageItem(idx),
          },
        ],
        {
          cancelable: true,
        },
      );
    },
    [removeImageItem],
  );

  const Header = useMemo(
    () => (
      <>
        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <ButtonBack onPress={() => goBack()}>
            <FeatherIcons name="arrow-left" size={25} color="#343434" />
          </ButtonBack>

          <TitleView>Pet</TitleView>
          <View style={{width: 35}} />
        </Row>

        {!isLoading && (
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            style={{marginTop: 30, marginBottom: 20}}
            initialData={petInfo}>
            <InputText
              name={'name'}
              placeholder={'Nome'}
              editable={!isLoadingSave}
            />
            <InputText
              name={'color'}
              placeholder={'Cor'}
              editable={!isLoadingSave}
            />

            <RNPickerSelect
              items={[
                {value: 'female', label: 'Feminino'},
                {value: 'male', label: 'Masculino'},
              ]}
              name={'gender'}
              placeholder="Sexo"
              isLoading={isLoadingSave}
            />

            <InputMask
              type="only-numbers"
              name={'age'}
              placeholder={'Idade (meses)'}
              maxLength={3}
              editable={!isLoadingSave}
            />

            <RNPickerSelect
              items={formatItensPicker(breeds)}
              name={'breed'}
              placeholder="Raça"
              isLoading={isLoadingBreed || isLoadingSave}
            />
          </Form>
        )}
      </>
    ),
    [
      goBack,
      isLoadingBreed,
      isLoadingSave,
      isLoading,
      breeds,
      petInfo,
      formatItensPicker,
      handleSubmit,
    ],
  );

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <Container>
        {isLoading ? (
          <View style={{marginTop: 15}}>
            {Header}
            <View style={{height: height - 90, justifyContent: 'center'}}>
              <ActivityIndicator color="#3DC162" size="large" />
            </View>
          </View>
        ) : (
          <FlatList
            data={petImages}
            renderItem={({item, index}) => (
              <ImageItem
                index={index}
                item={item}
                handleAddImage={uploadImage}
                handleRemoveImage={handleItemRemove}
              />
            )}
            ListHeaderComponent={Header}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{
              paddingHorizontal: 2,
              paddingBottom: 70,
              paddingTop: 15,
            }}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              flex: 0.5,
              justifyContent: 'space-between',
            }}
            numColumns={4}
          />
        )}
      </Container>

      {!isLoading && (
        <ContainerBottom>
          <Button
            title="SALVAR MODIFICAÇÕES"
            onPress={() => {
              formRef.current?.submitForm();
            }}
            contentStyle={{marginTop: 20}}
            labelStyle={{fontSize: 13}}
            isLoading={isLoadingSave}
          />
        </ContainerBottom>
      )}
    </KeyboardAvoidingView>
  );
};

export default AddOrEditPet;

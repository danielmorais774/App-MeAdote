import React, {useState, useCallback, useEffect} from 'react';
import {View, ActivityIndicator, Dimensions, Alert} from 'react-native';

import FeatherIcons from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import Button from '../../../components/Button';
import PetList from '../../../components/PetList';

import {Container, Row, TitleView, ButtonBack, FabButton} from './styles';

import {usersService} from '../../../services';
import {IPetRaw} from '../../../models/petRaw';

const MyPets: React.FC = () => {
  const {height} = Dimensions.get('window');

  //hooks
  const {goBack, navigate} = useNavigation();

  //states
  const [myPets, setMyPets] = useState<IPetRaw[]>([]);

  //states
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadApi = useCallback(async () => {
    try {
      setIsLoading(true);
      setMyPets(await usersService.getMyPets());
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);

      Alert.alert(
        'Error',
        'Não foi possivel carregar as informações, tente novamente!',
        [{text: 'Ok', onPress: () => goBack()}],
      );
    }
  }, [goBack]);

  useEffect(() => {
    loadApi();

    return () => {};
  }, [loadApi]);

  const Header = useCallback(
    () => (
      <Row
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 15,
          marginBottom: 30,
        }}>
        <ButtonBack onPress={() => goBack()}>
          <FeatherIcons name="arrow-left" size={25} color="#343434" />
        </ButtonBack>

        <TitleView>Meus Pets</TitleView>
        <View style={{width: 35}} />
      </Row>
    ),
    [goBack],
  );

  return (
    <Container>
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
          <PetList
            data={myPets}
            paddingHorizontal={0}
            paddingBottom={75}
            header={Header}
            onPressItem={id => navigate('AddOrEditPet', {id})}
          />
          <FabButton onPress={() => navigate('AddOrEditPet')}>
            <Ionicons name="paw-outline" size={20} color="#fff" />
          </FabButton>
        </>
      )}
    </Container>
  );
};

export default MyPets;

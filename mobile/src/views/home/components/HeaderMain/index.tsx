import React from 'react';
import {View} from 'react-native';

import {
  Container,
  Row,
  ProfileImageContainer,
  ProfilePhoto,
  CircleContainer,
  LabelCustom,
  AndressCustom,
} from './styles';

//icons
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useAuth} from '../../../../hooks/auth';
import {useNavigation} from '@react-navigation/native';

const HeaderMain: React.FC = () => {
  const {user} = useAuth();
  const {navigate} = useNavigation();

  return (
    <Container>
      <Row>
        <View style={{flex: 1}}>
          <ProfileImageContainer>
            <ProfilePhoto
              source={
                user.avatarUrl
                  ? {uri: user.avatarUrl}
                  : require('../../../../assets/images/profile.png')
              }
            />
          </ProfileImageContainer>
        </View>
        <CircleContainer onPress={() => navigate('AddOrEditPet')}>
          <Ionicons name="paw-outline" size={22} color={'#323232'} />
        </CircleContainer>
        <CircleContainer style={{marginLeft: 10}}>
          <FeatherIcon name="search" size={22} color={'#323232'} />
        </CircleContainer>
        <CircleContainer style={{marginLeft: 10}}>
          <FeatherIcon name="bell" size={22} color={'#323232'} />
        </CircleContainer>
      </Row>
      <View style={{marginTop: 10}}>
        <LabelCustom>Localização</LabelCustom>
        <AndressCustom>
          {user.city.name}, {user.city.state}
        </AndressCustom>
      </View>
    </Container>
  );
};

export default HeaderMain;

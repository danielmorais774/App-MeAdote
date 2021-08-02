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
import {useAuth} from '../../../../hooks/auth';

const HeaderMain: React.FC = () => {
  const {user} = useAuth();

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
        <CircleContainer>
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

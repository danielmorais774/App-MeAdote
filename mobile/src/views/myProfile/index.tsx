import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import {
  Container,
  Row,
  TitleView,
  Header,
  ProfileImageContainer,
  ProfilePhoto,
  ProfileName,
  ProfileLocation,
  CircleContainer,
  ItemContainer,
  ItemLabel,
  SignatureText,
} from './styles';

import {useAuth} from '../../hooks/auth';
import {useNavigation} from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';

const MyProfile: React.FC = () => {
  const {height} = Dimensions.get('window');

  const {signOut} = useAuth();
  const {navigate} = useNavigation();

  const menu = [
    {
      text: 'Editar perfil',
      icon: 'user',
      onPress: () => navigate('EditProfile'),
    },
    {text: 'Meu pets', icon: 'dog', onPress: () => navigate('MyPets')},
    {text: 'Pedidos de adoções recebidos', icon: 'clipboard-list'},
    {text: 'Sair', icon: 'power-off', onPress: () => signOut()},
  ];

  const {user} = useAuth();

  return (
    <Container
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 0,
      }}>
      <TitleView>Minha Conta</TitleView>
      <Header>
        <ProfileImageContainer>
          <ProfilePhoto
            source={
              user.avatarUrl
                ? {uri: user.avatarUrl}
                : require('../../assets/images/profile.png')
            }
          />
        </ProfileImageContainer>
        <View style={{flex: 1, justifyContent: 'center', marginLeft: 10}}>
          <ProfileName>{user.name}</ProfileName>
          <Row>
            <MaterialCommunityIcons
              name="map-marker-outline"
              color="#22C34F"
              style={{marginRight: 2}}
            />
            <ProfileLocation>
              {user.city.name} - {user.city.state}
            </ProfileLocation>
          </Row>
        </View>
        <CircleContainer>
          <FeatherIcon name="bell" size={22} color={'#323232'} />
        </CircleContainer>
      </Header>

      <View style={{marginTop: 20, minHeight: height - 232}}>
        {menu.map((item, index) => (
          <ItemContainer
            key={index}
            style={styles.shadowCard}
            onPress={item.onPress}>
            <>
              <FontAwesome5Icons
                name={item.icon}
                color="#22C34F"
                size={16}
                style={{marginRight: 10}}
              />
              <ItemLabel>{item.text}</ItemLabel>
            </>
          </ItemContainer>
        ))}
      </View>

      <SignatureText>
        by <Text style={{fontWeight: 'bold'}}>Daniel Morais</Text>
      </SignatureText>
    </Container>
  );
};

const styles = StyleSheet.create({
  shadowCard: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default MyProfile;

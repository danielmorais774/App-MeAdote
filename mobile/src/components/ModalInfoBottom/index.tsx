import React, {useCallback} from 'react';
import {StyleSheet, View, Linking} from 'react-native';

import {
  Wrapper,
  Container,
  TitleModal,
  Row,
  Header,
  ProfileImageContainer,
  ProfilePhoto,
  ProfileName,
  ProfileLocation,
  CircleContainer,
} from './styles';

import Modal from 'react-native-modal';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import {IUserCity} from '../../models/petDetails';

export interface IModalInfoProps {
  user: IUserCity;
}

interface IModalInfoBottomProps {
  isVisible: boolean;
  info: IModalInfoProps;
  handleCloseModal(): void;
}

export interface IModalOptions {
  text: string;
  type: 'info';
}

const ModalInfoBottom: React.FC<IModalInfoBottomProps> = ({
  isVisible,
  info,
  handleCloseModal,
}) => {
  const handleButtonWhatsapp = useCallback(() => {
    if (info.user) {
      Linking.openURL(`whatsapp://send?text=&phone=55${info.user.phone}`);
    }
  }, [info]);

  const handleButtonPhone = useCallback(() => {
    if (info.user) {
      Linking.openURL(`tel:${info.user.phone}`);
    }
  }, [info]);

  return (
    <Wrapper>
      <Modal
        isVisible={isVisible}
        onSwipeComplete={handleCloseModal}
        swipeDirection={['left', 'right', 'down']}
        onBackdropPress={handleCloseModal}
        onBackButtonPress={handleCloseModal}
        style={styles.view}>
        <Container>
          <TitleModal>Informações</TitleModal>
          {info.user && (
            <Header style={{marginTop: 20}}>
              <ProfileImageContainer>
                <ProfilePhoto
                  source={
                    info.user.avatarUrl
                      ? {uri: info.user.avatarUrl}
                      : require('../../assets/images/profile.png')
                  }
                />
              </ProfileImageContainer>
              <View style={{flex: 1, justifyContent: 'center', marginLeft: 10}}>
                <ProfileName>{info.user.name}</ProfileName>
                <Row>
                  <MaterialCommunityIcons
                    name="map-marker-outline"
                    color="#22C34F"
                    style={{marginRight: 2}}
                  />
                  <ProfileLocation>
                    {info.user.city.name} - {info.user.city.state}
                  </ProfileLocation>
                </Row>
              </View>
              <CircleContainer
                onPress={handleButtonWhatsapp}
                style={{marginRight: 10}}>
                <FontAwesome5Icon name="whatsapp" size={22} color={'#323232'} />
              </CircleContainer>
              <CircleContainer onPress={handleButtonPhone}>
                <FeatherIcon name="phone" size={22} color={'#323232'} />
              </CircleContainer>
            </Header>
          )}
        </Container>
      </Modal>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default React.memo(ModalInfoBottom);

import React from 'react';
import {View, StyleSheet} from 'react-native';

import Toast from 'react-native-simple-toast';

import {IRequestAdoption} from '../../../../models/requestAdoption';
import Button from '../../../Button';
import {IModalOptions} from '../../../ModalOptionsBottom';

import {Container, CardImage, CardTitle, CardSubTitle} from './styles';

interface IAdoptionRequestItem {
  item: IRequestAdoption;
  handleOpenModalOptions(options: IModalOptions[], id: string): void;
}

const AdoptionRequestItem = ({
  item,
  handleOpenModalOptions,
}: IAdoptionRequestItem) => {
  const statusColor = {
    requested: '#0ABDE3',
    refused: '#EE5253',
    accepted: '#22C34F',
    adopted: '#7D22C3',
    canceled: '#EE5253',
  };

  const statusLabel = {
    requested: 'SOLICITADO',
    refused: 'RECUSADO',
    accepted: 'EBA!  CLICK AQUI',
    adopted: 'ADOTADO',
    canceled: 'CANCELADO',
  };

  const onCickStatus = (id: string) => {
    let options: IModalOptions[] = [];

    if (item.status === 'requested') {
      options.push({text: 'Cancelar', type: 'cancel'});
    }

    if (item.status === 'accepted') {
      options.push({text: 'Entrar em contato', type: 'cancel'});
    }

    if (item.status === 'canceled') {
      Toast.show('Está solicitação já foi cancelada!', Toast.SHORT);
      return null;
    }

    if (item.status === 'adopted') {
      Toast.show('Parabéns! Adoção concluida!', Toast.SHORT);
      return null;
    }

    if (item.status === 'refused') {
      Toast.show('Sinto muito! Seu pedido foi recusado!', Toast.SHORT);
      return null;
    }

    handleOpenModalOptions(options, id);
  };

  return (
    <Container style={styles.shadowCard}>
      <CardImage
        source={{
          uri: item.pet.images[0].path,
        }}
      />
      <View style={{flex: 1, marginLeft: 10, justifyContent: 'center'}}>
        <CardTitle>{item.pet.name}</CardTitle>
        <CardSubTitle>{item.pet.breed.name}</CardSubTitle>
      </View>
      <Button
        onPress={() => onCickStatus(item.id)}
        title={statusLabel[item.status]}
        color={statusColor[item.status]}
        width={110}
        height={35}
      />
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

export default React.memo(AdoptionRequestItem);

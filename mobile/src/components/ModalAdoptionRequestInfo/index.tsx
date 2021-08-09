import React from 'react';
import {StyleSheet} from 'react-native';

import {Wrapper, Container, ItemContainer, ItemLabel} from './styles';

import Modal from 'react-native-modal';
import {IUser} from '../../models/user';

interface IModalAdoptionRequestInfoProps {
  isVisible: boolean;
  info: IModalInfoAdoptionRequest;
  handleCloseModal(): void;
  // onClickOption(type: 'cancel' | 'refused' | 'accepted' | 'info'): void;
}

export interface IModalInfoAdoptionRequest {
  user: IUser;
}

const ModalAdoptionRequestInfo: React.FC<IModalAdoptionRequestInfoProps> = ({
  isVisible,
  info,
  handleCloseModal,
}) => {
  // const options: IModalOptions[] = [{text: 'Recusar'}, {text: 'Cancelar'}];

  return (
    <Wrapper>
      <Modal
        isVisible={isVisible}
        onSwipeComplete={handleCloseModal}
        swipeDirection={['left', 'right', 'down']}
        onBackdropPress={handleCloseModal}
        onBackButtonPress={handleCloseModal}
        style={styles.view}>
        <Container />
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

export default React.memo(ModalAdoptionRequestInfo);

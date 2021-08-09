import React from 'react';
import {StyleSheet} from 'react-native';

import {Wrapper, Container, ItemContainer, ItemLabel} from './styles';

import Modal from 'react-native-modal';

interface IModalOptionsBottomProps {
  isVisible: boolean;
  options: IModalOptions[];
  handleCloseModal(): void;
  onClickOption(
    type: 'cancel' | 'refused' | 'accepted' | 'info' | 'adopted',
  ): void;
}

export interface IModalOptions {
  text: string;
  type: 'cancel' | 'refused' | 'accepted' | 'info' | 'adopted';
}

const ModalOptionsBottom: React.FC<IModalOptionsBottomProps> = ({
  isVisible,
  options,
  onClickOption,
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
        <Container>
          {options.map((option, index) => (
            <ItemContainer
              key={index}
              onPress={() => onClickOption(option.type)}>
              <ItemLabel>{option.text}</ItemLabel>
            </ItemContainer>
          ))}
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

export default React.memo(ModalOptionsBottom);

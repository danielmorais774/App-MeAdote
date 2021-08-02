import React from 'react';
// import {View} from 'react-native';

import {Container, Button, Label} from './styles';

//libs
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IButtonShareProps {
  onPress?: () => void;
  title: string;
}

const ButtonShare: React.FC<IButtonShareProps> = ({title, onPress}) => {
  return (
    <Container>
      <Button onPress={onPress}>
        <Ionicons name="share-social-outline" size={20} color="#fff" />
        <Label>{title}</Label>
        <Ionicons name="paw-outline" size={20} color="#fff" />
      </Button>
    </Container>
  );
};

export default ButtonShare;

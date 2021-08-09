import React from 'react';
import {Animated} from 'react-native';

import {
  Container,
  CardImage,
  CardContent,
  CardTitle,
  CardSubtitle,
} from './styles';

//libs
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import {IPetRaw} from '../../../../models/petRaw';

interface IPetCardItemProps {
  item: IPetRaw;
}

const PetCardItem = ({item}: IPetCardItemProps) => {
  //hooks
  const {navigate} = useNavigation();

  //components
  const AnimatedImageCard = Animated.createAnimatedComponent(LinearGradient);

  return (
    <Container onPress={() => navigate('Pet', {id: item.id})}>
      <CardImage
        source={{
          uri:
            item.image ||
            'https://g77v3827gg2notadhhw9pew7-wpengine.netdna-ssl.com/wp-content/uploads/2017/11/do-beagles-shed_canna-pet-1024x684.jpg',
        }}
      />
      <AnimatedImageCard
        style={{position: 'absolute', width: 100, height: 155, zIndex: 2}}
        start={{x: 0.5, y: 0.5}}
        colors={[
          'rgba(140,140,140,0.0)',
          'rgba(92,92,92,0.0)',
          'rgba(70,70,70,0.51)',
          'rgba(52,52,52,0.70)',
        ]}
        locations={[0, 0, 0.8, 1]}
      />
      <CardContent>
        <CardTitle>{item.name}</CardTitle>
        <CardSubtitle>{item.location}</CardSubtitle>
      </CardContent>
    </Container>
  );
};

export default React.memo(PetCardItem);

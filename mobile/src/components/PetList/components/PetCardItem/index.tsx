import React from 'react';
// import {View} from 'react-native';

import {
  Container,
  CardImage,
  CardContent,
  CardTitle,
  CardSubtitle,
  BadgeBreed,
  BadgeBreedLabel,
} from './styles';

import {StyleSheet} from 'react-native';
import {IPetCard} from '../..';

// interface IPetItem extends IPet {
//   empty: boolean;
// }

interface IPetCardItemProps {
  item: IPetCard;
  index: number;
  onPressItem(id: string): void;
}

const PetCardItem = ({item, index, onPressItem}: IPetCardItemProps) => {
  return (
    <>
      {item?.empty === true ? (
        <Container indexComponent={index} />
      ) : (
        <Container
          onPress={() => onPressItem(item.id)}
          style={styles.shadowCard}
          indexComponent={index}>
          <CardImage
            // style={{flex: 1}}
            source={{
              uri:
                item.image ||
                'https://g77v3827gg2notadhhw9pew7-wpengine.netdna-ssl.com/wp-content/uploads/2017/11/do-beagles-shed_canna-pet-1024x684.jpg',
            }}
          />
          <CardContent>
            <BadgeBreed>
              <BadgeBreedLabel>{item.breed}</BadgeBreedLabel>
            </BadgeBreed>
            <CardTitle>{item.name}</CardTitle>
            <CardSubtitle>{item.location}</CardSubtitle>
          </CardContent>
        </Container>
      )}
    </>
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

export default React.memo(PetCardItem);

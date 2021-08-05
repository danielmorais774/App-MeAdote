import React from 'react';

import {Container, Image} from './styles';

import {IImageItem} from '..';
// import {Image} from 'react-native-image-crop-picker';

//Icons
import FeatherIcons from 'react-native-vector-icons/Feather';

type IImageItemProps = {
  item: IImageItem;
  index: number;
  handleAddImage(): void;
  handleRemoveImage(idx: number): void;
};

const ImageItem = ({
  item,
  index,
  handleAddImage,
  handleRemoveImage,
}: IImageItemProps) => {
  return (
    <>
      {'type' in item.image && item.image?.type === 'create' ? (
        <Container onPress={handleAddImage}>
          <FeatherIcons name="plus" size={18} color="#343434" />
        </Container>
      ) : (
        <Container onPress={() => handleRemoveImage(index)}>
          <Image source={{uri: item.image.path}} />
        </Container>
      )}
    </>
  );
};

export default ImageItem;

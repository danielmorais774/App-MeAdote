import React, {useState} from 'react';

import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';

import {Container, Image, Pagination} from './styles';

//libs
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Iprops {
  images: string[];
  height?: string | number;
}

const SliderImage: React.FC<Iprops> = ({height, images}) => {
  const {width} = Dimensions.get('window');
  height = height || Math.ceil(width * 0.6);

  const [slideIndex, setSlideIndex] = useState<number>(0);

  images = images || [
    'https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg',
    'https://fox5sandiego.com/wp-content/uploads/sites/15/2017/11/coco.jpg?w=1280',
    'https://i.pinimg.com/originals/46/a0/b6/46a0b69c930c62b73c489ceb58443852.png',
  ];

  const onChange = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== slideIndex) {
      setSlideIndex(slide);
    }
  };

  return (
    <Container width={width} height={height}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={onChange}
        style={{width, height}}>
        {images.map((image, index) => (
          <Image
            key={index}
            source={{uri: image}}
            width={width}
            height={height as number}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
      <Pagination>
        {images.length > 1 &&
          images.map((_, index) => (
            <MaterialCommunityIcons
              key={index}
              name="circle"
              color={slideIndex === index ? '#fff' : '#888'}
              size={12}
              style={{marginHorizontal: 3}}
            />
          ))}
      </Pagination>
    </Container>
  );
};

export default SliderImage;

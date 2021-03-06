import React from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import {IPetRaw} from '../../models/petRaw';

import PetCardItem from './components/PetCardItem';

import {Container, TitleEmpty} from './styles';

export interface IPetCard extends IPetRaw {
  empty?: boolean;
}

interface IPetlistProps {
  data: IPetCard[];
  isLoading?: boolean;
  header?: React.FC;
  style?: {};
  paddingHorizontal?: number;
  paddingBottom?: number;
  onPressItem(id: string): void;
}

const PetList: React.FC<IPetlistProps> = ({
  data,
  header,
  style,
  paddingHorizontal,
  paddingBottom,
  onPressItem,
}) => {
  const {height} = Dimensions.get('window');

  function fillArray(array: IPetCard[]) {
    if (array.length % 2 !== 0) {
      return array.concat([{empty: true} as IPetCard]);
    }

    return array;
  }

  return (
    <Container>
      <FlatList
        ListHeaderComponent={header}
        data={fillArray(data)}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <PetCardItem item={item} index={index} onPressItem={onPressItem} />
        )}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        style={style}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          flex: 0.5,
          justifyContent: 'space-between',
          paddingHorizontal: paddingHorizontal || 0,
        }}
        contentContainerStyle={{paddingBottom: paddingBottom || 0}}
        onEndReachedThreshold={0.5}
        onEndReached={() => console.log('teste')}
        ListEmptyComponent={() => (
          <View
            style={{
              height: height - 120,
              justifyContent: 'center',
            }}>
            <TitleEmpty>Nenhum pet para adoção encontrado!</TitleEmpty>
          </View>
        )}
      />
    </Container>
  );
};

export default React.memo(PetList);

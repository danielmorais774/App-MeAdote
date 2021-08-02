import React from 'react';
import {View, FlatList} from 'react-native';
import {IPetRaw} from '../../models/petRaw';

import PetCardItem from './components/PetCardItem';

import {Container} from './styles';

export interface IPetCard extends IPetRaw {
  empty?: boolean;
}

interface IPetlistProps {
  data: IPetCard[];
  isLoading?: boolean;
  header?: React.FC;
}

const PetList: React.FC<IPetlistProps> = ({data, header}) => {
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
          <PetCardItem item={item} index={index} />
        )}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        style={{
          flex: 1,
          backgroundColor: '#fff',
          paddingTop: 15,
          marginTop: 15,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.28,
          shadowRadius: 3.84,

          elevation: 5,
        }}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        columnWrapperStyle={{
          flex: 0.5,
          justifyContent: 'space-between',
          paddingHorizontal: 18,
        }}
        onEndReachedThreshold={0.5}
        onEndReached={() => console.log('teste')}
      />
    </Container>
  );
};

export default React.memo(PetList);

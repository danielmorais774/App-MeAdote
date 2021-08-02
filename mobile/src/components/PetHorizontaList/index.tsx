import React from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';

import PetCardItem from './components/PetCardItem';

import {Container, Title} from './styles';

export interface IPetCard {
  id: string;
  name: string;
  image: string;
  location: string;
}

interface IPetHorizontalistProps {
  data: IPetCard[];
  isLoading?: boolean;
}

const PetHorizontaList: React.FC<IPetHorizontalistProps> = ({
  data,
  isLoading,
}) => {
  return (
    <Container>
      <Title>Últimos pets para adoção</Title>
      {isLoading ? (
        <View
          style={{height: 155, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={'#3DC162'} size={'large'} />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => <PetCardItem item={item} />}
          horizontal
          ItemSeparatorComponent={() => <View style={{width: 10}} />}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </Container>
  );
};

export default React.memo(PetHorizontaList);

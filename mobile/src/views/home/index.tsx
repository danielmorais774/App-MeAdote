import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';

import {Container} from './styles';

//components
import HeaderMain from './components/HeaderMain';
import PetHorizontaList from '../../components/PetHorizontaList';
import PetList from '../../components/PetList';
import {FlatList} from 'react-native-gesture-handler';

import {IPetRaw} from '../../models/petRaw';

import {petsService} from '../../services';

const Home: React.FC = () => {
  const [petRecentList, setPetRecentList] = useState<IPetRaw[]>([]);
  const [petList, setPetList] = useState<IPetRaw[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadApi() {
      const values = await Promise.all([
        petsService.getPetRecents(),
        petsService.getPets(),
      ]);

      setPetRecentList(values[0]);
      setPetList(values[1].data);
      setIsLoading(false);
    }

    loadApi();
  }, []);

  const HeaderComponent = React.useMemo(
    () => (
      <>
        <HeaderMain />
      </>
    ),
    [],
  );

  return (
    <Container>
      <FlatList
        ListHeaderComponent={HeaderComponent}
        data={
          isLoading === true
            ? []
            : [
                {data: petRecentList, gridView: 'horizontal'},
                {data: petList, gridView: 'vertical'},
              ]
        }
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <>
            {item.gridView === 'horizontal' && (
              <PetHorizontaList data={item.data} />
            )}
            {item.gridView === 'vertical' && <PetList data={item.data} />}
          </>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flex: isLoading ? 1 : 0}}
        ListEmptyComponent={() => (
          <>
            {isLoading && (
              <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator
                  color="#3DC162"
                  size="large"
                  style={{marginTop: -50}}
                />
              </View>
            )}
          </>
        )}
      />
    </Container>
  );
};

export default Home;

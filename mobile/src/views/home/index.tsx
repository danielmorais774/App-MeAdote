import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';

import {Container} from './styles';

//components
import HeaderMain from './components/HeaderMain';
import PetHorizontaList from '../../components/PetHorizontaList';
import PetList from '../../components/PetList';
import {FlatList} from 'react-native-gesture-handler';

//hooks
import {useNavigation} from '@react-navigation/native';

import {IPetRaw} from '../../models/petRaw';

import {petsService} from '../../services';

const Home: React.FC = () => {
  //hooks
  const {navigate} = useNavigation();

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
            {item.gridView === 'vertical' && (
              <PetList
                data={item.data}
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
                paddingHorizontal={18}
                onPressItem={id => navigate('Pet', {id})}
              />
            )}
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

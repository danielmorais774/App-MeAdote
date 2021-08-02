import React, {useState, useEffect, useCallback} from 'react';
import {View, ActivityIndicator} from 'react-native';

import {Container, TitleView} from './styles';

import AdoptionRequestList from '../../components/AdoptionRequestList';

import {IRequestAdoption} from '../../models/requestAdoption';
import {adoptionRequestsService} from '../../services';

const MyAdoptions: React.FC = () => {
  //states
  const [adoptionRequests, setAdoptionRequests] = useState<IRequestAdoption[]>(
    [],
  );

  const [isLoading, setIsloading] = useState<boolean>(true);

  // functions apis
  const loadApi = useCallback(async () => {
    try {
      setAdoptionRequests(
        await adoptionRequestsService.getAdoptionRequestsByUser(),
      );
      setIsloading(false);
    } catch (e) {
      setIsloading(false);
    }
  }, []);

  const updateStatus = useCallback(
    async (id: string, status: 'canceled') => {
      setAdoptionRequests(
        adoptionRequests.map(adoptionRequest => {
          return adoptionRequest.id === id
            ? {...adoptionRequest, status: 'canceled'}
            : adoptionRequest;
        }),
      );
      console.log(status, id);
    },
    [adoptionRequests],
  );

  useEffect(() => {
    loadApi();
  }, [loadApi]);

  return (
    <Container>
      <TitleView>Minhas Adoções</TitleView>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator color="#3DC162" size="large" />
        </View>
      ) : (
        <AdoptionRequestList
          data={adoptionRequests}
          updateStatus={updateStatus}
        />
      )}
    </Container>
  );
};

export default MyAdoptions;

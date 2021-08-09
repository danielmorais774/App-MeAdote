import React, {useState} from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import {IRequestAdoption} from '../../models/requestAdoption';
import ModalOptionsBottom, {IModalOptions} from '../ModalOptionsBottom';
import ModalInfoBottom, {IModalInfoProps} from '../ModalInfoBottom';
import AdoptionRequestItem from './components/AdoptionRequestItem';

import {TitleEmpty} from './styles';

interface IAdoptionRequestListProps {
  data: IRequestAdoption[];
  refreshing?: boolean;
  handleRefresh?(): void;
  updateStatus(id: string, status: 'accepted' | 'refused' | 'adopted'): void;
}

const AdoptionRequestReceivedList: React.FC<IAdoptionRequestListProps> = ({
  data,
  refreshing,
  handleRefresh,
  updateStatus,
}) => {
  const {height} = Dimensions.get('window');

  //states
  const [isVisibleModaOptions, setIsVisibeModalOptions] =
    useState<boolean>(false);
  const [isVisibleModaInfo, setIsVisibeModalInfo] = useState<boolean>(false);
  const [modalOptions, setModalOptions] = useState<IModalOptions[]>([]);
  const [modalInfo, setModalInfo] = useState<IModalInfoProps>(
    {} as IModalInfoProps,
  );
  const [adoptionRequestId, setAdoptionRequestId] = useState<string | null>(
    null,
  );

  const handleOpenModalOptions = (
    options: IModalOptions[],
    id: string,
  ): void => {
    setModalOptions(options);
    setAdoptionRequestId(id);
    setIsVisibeModalOptions(true);
  };

  const handleOpenModalInfo = (): void => {
    setIsVisibeModalInfo(true);
  };

  const handleCloseModalOptions = (): void => {
    setIsVisibeModalOptions(false);
  };

  const handleCloseModalInfo = (): void => {
    setIsVisibeModalInfo(false);
  };

  const onClickOption = (
    type: 'accepted' | 'refused' | 'info' | 'adopted',
  ): void => {
    if (type !== 'info' && adoptionRequestId) {
      updateStatus(adoptionRequestId, type);
      handleCloseModalOptions();
      return;
    }

    if (type === 'info' && adoptionRequestId) {
      const adoptionRequest = data.find(item => item.id === adoptionRequestId);
      if (adoptionRequest && adoptionRequest.user) {
        setModalInfo({user: adoptionRequest.user});
        handleCloseModalOptions();
        handleOpenModalInfo();
        return;
      }
    }
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <AdoptionRequestItem
            item={item}
            handleOpenModalOptions={handleOpenModalOptions}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={() => (
          <View
            style={{
              height: height - 120,
              justifyContent: 'center',
            }}>
            <TitleEmpty>Nenhum pedido de adoção recebido!</TitleEmpty>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />

      <ModalOptionsBottom
        isVisible={isVisibleModaOptions}
        options={modalOptions}
        handleCloseModal={handleCloseModalOptions}
        onClickOption={onClickOption}
      />

      <ModalInfoBottom
        isVisible={isVisibleModaInfo}
        info={modalInfo}
        handleCloseModal={handleCloseModalInfo}
      />
    </View>
  );
};

export default AdoptionRequestReceivedList;

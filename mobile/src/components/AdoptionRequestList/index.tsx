import React, {useState} from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import {IRequestAdoption} from '../../models/requestAdoption';
import ModalOptionsBottom, {IModalOptions} from '../ModalOptionsBottom';
import AdoptionRequestItem from './components/AdoptionRequestItem';

import {TitleEmpty} from './styles';

interface IAdoptionRequestListProps {
  data: IRequestAdoption[];
  updateStatus(id: string, status: 'canceled'): void;
}

const AdoptionRequestList: React.FC<IAdoptionRequestListProps> = ({
  data,
  updateStatus,
}) => {
  const {height} = Dimensions.get('window');

  //states
  const [isVisibleModaOptions, setIsVisibeModalOptions] =
    useState<boolean>(false);
  const [modalOptions, setModalOptions] = useState<IModalOptions[]>([]);
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

  const handleCloseModalOptions = (): void => {
    setIsVisibeModalOptions(false);
  };

  const onClickOption = (type: 'cancel'): void => {
    if (type === 'cancel' && adoptionRequestId) {
      updateStatus(adoptionRequestId, 'canceled');
      handleCloseModalOptions();
      return;
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
            <TitleEmpty>Nenhum pedido de adoção feito!</TitleEmpty>
          </View>
        )}
      />

      <ModalOptionsBottom
        isVisible={isVisibleModaOptions}
        options={modalOptions}
        handleCloseModal={handleCloseModalOptions}
        onClickOption={onClickOption}
      />
    </View>
  );
};

export default AdoptionRequestList;

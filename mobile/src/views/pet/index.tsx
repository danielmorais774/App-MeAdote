import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Animated,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {
  Container,
  ViewContainer,
  ButtonBack,
  Title,
  SubTitle,
  ContainerInfo,
  ItemInfo,
  LabelItemInfo,
  UserInfo,
  UserImage,
  UserName,
  UserContainerLocation,
  UserLocation,
  TitleSection,
  BottomContainer,
} from './styles';

//libs
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';

//hooks
import {useNavigation, RouteProp} from '@react-navigation/native';
import {useAuth} from '../../hooks/auth';

//component externos
import LinearGradient from 'react-native-linear-gradient';
import ButtonShare from '../../components/ButtonShare';
import {useEffect} from 'react';
import {useCallback} from 'react';
import {IPetDetails} from '../../models/petDetails';
import {capitalize} from '../../utils/capitalize';
import SliderImage from '../../components/SliderImage';
import Button from '../../components/Button';
import {adoptionRequestsService, petsService} from '../../services';

const Pet: React.FC<{route: RouteProp<{params: {id: string}}, 'params'>}> = ({
  route,
}) => {
  //params
  const petId = route.params?.id;

  let HEADER_MAX_HEIGHT = 290;
  let HEADER_MIN_HEIGHT = 0;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  //hooks
  const {user} = useAuth();

  // states
  const [scrollY] = useState<Animated.Value>(new Animated.Value(0));

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });
  const imageTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  //hooks
  const {goBack} = useNavigation();

  //components
  const AnimatedTopBarCustom = Animated.createAnimatedComponent(LinearGradient);

  //states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [petInfo, setPetInfo] = useState<IPetDetails>({} as IPetDetails);
  const [petImages, setPetImages] = useState<string[]>([]);

  const apiLoad = useCallback(async () => {
    try {
      const petDetails = await petsService.getPetDetailsById(petId);

      setPetInfo(petDetails);
      if (petDetails.images) {
        setPetImages(
          petDetails.images.map(image => {
            return image.path;
          }),
        );
      }

      setIsLoading(false);
    } catch (e) {
      Alert.alert(
        'Error',
        'Não foi possível consultar as informações do pet, tente novamente!',
        [{text: 'Ok', onPress: () => goBack()}],
      );
    }
  }, [petId, goBack]);

  useEffect(() => {
    apiLoad();
  }, [apiLoad]);

  const handleSendRequest = useCallback(async () => {
    try {
      await adoptionRequestsService.createAdoptionRequest(petInfo.id);
      setPetInfo({...petInfo, isAdoptionRequested: true});
    } catch (e) {
      Alert.alert(
        'Error ao enviar',
        'não foi possivel reallizar seu pedido, tente novamente!',
      );
    }
  }, [petInfo]);

  return (
    <Container>
      <AnimatedTopBarCustom
        style={{...styles.topBarCustom, opacity: imageOpacity}}
        colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.9)']}
        locations={[0, 1]}>
        <ButtonBack onPress={() => goBack()}>
          <FontAwesome5Icons name="arrow-left" color="#343434" size={18} />
        </ButtonBack>
      </AnimatedTopBarCustom>
      <ScrollView
        style={{flex: 1}}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        <Animated.View
          style={{...styles.header, height: headerHeight, zIndex: 0}}>
          <Animated.View
            style={{
              minHeight: HEADER_MAX_HEIGHT,
              translateY: imageTranslate,
              opacity: imageOpacity,
            }}>
            <View style={{height: 350}}>
              {/* <Image
                source={{
                  uri: 'https://s2.glbimg.com/slaVZgTF5Nz8RWqGrHRJf0H1PMQ=/0x0:800x450/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/U/e/NTegqdSe6SoBAoQDjKZA/cachorro.jpg',
                }}
                style={{height: 340}}
              /> */}
              <SliderImage height={340} images={petImages} />
            </View>
          </Animated.View>
        </Animated.View>

        {isLoading === true ? (
          <ViewContainer
            style={{
              paddingHorizontal: 0,
              paddingBottom: 80,
              marginTop: HEADER_MAX_HEIGHT,
              backgroundColor: '#fff',
            }}>
            <ActivityIndicator color="#3DC162" size="large" />
          </ViewContainer>
        ) : (
          <ViewContainer
            style={{
              paddingHorizontal: 0,
              paddingBottom: 80,
              marginTop: HEADER_MAX_HEIGHT,
              backgroundColor: '#fff',
            }}>
            <Title>{petInfo.name}</Title>
            <SubTitle>{petInfo.breed.name}</SubTitle>

            <ContainerInfo>
              <ItemInfo>
                <FontAwesome5Icons
                  name="birthday-cake"
                  size={16}
                  color="#343434"
                />
                <LabelItemInfo>{petInfo.age} M</LabelItemInfo>
              </ItemInfo>

              <ItemInfo>
                <Ionicons name={petInfo.gender} size={16} color="#343434" />
                <LabelItemInfo>
                  {petInfo.gender === 'male' ? 'Masculino' : 'Feminino'}
                </LabelItemInfo>
              </ItemInfo>

              <ItemInfo>
                <Ionicons name="color-palette" size={16} color="#343434" />
                <LabelItemInfo>
                  {petInfo.color.length < 12
                    ? capitalize(petInfo.color)
                    : capitalize(petInfo.color).slice(0, 12) + '...'}
                </LabelItemInfo>
              </ItemInfo>
            </ContainerInfo>

            <TitleSection>Responsável pela tutela</TitleSection>
            <UserInfo>
              <UserImage
                source={{
                  uri: 'https://data.whicdn.com/images/331377446/original.jpg',
                }}
              />
              <View style={{marginLeft: 10, justifyContent: 'center'}}>
                <UserName>{petInfo.user.name}</UserName>
                <UserContainerLocation>
                  <MaterialCommunityIcons
                    name="map-marker-outline"
                    size={12}
                    color="#22C34F"
                  />
                  <UserLocation>
                    {petInfo.user.city.name} - {petInfo.user.city.state}
                  </UserLocation>
                </UserContainerLocation>
              </View>
            </UserInfo>

            <ButtonShare title="Me compartilha! Uau uau" />
          </ViewContainer>
        )}
      </ScrollView>
      {isLoading === false && (
        <BottomContainer>
          {user.id === petInfo.tutor_id ? (
            <Button
              title={'QUERO ADOTAR'}
              color={
                petInfo.isAdoptionRequested === true ? '#0ABDE3' : '#3DC162'
              }
              onPress={() => {
                Toast.show('Você não pode adotar seu próprio pet!');
              }}
            />
          ) : (
            <Button
              title={
                petInfo.isAdoptionRequested === true
                  ? 'PEDIDO EM ANDAMENTO'
                  : 'QUERO ADOTAR'
              }
              color={
                petInfo.isAdoptionRequested === true ? '#0ABDE3' : '#3DC162'
              }
              onPress={
                petInfo.isAdoptionRequested === false
                  ? handleSendRequest
                  : () => {
                      Toast.show('Você já possui um pedido de adoção feito!');
                    }
              }
            />
          )}
        </BottomContainer>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  topBarCustom: {
    position: 'absolute',
    top: 0,
    height: 50,
    width: 55,
    zIndex: 2,
    justifyContent: 'center',
    paddingHorizontal: 20,

    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  imageMovie: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
});

export default Pet;

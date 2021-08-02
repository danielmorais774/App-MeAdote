import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: white;
  flex: 1;
`;

export const ContainerMain = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const ViewContainer = styled.View`
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding: 20px;

  min-height: 900px;
`;

export const ButtonBack = styled.TouchableOpacity`
  justify-content: center;
  width: 30px;
  height: 40px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #323232;
  margin-bottom: 5px;
`;

export const SubTitle = styled.Text`
  font-size: 14px;
  color: #323232;
  margin-bottom: 5px;
`;

export const ContainerInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const ItemInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const LabelItemInfo = styled.Text`
  font-size: 15px;
  color: #343434;
  margin-left: 5px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const UserImage = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background-color: #f3f3f3;
`;

export const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #343434;
`;

export const UserContainerLocation = styled.Text`
  flex-direction: row;
  align-items: center;
`;

export const UserLocation = styled.Text`
  font-size: 12px;
  color: #2e2e2e;
  margin-left: 5px;
`;

export const TitleSection = styled.Text`
  font-size: 12px;
  color: #323232;

  margin-top: 5px;
`;

export const BottomContainer = styled.View`
  position: absolute;
  bottom: 0px;

  width: 100%;
  background-color: #fff;

  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;

  border-top-color: rgba(52, 52, 52, 0.25);
  border-top-width: 1px;
`;

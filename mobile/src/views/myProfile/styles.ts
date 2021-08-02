import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  background-color: #fff;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TitleView = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #343434;

  text-align: center;

  margin-bottom: 30px;
`;

export const ProfileImageContainer = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

export const ProfilePhoto = styled.Image`
  width: 50px;
  height: 50px;
`;

export const ProfileName = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: #343434;
`;

export const ProfileLocation = styled.Text`
  font-size: 10px;
  color: #2e2e2e;
`;

export const CircleContainer = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  background-color: #f3f3f3;
`;

export const ItemContainer = styled.TouchableOpacity`
  height: 50px;
  border-radius: 4px;
  padding: 0px 15px;
  margin: 5px 2px;
  background-color: #fff;

  flex-direction: row;
  align-items: center;
`;

export const ItemLabel = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: #343434;
`;

export const SignatureText = styled.Text`
  font-size: 14px;
  color: #323232;

  text-align: center;

  margin: 10px 0px;
`;

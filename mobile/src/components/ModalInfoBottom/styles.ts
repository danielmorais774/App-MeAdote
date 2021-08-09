import styled from 'styled-components/native';

export const Wrapper = styled.View``;

export const Container = styled.View`
  background-color: #fff;
  padding: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  justify-content: space-between;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-color: rgba(0, 0, 0, 0.1);
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TitleModal = styled.Text`
  color: #323232;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;

export const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;

  height: 45px;

  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 3px;
  margin-bottom: 3px;
`;

export const ItemLabel = styled.Text`
  font-size: 15px;
  color: #343434;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
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

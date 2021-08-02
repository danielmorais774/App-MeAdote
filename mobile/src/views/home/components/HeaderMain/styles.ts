import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 15px 20px;
`;

export const Row = styled.View`
  flex-direction: row;
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

export const CircleContainer = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  background-color: #f3f3f3;
`;

export const LabelCustom = styled.Text`
  font-size: 10px;
  color: #323232;
`;

export const AndressCustom = styled.Text`
  font-size: 14px;
  color: #323232;
  font-weight: bold;
  margin-top: 5px;
`;

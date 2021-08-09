import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 0px 20px 0px 20px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TitleView = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #343434;

  text-align: center;
`;

export const ButtonBack = styled.TouchableOpacity`
  width: 35px;
`;

export const FabButton = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background-color: #3dc162;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 20px;
  bottom: 15px;
`;

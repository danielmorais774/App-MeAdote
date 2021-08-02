import styled from 'styled-components/native';

export const Container = styled.View``;

export const Button = styled.TouchableOpacity`
  height: 45px;
  border-radius: 4px;
  background-color: #343434;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding-left: 10px;
  padding-right: 10px;

  margin-top: 10px;
  margin-bottom: 10px;
`;

export const Label = styled.Text`
  flex: 1;
  font-size: 12px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
`;

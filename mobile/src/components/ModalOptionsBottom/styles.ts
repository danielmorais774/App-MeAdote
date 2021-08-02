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

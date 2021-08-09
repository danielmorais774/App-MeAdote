import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  background-color: #fff;
  padding: 8px;
  /* padding-left: 8px;
  padding-right: 8px; */

  border-radius: 5px;

  margin: 3px;

  align-items: center;
  justify-content: space-between;
`;

export const CardImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 5px;
`;

export const CardTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #343434;
`;

export const CardSubTitle = styled.Text`
  font-size: 10px;
  color: #343434;
`;

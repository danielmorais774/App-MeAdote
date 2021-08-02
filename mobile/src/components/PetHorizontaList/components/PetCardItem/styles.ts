import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  border-radius: 4px;
  overflow: hidden;
  width: 100px;
  height: 155px;
`;

export const CardImage = styled.Image`
  width: 100px;
  height: 155px;
  background-color: #f3f3f3;
`;

export const CardContent = styled.View`
  position: absolute;
  bottom: 5px;
  z-index: 5;

  padding-left: 5px;
  padding-right: 5px;
`;

export const CardTitle = styled.Text`
  font-size: 10px;
  font-weight: bold;
  font-family: 'Roboto';
  color: #fff;
`;

export const CardSubtitle = styled.Text`
  font-size: 9px;
  color: #fff;
`;

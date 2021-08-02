import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f3f3f3;
`;

export const TitleView = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #343434;

  text-align: center;
  margin: 20px 0px;
`;

export const LogoImage = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 8px;
  align-self: center;
  margin: 25px;
`;

export const DescriptionLabel = styled.Text`
  font-size: 12px;
  color: #343434;

  text-align: center;
  margin: 20px 0px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BottomLabel = styled.Text`
  font-size: 14px;
  color: #323232;

  text-align: center;
  margin: 10px 0px;
`;

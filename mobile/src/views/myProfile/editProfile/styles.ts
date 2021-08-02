import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {paddingHorizontal: 20, paddingTop: 15},
  showsHorizontalScrollIndicator: false,
})`
  background-color: #fff;
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

export const ProfileImageContainer = styled.TouchableOpacity`
  margin: 30px 0px;
`;

export const PhofileImage = styled.Image`
  height: 78px;
  width: 78px;
  border-radius: 39px;
  background-color: #f3f3f3;

  align-self: center;
`;

export const ProfileImageLabel = styled.Text`
  font-size: 12px;
  color: #343434;
  text-align: center;
  margin-top: 10px;

  text-transform: uppercase;
`;

export const ButtonBack = styled.TouchableOpacity`
  width: 35px;
`;

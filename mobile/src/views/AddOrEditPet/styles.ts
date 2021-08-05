import styled from 'styled-components/native';

// export const Container = styled.ScrollView.attrs({
//   contentContainerStyle: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 15,
//   },
//   showsHorizontalScrollIndicator: false,
// })`
//   background-color: #fff;
// `;

export const Container = styled.View`
  flex: 1;
  padding: 0px 20px 0px 20px;
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

export const ContainerBottom = styled.View`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;

  padding: 15px 20px;
`;

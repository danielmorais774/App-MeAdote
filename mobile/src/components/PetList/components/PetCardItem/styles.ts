import styled from 'styled-components/native';

interface IContainerProps {
  indexComponent: number;
}

export const Container = styled.TouchableOpacity<IContainerProps>`
  border-radius: 4px;
  overflow: hidden;
  flex: 0.5;
  /* max-width: 50%; */
  margin-right: ${props => (props.indexComponent % 2 === 0 ? '5px' : '2px')};
  margin-left: ${props => (props.indexComponent % 2 !== 0 ? '5px' : '2px')};
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const CardImage = styled.Image`
  flex: 1;
  height: 105px;
  background-color: #f3f3f3;
`;

export const CardContent = styled.View`
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  padding-bottom: 8px;

  background-color: #fff;
`;

export const BadgeBreed = styled.View`
  align-self: baseline;
  padding: 3px;
  border-radius: 4px;
  background-color: #3dc162;
`;

export const BadgeBreedLabel = styled.Text`
  font-size: 9px;
  font-weight: bold;
  color: #fff;
`;

export const CardTitle = styled.Text`
  font-size: 13px;
  font-weight: bold;
  font-family: 'Roboto';
  color: #343434;
  margin-top: 2px;
`;

export const CardSubtitle = styled.Text`
  font-size: 10px;
  color: #343434;
`;

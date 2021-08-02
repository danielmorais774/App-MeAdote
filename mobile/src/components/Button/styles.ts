import styled from 'styled-components/native';

interface IButtonCustomProps {
  color?: string;
  width?: number;
  height?: number;
}

interface ILabelProps {
  labelColor?: string;
}

export const Container = styled.View``;

export const ButtonCustom = styled.TouchableOpacity<IButtonCustomProps>`
  height: ${props => (props.height ? `${props.height}px` : '45px')};
  border-radius: 4px;
  background-color: ${props => (props?.color ? props.color : '#3dc162')};

  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding-left: 10px;
  padding-right: 10px;

  min-width: ${props => (props.width ? `${props.width}px` : '20px')};
`;

export const Label = styled.Text<ILabelProps>`
  flex: 1;
  font-size: 12px;
  font-weight: bold;
  color: ${props => (props?.labelColor ? props.labelColor : '#ffffff')};
  text-align: center;
`;

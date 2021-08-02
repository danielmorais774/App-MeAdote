import styled, {css} from 'styled-components/native';

interface IContainerProps {
  isErrored?: boolean;
}

export const Container = styled.View<IContainerProps>`
  height: 45px;
  background-color: #fff;
  border-radius: 5px;
  padding: 0px 10px;
  margin: 7px 0px;
  border-width: 2px;
  border-color: #fff;

  ${props =>
    props.isErrored &&
    css`
      border-color: #f2494a;
    `}
`;

export const TextInputCustom = styled.TextInput`
  background-color: transparent;
`;

export const ErrorLabel = styled.Text`
  font-size: 12px;
  color: #f2494a;
`;

import styled from 'styled-components/native';

interface IContainerProps {
  width: string | number;
  height: string | number;
}

interface IImageProps {
  width: string | number;
  height: string | number;
}

export const Container = styled.View<IContainerProps>`
  width: ${props => props.width + 'px'};
  height: ${props => props.height + 'px'};
`;

export const Image = styled.Image<IImageProps>`
  width: ${props => props.width + 'px'};
  height: ${props => props.height + 'px'};
`;

export const Pagination = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: 50px;
  align-self: center;
  height: 20px;
`;

import React from 'react';
import {ActivityIndicator} from 'react-native';

import {Container, ButtonCustom, Label} from './styles';

//libs
// import Ionicons from 'react-native-vector-icons/Ionicons';

interface IButtonProps {
  onPress?: () => void;
  title: string;
  color?: string;
  labelColor?: string;
  width?: number;
  height?: number;
  contentStyle?: {};
  labelStyle?: {};
  isLoading?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  title,
  color,
  labelColor,
  width,
  height,
  contentStyle,
  labelStyle,
  isLoading,
  onPress,
}) => {
  return (
    <Container style={contentStyle}>
      <ButtonCustom
        onPress={onPress}
        disabled={isLoading || false}
        color={color}
        width={width}
        height={height}>
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color="#fff"
            style={{alignSelf: 'center'}}
          />
        ) : (
          <Label style={labelStyle} labelColor={labelColor}>
            {title}
          </Label>
        )}
      </ButtonCustom>
    </Container>
  );
};

export default Button;

import React from 'react';

import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  //por padrão já vem, mas não é obrigatório
  //estou forçando para ser!
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
        <ButtonText>{ children }</ButtonText>
    </Container>
  );
};

export default Button;

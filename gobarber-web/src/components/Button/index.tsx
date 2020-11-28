import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// Pode ser criado a tipagem como type, é como se fosse uma interface, porém é uma tipagem de algum elemento ou e.t.c
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
    <Container type="button" {...rest}>
        {children}
    </Container>
);

export default Button;
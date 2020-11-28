import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon: React.ComponentType<IconBaseProps>; //quando quiser receber um componente como propriedade
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isField, setIsField] = useState(false);
    const { fieldName, defaultValue, error, registerField } = useField(name);

    /**
     * lei, pois quando tem uma function dentro de uma function component, toda vez que ela sofre alteração, essas functions
     * é criad novamente
     * 
     * Para evitar processos, pode-se usar um hook chamado useCallback;
     * 
     * LEI!, TODA VEZ QUE FOR CRIAR UMA FUNÇÃO DENTRO DE UM COMPONENT, CRIA COM USECALLBACK
     */

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);

        setIsField(!!inputRef.current?.value);
    }, []);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField]);

    return (
        <Container isErrored={!!error} isField={isField} isFocused={isFocused}>
            { Icon && <Icon size={20} />}
            <input
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                defaultValue={defaultValue}
                ref={inputRef}
                {...rest} 
            />

            {error && <Error title={error}>
                <FiAlertCircle color="#c53030" size={20} />    
            </Error>}
        </Container>
    )
}

export default Input;
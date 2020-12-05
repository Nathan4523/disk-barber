import React, { useState, useCallback, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';
interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}
interface InputValueReference {
  value: string;
}
interface InputRef {
  focus(): void;
}

/**
 * Para passar uma informação do filho para o pai, use um hook do react chamado useImperativeHandle
 * É um modelo avançado e um caso especifico
 */

//recomendando usar somente quando tiver um ref como params
const Input: React.RefForwardingComponent<InputRef, InputProps> = ({ name, icon, ...rest }, ref) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocus, setIsFocus] = useState(false);
  const [isField, setIsField] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocus(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocus(false);
    setIsField(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus(){
      inputElementRef.current.focus();
    }
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProsp({ text: value }); // responsavel por mudar o texto no input (quando for setado manualmente)
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear()
      }
    })
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocus} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocus || isField ? '#ff9000' : '#666360'}
      />
      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);

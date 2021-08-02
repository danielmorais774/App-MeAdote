import React, {useRef, useEffect, useCallback} from 'react';
import {StyleSheet, TextInputProps} from 'react-native';

import {Container, ErrorLabel, TextInputCustom} from './styles';

import {useField} from '@unform/core';

interface IInputTextProps extends TextInputProps {
  placeholder?: string;
  name: string;
  rawText?: string;
  onInitialData?(value: string): void;
  containerStyle?: {};
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const InputText: React.FC<IInputTextProps> = ({
  name,
  placeholder,
  containerStyle = {},
  rawText,
  onInitialData,
  ...rest
}) => {
  const inputElementRef = useRef<any>(null);

  const {fieldName, defaultValue = '', registerField, error} = useField(name);

  //   const inputValueRef = useRef<InputValueReference>({value: defaultValue});

  useEffect(() => {
    if (onInitialData) {
      onInitialData(defaultValue);
    }
  }, [defaultValue, onInitialData]);

  useEffect(() => {
    inputElementRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    if (inputElementRef.current) {
      inputElementRef.current.value = defaultValue;
    }
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputElementRef.current,
      getValue() {
        if (rawText) {
          return rawText;
        }

        if (inputElementRef.current) {
          return inputElementRef.current.value;
        }
        return '';
      },
      setValue(ref, value) {
        if (inputElementRef.current) {
          inputElementRef.current.setNativeProps({text: value});
          inputElementRef.current.value = value;
        }
      },
      clearValue() {
        if (inputElementRef.current) {
          inputElementRef.current.setNativeProps({text: ''});
          inputElementRef.current.value = '';
        }
      },
    });
  }, [fieldName, rawText, registerField]);

  const handleChangeText = useCallback(text => {
    if (inputElementRef.current) {
      inputElementRef.current.value = text;
    }
  }, []);

  return (
    <>
      {!!error && <ErrorLabel>{error}</ErrorLabel>}
      <Container
        style={[styles.shadowCard, containerStyle]}
        isErrored={!!error}>
        <TextInputCustom
          ref={inputElementRef}
          defaultValue={defaultValue}
          placeholder={placeholder}
          placeholderTextColor={'#676767'}
          onChangeText={handleChangeText}
          {...rest}
        />
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  shadowCard: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default InputText;

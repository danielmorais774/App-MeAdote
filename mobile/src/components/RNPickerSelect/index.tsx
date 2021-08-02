import React, {useEffect, useRef, useState} from 'react';
import Picker, {PickerSelectProps} from 'react-native-picker-select';
import {useField} from '@unform/core';
import {StyleSheet, ActivityIndicator} from 'react-native';

import {ErrorLabel} from './styles';

import FeatherIcons from 'react-native-vector-icons/Feather';

interface Props extends Omit<PickerSelectProps, 'onValueChange'> {
  name: string;
  placeholder?: string;
  isLoading?: boolean;
}

export default function RNPickerSelect({
  name,
  items,
  placeholder,
  isLoading,
  ...rest
}: Props) {
  const pickerRef = useRef(null);
  const {fieldName, registerField, defaultValue = '', error} = useField(name);

  const [selectedValue, setSelectedValue] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: pickerRef.current,
      getValue: ref => {
        return ref.props.value || '';
      },
      clearValue: ref => {
        ref.props.onValueChange(ref.props.placeholder.value);
      },
      setValue: (_, value: string) => {
        setSelectedValue(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      {!!error && <ErrorLabel>{error}</ErrorLabel>}
      <Picker
        style={{
          ...pickerSelectStyles,
          inputAndroid: {
            ...pickerSelectStyles.inputAndroid,
            borderColor: error ? '#f2494a' : '#fff',
          },
          inputIOS: {
            ...pickerSelectStyles.inputIOS,
            borderColor: error ? '#f2494a' : '#fff',
          },
        }}
        ref={pickerRef}
        value={selectedValue}
        onValueChange={setSelectedValue}
        useNativeAndroidPickerStyle={false}
        items={items}
        disabled={isLoading}
        placeholder={{
          label: placeholder || 'Selecione ...',
          value: null,
          color: '#676767',
        }}
        Icon={() => (
          <>
            {isLoading ? (
              <ActivityIndicator size={'small'} color="#3DC162" />
            ) : (
              <FeatherIcons
                name="chevron-down"
                size={18}
                color="#343434"
                style={{marginTop: 2}}
              />
            )}
          </>
        )}
        {...rest}
      />
    </>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 45,
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 2,
    borderRadius: 5,
    color: 'black',
    backgroundColor: '#fff',

    marginVertical: 7,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.22,

    elevation: 3,
  },
  inputAndroid: {
    height: 45,
    fontSize: 16,
    width: 'auto',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 2,
    borderRadius: 5,
    color: 'black',
    backgroundColor: '#fff',

    marginVertical: 7,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.22,

    elevation: 3,
  },
  iconContainer: {
    top: 18,
    right: 12,
    elevation: 5,
  },
  placeholder: {
    color: '#676767',
    fontSize: 14,
  },
});

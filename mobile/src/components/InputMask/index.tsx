import React, {useState, useCallback, forwardRef} from 'react';
import {TextInputMask, TextInputMaskProps} from 'react-native-masked-text';

import Input from '../InputText';

interface ITextInputMaskProps extends TextInputMaskProps {
  name: string;
}

// interface IInputMaskProps {
//   props: TextInputMaskProps;
//   inputRef: string;
// }

const InputMask: React.ForwardRefRenderFunction<any, ITextInputMaskProps> = (
  {type, ...rest},
  inputRef,
) => {
  const [text, setText] = useState('');
  const [rawText, setRawText] = useState('');

  const handleChangeText = useCallback((maskedText, unmaskedText) => {
    setText(maskedText);
    setRawText(unmaskedText);
  }, []);

  return (
    <TextInputMask
      type={type}
      includeRawValueInChangeText
      value={text}
      onChangeText={handleChangeText}
      customTextInput={Input}
      customTextInputProps={{
        ref: inputRef,
        rawText,
        onInitialData: setText,
      }}
      {...rest}
    />
  );
};

export default forwardRef(InputMask);

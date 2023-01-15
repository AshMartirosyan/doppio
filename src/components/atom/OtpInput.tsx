import React, { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  AppState,
  InteractionManager,
  NativeSyntheticEvent,
  TextInput as NativeTextInput,
  TextInputKeyPressEventData,
  TextInputProps,
  View,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import styled from 'styled-components';
import colors from '../../constants/colors';
import { checkIsOtp } from '../../util/helpers';
import { horizontalScale, moderateScale } from '../../util/scale';
import TextInput from './TextInput';

const BaseComponent = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const Input = styled(TextInput)`
  font-size: ${moderateScale(32)}px;
  text-align: center;
`;

interface Props extends TextInputProps {
  inputsCount: number;
  onComplete?: (value: string) => void;
  hasError?: boolean;
}

const OtpInput: FC<Props> = ({ inputsCount, hasError = false, onComplete }) => {
  const appState = useRef(AppState.currentState);
  const focusRef = useRef<NativeTextInput | null>(null);
  const [nextFocus, setNextFocus] = useState(0);
  const [otpArray, setOtpArray] = useState<Array<string>>([]);

  const getRef = useCallback(
    (ref: NativeTextInput | null, current: number) => {
      if (current === nextFocus) {
        focusRef.current = ref;
      }
    },
    [nextFocus],
  );

  useEffect(() => {
    if (otpArray.length === inputsCount && !otpArray.includes('')) {
      onComplete && onComplete(otpArray.join(''));
    }
  }, [inputsCount, onComplete, otpArray, otpArray.length]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        const text = await Clipboard.getString();
        if (checkIsOtp(text, inputsCount)) {
          const newOtpArray = text.split('');
          setOtpArray(newOtpArray);
        }
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [inputsCount]);

  const handleNextFocus = useCallback(() => {
    focusRef.current?.focus();
  }, []);

  const handleTextInputChange = useCallback(
    (text: string, index: number) => {
      const newOtpArray = [...otpArray];
      newOtpArray[index] = text;
      if (text) {
        handleNextFocus();
      }
      setOtpArray(newOtpArray);
    },
    [handleNextFocus, otpArray],
  );

  const onKeyPress = useCallback(
    ({ nativeEvent: { key } }: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
      const text = key === 'Backspace' || key.length > 1 ? '' : key;

      handleTextInputChange(text, index);

      if (!text && index !== 0 && otpArray[index - 1] !== '') {
        setNextFocus(index - 1);
        InteractionManager.runAfterInteractions(() => {
          focusRef.current?.focus();
        });
      }
    },
    [handleTextInputChange, otpArray],
  );

  const onChangeText = useCallback(
    (text: string) => {
      if (text.length > 1 && checkIsOtp(text, inputsCount)) {
        const newOtpArray = text.split('');
        setOtpArray(newOtpArray);
      }
    },
    [inputsCount],
  );

  return (
    <BaseComponent>
      {Array(inputsCount)
        .fill(0)
        .map((_, index) => (
          <Input
            ref={ref => getRef(ref, index)}
            key={index}
            selectTextOnFocus={true}
            onFocus={() => setNextFocus(index + 1)}
            value={otpArray[index]}
            onChangeText={onChangeText}
            maxLength={index === 0 ? 4 : 1}
            autoComplete="sms-otp"
            textContentType="oneTimeCode"
            selectionColor={colors.greenDark}
            wrapperStyle={{
              width: moderateScale(56),
              borderRadius: moderateScale(12),
              marginRight: index !== inputsCount - 1 ? horizontalScale(10) : 0,
            }}
            hasError={hasError}
            keyboardType="numeric"
            onKeyPress={e => onKeyPress(e, index)}
          />
        ))}
    </BaseComponent>
  );
};

// const styles = StyleSheet.create({
//   input: {
//     textAlign: 'center',
//     width: horizontalScale(34),
//     height: verticalScale(41),
//     borderRadius: moderateScale(5),
//     marginRight: horizontalScale(10),
//     fontSize: moderateScale(20),
//     fontWeight: '700',
//     color: colors.primary,
//     borderWidth: 0.5,
//     borderColor: colors.primary_border,
//     backgroundColor: colors.input_background,
//   },
//   lastItem: {
//     marginRight: 0,
//   },
//   error: {
//     borderColor: colors.errorRed,
//     color: colors.black,
//   },
// });

export default memo(OtpInput);

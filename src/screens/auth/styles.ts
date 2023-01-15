import { KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components';
import { Text } from '../../components/atom';
import colors from '../../constants/colors';
import { verticalScale } from '../../util/scale';

export const ErrorText = styled(Text)`
  color: ${colors.errorRed};
  font-weight: 300;
  padding-bottom: ${verticalScale(13)}px;
  text-align: center;
  align-self: flex-start;
  min-height: ${verticalScale(32)}px;
`;

export const KeyboardView = styled(KeyboardAvoidingView)`
  flex: 1;
`;

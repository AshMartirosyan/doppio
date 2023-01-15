import { Dimensions } from 'react-native';
import { verticalScale } from '../util/scale';

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');
export const OTP_LENGTH = 4;
export const HEADER_HEIGHT = verticalScale(48);
export const TAB_HEIGHT = verticalScale(64);

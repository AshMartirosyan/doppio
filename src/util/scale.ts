import { Dimensions } from 'react-native';

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 640;

const horizontalScale = (size: number) =>
  (Dimensions.get('screen').width / guidelineBaseWidth) * size;
const verticalScale = (size: number) =>
  (Dimensions.get('screen').height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };

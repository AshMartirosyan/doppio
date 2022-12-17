import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../constants/sizes';

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 640;

const horizontalScale = (size: number) =>
  (WINDOW_WIDTH / guidelineBaseWidth) * size;
const verticalScale = (size: number) =>
  (WINDOW_HEIGHT / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export {horizontalScale, verticalScale, moderateScale};

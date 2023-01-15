import React, { FC, useCallback } from 'react';
import LottieView from 'lottie-react-native';
import styled from 'styled-components';
import BaseAnimation from '../assets/animations/baseAnimation.json';
import { Screen } from '../components/atom';
import colors from '../constants/colors';

const BaseScreen = styled(Screen)`
  justify-content: center;
  align-items: center;
  background-color: ${colors.backgroundAuth};
`;

interface Props {
  onEnd: (state: boolean) => void;
}

export const LunchScreen: FC<Props> = ({ onEnd }) => {
  const onEndAnimation = useCallback(() => onEnd(true), [onEnd]);
  return (
    <BaseScreen edges={['left', 'right', 'top', 'bottom']}>
      <LottieView
        source={BaseAnimation}
        loop={false}
        autoPlay
        speed={2}
        onAnimationFinish={onEndAnimation}
      />
    </BaseScreen>
  );
};

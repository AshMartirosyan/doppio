import React, {FC, memo, ReactNode} from 'react';
import {
  StatusBar,
  StatusBarStyle,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';

interface Props {
  children?: ReactNode;
  edges?: Edge[];
  style?: StyleProp<ViewStyle>;
  barStyle?: StatusBarStyle;
}

const ScreenComponent: FC<Props> = ({edges, style, barStyle, children}) => {
  return (
    <SafeAreaView edges={edges} style={[styles.base, style]}>
      <StatusBar barStyle={barStyle || 'dark-content'} />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  base: {flex: 1},
});

export default memo(ScreenComponent);

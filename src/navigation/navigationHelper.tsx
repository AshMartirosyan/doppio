import { createRef } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParams } from './MainNavigation';

export type MainNavigationProp = NativeStackNavigationProp<MainStackParams, 'Tab'>;
export const navigationRef = createRef<NavigationContainerRef<MainStackParams>>();

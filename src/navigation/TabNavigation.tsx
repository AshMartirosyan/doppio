import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { default as HomeIcon } from '../assets/icons/Cup.svg';
import { default as FeedIcon } from '../assets/icons/Feed.svg';
import { default as MoreIcon } from '../assets/icons/More.svg';
import { default as ShopIcon } from '../assets/icons/Shop.svg';
import { TabIcon } from '../components/atom';
import colors from '../constants/colors';
import { TAB_HEIGHT } from '../constants/sizes';
import { Feed, Home, More, Shops } from '../screens';
import { useAppSelector } from '../store';
import { getIsLoggedIn } from '../store/auth/selectors';
import { verticalScale } from '../util/scale';
import { MainStackParams } from './MainNavigation';

export interface TabBarScreen {
  borderRadius: any;
}

export type MainTabParams = {
  Home: undefined;
  Shops: undefined;
  Feed: undefined;
  More: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<MainTabParams>();

interface Props {
  navigation: NativeStackNavigationProp<MainStackParams, 'Tab'>;
}

export const TabNavigation: FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const isLoggedIn = useAppSelector(getIsLoggedIn);

  return (
    <Navigator
      screenListeners={{
        tabPress: e => {
          if (e.target?.includes('More') && !isLoggedIn) {
            e.preventDefault();
            navigation.navigate('Auth', { screen: 'Login' });
          }
        },
      }}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background1,
          height: insets.bottom + TAB_HEIGHT,
          borderTopWidth: verticalScale(1),
          borderTopColor: colors.background3,
        },

        tabBarHideOnKeyboard: true,
      }}
      initialRouteName="Home">
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon={<HomeIcon />} focused={focused} />,
        }}
      />
      <Screen
        name="Shops"
        component={Shops}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon={<ShopIcon />} focused={focused} />,
        }}
      />
      <Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon={<FeedIcon />} focused={focused} />,
        }}
      />
      <Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon={<MoreIcon />} focused={focused} />,
        }}
      />
    </Navigator>
  );
};

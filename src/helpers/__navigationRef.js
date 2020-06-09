/*
 * Tutorial: 15. In-App Authentication
 * Lesson: 19. Navigation From Outside of React.mp4
 * Allow us navigate to different screen from any place
 */

import {NavigationAction} from '@react-navigation/native';

let navigator;

export const setNavigator = nav => {
  console.log('4lex!!!!!!!!!!!!!!!!===========');
  navigator = nav;
};

export const navigate = (routeName, params) => {
  navigator.dispatch(NavigationAction.navigate({routeName, params}));
};

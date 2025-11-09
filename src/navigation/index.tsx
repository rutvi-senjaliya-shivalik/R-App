import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AuthStack from './stackNavigator/authStack';
import AppStack from './stackNavigator/appStack';
import { selectUserData } from '../store/selectors/auth';
import { isEmpty } from 'lodash';

const RootNavigation = () => {
  const userData = useSelector(selectUserData);
  console.log('userData:::', userData);

  // if (isLoading) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         backgroundColor: COLORS.WHITE,
  //       }}
  //     >
  //       <ActivityIndicator size="large" color={COLORS.BLACK} />
  //     </View>
  //   );
  // }

  return (
    <NavigationContainer
      key={!isEmpty(userData) ? 'authenticated' : 'unauthenticated'}
    >
      {!isEmpty(userData) ? (
        <>
          <AppStack />
        </>
      ) : (
        <>
          <AuthStack />
        </>
      )}
    </NavigationContainer>
  );
};

export default RootNavigation;

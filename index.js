/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Suppress Legacy Architecture deprecation warning
LogBox.ignoreLogs([
  'The app is running using the Legacy Architecture',
]);

AppRegistry.registerComponent(appName, () => App);

import { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { getApp } from '@react-native-firebase/app';
import {
  FirebaseMessagingTypes,
  getMessaging,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
  requestPermission,
  AuthorizationStatus,
  registerDeviceForRemoteMessages,
} from '@react-native-firebase/messaging';
import PushNotification, { Importance } from 'react-native-push-notification';

const app = getApp();
const messaging = getMessaging(app);

const CHANNEL_ID = 'ros-push-notification';

const showNotification = (
  notification: FirebaseMessagingTypes.Notification,
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) => {
  PushNotification.localNotification({
    channelId: CHANNEL_ID,
    title: notification?.title ? notification?.title : '',
    message: notification?.body ? notification?.body : '',
    userInfo: remoteMessage?.data ? remoteMessage?.data : '',
  });
};

export const usePushNotification = () => {
  PushNotification.createChannel(
    {
      channelId: CHANNEL_ID, // (required)
      channelName: 'ros channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      click_action: 'OPEN_ACTIVITY_1',
    },
    // (created: any) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );

  const handleNotificationFlow = (
    notificationData: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    console.log('handleNotificationFlow::', notificationData);
  };

  PushNotification.configure({
    onNotification: (remoteMessage: any) => {
      const clicked =
        remoteMessage?.userInteraction && remoteMessage?.foreground;
      if (clicked) {
        // handle notification when app is in open state
      }
    },
  });

  /**
   * Handle notification when app is in background or killed state
   */
  const onHandleMessage = () => {
    onNotificationOpenedApp(messaging, remoteMessage => {
      console.log(
        'Notification caused app to open from background state: > > > > > >',
        remoteMessage,
      );
      // Redirection on Notification press from background state
      if (
        remoteMessage &&
        remoteMessage !== null &&
        remoteMessage?.data &&
        remoteMessage.notification !== null
      ) {
        if (remoteMessage) {
          //handle redirection based on notification type
        }
      }
    });

    getInitialNotification(messaging).then(async remoteMessage => {
      console.log(
        'Notification caused app to open from kill state: > > > > > >',
        remoteMessage,
      );
      if (remoteMessage) {
        //handle redirection based on notification type
      }
    });
  };

  /**
   * Request status for notification permissions
   */
  const requestPermissions = async () => {
    const authStatus = await requestPermission(messaging);
    const enabled =
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      onHandleMessage();
    }
  };

  /**
   * Check android app permission for push notifications
   */
  const checkApplicationPermission = async () => {
    try {
      const permissions = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (!!permissions && permissions === 'granted') {
        /// For Android API level 33+
        requestPermissions();
      } else {
        /// For Android API level < 33
        onHandleMessage();
      }
    } catch (error) {
      console.log('Error checking permissions:', error);
    }
  };

  /**
   * Check iOS application permission for push notifications
   */
  const registerForRemoteMessages = () => {
    registerDeviceForRemoteMessages(messaging)
      .then(() => {
        requestPermissions();
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      registerForRemoteMessages();
    } else {
      checkApplicationPermission();
    }

    const unsubscribe = onMessage(messaging, remoteMessage => {
      console.log('inside onMessage >>>>>>', remoteMessage);
      handleNotificationFlow(remoteMessage);
      if (Platform.OS === 'android' && remoteMessage?.notification) {
        showNotification(remoteMessage.notification!, remoteMessage);
      }
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

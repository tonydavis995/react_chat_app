//Navigation Manager for different screens
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AuthScreen from "../screens/auth/authScreen";
import ChatScreen from "../screens/chat/chatScreen";
import SplashScreen from "../screens/splash/splashScreen";
import ProfileScreen from "../screens/profile/profileScreen";
import MapScreen from "../screens/maps/mapScreen";


const ChatNavigator = createStackNavigator({
  Chat: ChatScreen,
  Profile: ProfileScreen,

})
const MapNavigator = createStackNavigator({
  Map: MapScreen
})
const AuthNavigator  = createStackNavigator({
  Auth: AuthScreen
})
const MainNavigator = createSwitchNavigator({
  splash: SplashScreen,
  auth: AuthNavigator,
  chat: ChatNavigator,
  map: MapNavigator
})


export default createAppContainer(MainNavigator);

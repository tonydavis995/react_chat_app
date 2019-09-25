//Navigation Manager for different screens
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AuthScreen from "../screens/auth/authScreen";
// import ChatScreen from "../screens/chat/chatScreen";

// const ChatNavigator = createStackNavigator({
//   Chat: ChatScreen
// })
const AuthNavigator  = createStackNavigator({
  Auth: AuthScreen
})
const MainNavigator = createSwitchNavigator({
  auth: AuthNavigator,
  // chat: ChatNavigator
})


export default createAppContainer(MainNavigator);

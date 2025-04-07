import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MajorPage from "../Screens/MajorPage";
import Index from "../Screens/index";

const Stack = createStackNavigator();

export default function HomeScreen() {
  return (
    // <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen name="Index" component={Index}  options={{headerShown: false}}/>
        <Stack.Screen name="MajorPage" component={MajorPage} options={{headerShown: false}} />
      </Stack.Navigator>
   
  );
}

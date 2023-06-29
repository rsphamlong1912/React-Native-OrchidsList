import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import TabRoute from "./components/TabRoute";

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <TabRoute />
      {/* <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={TabRoute} />
        <Stack.Screen
          name="FavoriteOrchids"
          component={FavoriteOrchidsScreen}
        />
        <Stack.Screen name="OrchidDetail" component={OrchidDetail} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
};

export default App;

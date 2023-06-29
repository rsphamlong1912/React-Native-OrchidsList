import React from "react";
import Icon from "react-native-vector-icons/Octicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import FavoriteOrchidsScreen from "../screens/FavoriteOrchidsScreen";
import OrchidDetail from "../screens/OrchidDetail";
import COLORS from "../constants/colors";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function TabRoute() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "gray",
        showLabel: true,
        style: {
          height: 60,
          paddingTop: 10,
          paddingBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={TabHome}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name="home" color={color} size={25} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="FavoriteOrchids"
        component={TabFavorite}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name="heart" color={color} size={25} />;
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export const TabHome = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="OrchidDetail" component={OrchidDetail} />
    </Stack.Navigator>
  );
};

export const TabFavorite = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Favorite" component={FavoriteOrchidsScreen} />
      <Stack.Screen name="OrchidDetail" component={OrchidDetail} />
    </Stack.Navigator>
  );
};

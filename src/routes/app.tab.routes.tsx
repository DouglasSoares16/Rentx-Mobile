import React from "react";
import { Platform } from "react-native";
import { useTheme } from "styled-components/native";
import { SimpleLineIcons, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Profile } from "../screens/Profile";
import { AppStackRoutes } from "./app.stack.routes";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
  const { colors } = useTheme();

  return (
    <Navigator screenOptions={{
      headerShown: false,

      tabBarActiveTintColor: colors.main,
      tabBarInactiveTintColor: colors.text_detail,
      tabBarShowLabel: false,
      tabBarStyle: {
        paddingVertical: Platform.OS === "ios" ? 20 : 0,
        backgroundColor: colors.background_primary
      }
    }}>
      <Screen
        name="Home"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="home" size={20} color={color} />
          )
        }}
      />
      <Screen
        name="Profile"
        component={Profile} 
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          )
        }}
      />
    </Navigator>
  )
}
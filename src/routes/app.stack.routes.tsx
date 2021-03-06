import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/Home";
import { MyCars } from "../screens/MyCars";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { Confirmation } from "../screens/Confirmation";
import { SchedulingDetails } from "../screens/SchedulingDetails";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppStackRoutes() {
  return (
    <Navigator initialRouteName="Home" screenOptions={{
      headerShown: false
    }}>
      <Screen
        name="Home"
        component={Home}
        options={{ gestureEnabled: false }} />

      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="MyCars" component={MyCars} />

      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  )
}
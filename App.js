import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import Image from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import SplashScreen from "./containers/SplashScreen";
import RoomScreen from "./containers/RoomScreen";
import AroundMeScreen from "./containers/AroundMeScreen";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(userToken);

      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken === null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen name="SignIn" options={{ headerShown: false }}>
              {() => <SignInScreen setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp" options={{ headerShown: false }}>
              {() => <SignUpScreen setToken={setToken} />}
            </Stack.Screen>
          </>
        ) : (
          // User is signed in ! ????
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: "tomato",
                  tabBarInactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="TabHome"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          title: "home",
                          headerStyle: { backgroundColor: "#FFFFFF" },
                          headerTitleStyle: { color: "white" },
                        }}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Room"
                        // component={RoomScreen}
                        options={{
                          title: "Room",
                          headerStyle: { backgroundColor: "#FFFFFF" },
                          headerTitleStyle: { color: "white" },

                          //  tentative d'encrage du logo :
                          // headerTitle: () => (
                          //   <Image
                          //     source={require("./assets/images/Airbnb-logo.png")}
                          //     style={{ width: 30, height: 30 }}
                          //   />
                          // ),
                        }}
                      >
                        {() => <RoomScreen />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "User Profile",
                        }}
                      >
                        {() => <ProfileScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="TabAroundMe"
                  options={{
                    tabBarLabel: "Around Me",
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons
                        name="map-marker-outline"
                        size={24}
                        color="#747474"
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="AroundMe"
                        options={{
                          title: "Around Me",
                        }}
                      >
                        {() => <AroundMeScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="TabSettings"
                  options={{
                    tabBarLabel: "My profile",
                    tabBarIcon: ({ color, size }) => (
                      <AntDesign name="user" size={24} color="#747474" />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Settings"
                        options={{
                          title: "Settings",
                        }}
                      >
                        {() => <SettingsScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

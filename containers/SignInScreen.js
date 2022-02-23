import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { useState } from "react";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const handlePress = async (event) => {
    try {
      event.preventDefault();
      if (!email || !password) {
        setErrorMessage("Please fill all fields");
      } else {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          }
        );

        if (response.data.token) {
          setToken(response.data.token);
          alert("Hello again 😎");
        }
      }
    } catch (error) {
      console.log(error.response.data.error);
      setErrorMessage("mail adress and/or password incorrect");
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.keyboard}>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoBlock}>
          <Image
            source={require("../assets/images/Airbnb-Logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Sign in</Text>
        </View>
        <View>
          {/* <View style={styles.formBlock}> */}
          <View style={styles.formBlockTop}>
            <TextInput
              style={styles.signInput}
              placeholder="email"
              onChangeText={(email) => {
                setEmail(email);
              }}
              value={email}
            />
            <TextInput
              style={styles.signInput}
              placeholder="password"
              onChangeText={(password) => {
                setPassword(password);
              }}
              value={password}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.formBlockBottom}>
            <View style={styles.errorTextBlock}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
            <TouchableOpacity style={styles.signBtn} onPress={handlePress}>
              <Text style={styles.signBtnText}>Sign in</Text>
            </TouchableOpacity>

            {/* <Button title="Sign in" onPress={handlePress} /> */}
            <TouchableOpacity
              style={styles.registerBtn}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={styles.registerBtnText}>No account? Register</Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    height: height,
    width: width,
  },
  container: {
    height: height,

    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    // marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },

  // ********************** logo block *********************

  logoBlock: {
    fontSize: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "30%",
  },
  logo: {
    width: width,
    height: "50%",
  },
  title: {
    fontSize: 20,
    color: "#717171",
    fontWeight: "700",
  },

  // **********************                  **********************
  // ********************** formulaire block **********************
  // **********************                  **********************

  // ********************** formulaire top **********************

  formBlockTop: {
    height: "50%",
    width: "80%",
    marginHorizontal: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  signInput: {
    paddingBottom: 10,
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    width: "100%",
    height: "20%",
  },

  //******************* formulaire Bottom *******************

  formBlockBottom: {
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "30%",
  },
  errorTextBlock: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#EB5A62",
  },
  signBtn: {
    width: 150,
    flex: 1,
    borderWidth: 3,
    borderColor: "#EB5A62",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  signBtnText: {
    color: "#717171",
  },
  registerBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  registerBtnText: {
    color: "#717171",
  },
});

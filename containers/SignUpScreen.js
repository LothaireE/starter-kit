import { useNavigation } from "@react-navigation/core";

import {
  Button,
  Text,
  TextInput,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePress = async (event) => {
    try {
      event.preventDefault();
      if (
        !email ||
        !username ||
        !description ||
        !password ||
        !confirmPassword
      ) {
        setErrorMessage("All inputs must be filled");
      } else {
        if (password !== confirmPassword) {
          setErrorMessage("Passwords must be the same");
        } else {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              username: username,
              description: description,
              password: password,
            }
          );
          if (response.data.email) {
          }
          if (response.data.token) {
            // console.log("setToken ===>", response.data.token);
            setToken(response.data.token);
            alert("Bienvenue 🙂");
          }
        }
      }
    } catch (error) {
      console.log("=====>", error.response.data.error);

      if (
        error.response.data.error === "This username already has an account." ||
        error.response.data.error === "This email already has an account."
      ) {
        setErrorMessage(error.response.data.error);
      }
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
          <Text style={styles.title}>Sign up</Text>
        </View>
        <View>
          <View style={styles.formBlock}>
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
                placeholder="username"
                onChangeText={(username) => {
                  setUsername(username);
                }}
                value={username}
              />

              <TextInput
                style={styles.signInputArea}
                multiline={true}
                numberOfLines={4}
                placeholder="description"
                onChangeText={(description) => {
                  setDescription(description);
                }}
                value={description}
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
              <TextInput
                style={styles.signInput}
                placeholder="confirmPassword"
                onChangeText={(confirmPassword) => {
                  setConfirmPassword(confirmPassword);
                }}
                value={confirmPassword}
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
                  navigation.navigate("SignIn");
                }}
              >
                <Text style={styles.registerBtnText}>
                  Already have an account? Sign in
                </Text>
              </TouchableOpacity>
            </View>
            {/* <Text>la : {errorMessage}</Text>
            <Button title="Sign up" onPress={handlePress} /> */}
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
//Already have an account? Sign in
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
  },
  // marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  // ********************** logo block *********************

  logoBlock: {
    // borderColor: "black",
    // borderWidth: 2,
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

  // ********************** formulaire top **********************

  formBlockTop: {
    // borderColor: "black",
    // borderWidth: 2,
    height: "60%",
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
    height: "15%",
  },
  signInputArea: {
    // alignItems: "center",
    // justifyContent: "center",
    padding: 10,
    paddingBottom: 10,
    borderColor: "#FFBAC0",
    borderWidth: 2,
    width: "100%",
    height: "30%",
    marginTop: "8%",
  },
  //******************* formulaire Bottom *******************

  formBlockBottom: {
    // borderColor: "black",
    // borderWidth: 2,
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

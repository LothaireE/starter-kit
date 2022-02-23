import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  ActivityIndicator,
  FlatList,
  Button,
  Text,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms"
      );

      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
    console.log("data ====>", data);
  }, []);

  return isLoading ? (
    // <Text>lottie view soon</Text>
    <View>
      <ActivityIndicator />
    </View>
  ) : (
    // <KeyboardAwareScrollView style={styles.keyboard}>
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Welcome home!!!</Text>
        <View>
          <FlatList
            data={data}
            // **************** item.title ou bien item.Object
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              console.log("each appartment===>", item.photos);
              return (
                <View style={styles.locationCard}>
                  <View style={styles.topCard}>
                    <FlatList
                      style={{ height: 200 }}
                      options={{ horizontal: true }}
                      data={item.photos}
                      keyExtractor={(item) => item.picture_id}
                      renderItem={({ item }) => {
                        console.log("mon image? ", item);
                        const image = item.url[0];
                        return (
                          <Image
                            source={{
                              uri: image,
                            }}
                            style={styles.locationCardPic}
                            // resizeMode="contain"
                          />
                        );
                      }}
                    />
                    <Text>{item.price}</Text>
                  </View>

                  <View>
                    <Text>{item.title}</Text>
                    <View>
                      <Text>{item.ratingValue}</Text>
                      <Text>{item.reviews}</Text>
                    </View>
                  </View>
                  <View>
                    <Text>user's pic soon</Text>
                  </View>
                </View>
              );
            }}
          ></FlatList>
        </View>
        <Button
          title="Go to Profile"
          onPress={() => {
            navigation.navigate("Profile", { userId: 123 });
          }}
        />
      </View>
    </SafeAreaView>
    // </KeyboardAwareScrollView>
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
  },

  // **************** locationCard ****************
  locationCard: {
    borderBottomWidth: 2,
    borderBottomColor: "#B2B2B2",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  locationCardPic: {
    height: 200,
    width: 300,
  },
  topCard: {
    backgroundColor: "chartreuse",
    height: 200,
    width: 300,
  },
});

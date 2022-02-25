import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Rating from "../components/Rating";
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
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  borderColor,
  color,
} from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

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
    // console.log("data ====>", data);
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
        <View>
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              // console.log("each id===>", item._id);

              return (
                <TouchableHighlight
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD"
                  onPress={() => {
                    navigation.navigate("Room", { id: item._id });
                  }}
                >
                  <View style={styles.locationCard}>
                    <View style={styles.topCard}>
                      <ImageBackground
                        source={{
                          uri: item.photos[0].url,
                        }}
                        style={styles.topCardPic}
                        resizeMode="cover"
                      >
                        <View style={styles.topCardPrice}>
                          <Text style={styles.priceNum}>{item.price} €</Text>
                        </View>
                      </ImageBackground>
                    </View>

                    <View style={styles.bottomCard}>
                      <View style={styles.bottomLeft}>
                        <Text style={styles.cardTitle} numberOfLines={1}>
                          {item.title}
                        </Text>
                        <View style={styles.ratings}>
                          <Rating rating={item.ratingValue} />
                          {/* <Text>{item.ratingValue}</Text> */}
                          <Text>{item.reviews} reviews</Text>
                        </View>
                      </View>
                      <View style={styles.bottomRight}>
                        {/* item.user.account.photo.url */}
                        <Image
                          source={{
                            uri: item.user.account.photo.url,
                          }}
                          style={styles.userPic}
                          resizeMode="cover"
                        />
                        <Image />
                      </View>
                    </View>
                  </View>
                </TouchableHighlight>
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
    // borderBottomWidth: 2,
    // borderBottomColor: "#B2B2B2",
    marginHorizontal: 15,
    marginVertical: 5,
    height: "20%",
  },
  topCard: {
    alignItems: "center",
  },
  topCardPic: {
    // flex: 3,
    // marginHorizontal: "auto",
    height: 180,
    width: "100%",
  },
  topCardPrice: {
    backgroundColor: "black",
    color: "white",
    position: "absolute",
    bottom: 10,
    // left: 20,
    width: "30%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "25%",
  },
  priceNum: {
    color: "white",
    fontSize: 18,
  },

  bottomCard: {
    marginVertical: 10,
    flexDirection: "row",
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: "#B2B2B2",
    paddingBottom: 10,
  },
  bottomLeft: {
    width: "70%",
    // borderWidth: 1,
    // borderColor: "red",
  },
  cardTitle: {
    fontSize: 18,
  },
  ratings: {
    flexDirection: "row",
  },

  bottomRight: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  userPic: {
    height: 75,
    width: 75,
    borderRadius: 50,
  },
});

{
  /* <FlatList
  style={{ height: 200 }}
  horizontal={true}
  data={item.photos}
  keyExtractor={(item) => item.picture_id}
  renderItem={({ item }) => {
    console.log("mon image? ", item);
    const image = item.url;
    return (
      <Image
        source={{
          uri: image,
        }}
        style={styles.locationCardPic}
        resizeMode="contain"
      />
    );
  }}
/>; */
}
//             source={{
//                 uri: data.photos[0].url,
//               }}
//               style={styles.topCardPic}
//               resizeMode="cover"
//             >
//               <View style={styles.topCardPrice}>
//                 <Text style={styles.priceNum}>{data.price} €</Text>
//               </View>
//             </ImageBackground>

// <SwiperFlatList
// autoplay
// autoplayDelay={2}
// autoplayLoop
// index={2}
// showPagination
// data={colors}
// renderItem={({ item }) => (
//   <View style={[styles.child, { backgroundColor: item }]}>
//     <Text style={styles.text}>{item}</Text>
//   </View>
// )}
// />

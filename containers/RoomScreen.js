import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/core";
import { useEffect, useState } from "react";
import axios from "axios";
import Rating from "../components/Rating";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function RoomScreen() {
  const { params } = useRoute();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${params.id}`
      );
      setData(response.data);
      // console.log("response.data===>", response.data);
      setIsLoading(false);
      // console.log("data===>", data.location[1]);
    };
    // console.log("data===>", params);
    fetchData();
  }, []);

  return isLoading ? (
    // <Text>lottie view soon</Text>
    <View>
      <ActivityIndicator />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <View>
        {/* <Text>user id : {params.id}</Text> */}
        <View style={styles.locationCard}>
          <View style={styles.topCard}>
            <SwiperFlatList
              style={styles.picBlock}
              autoplay={false}
              autoplayDelay={2}
              autoplayLoop={false}
              index={2}
              showPagination
              data={data.photos}
              renderItem={({ item }) => (
                <ImageBackground
                  style={styles.topCardPic}
                  resizeMode="cover"
                  source={{ uri: item.url }}
                />
              )}
            />
            <View style={styles.topCardPrice}>
              <Text style={styles.priceNum}>{data.price} €</Text>
            </View>
          </View>

          <View style={styles.bottomCard}>
            <View style={styles.bottomLeft}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {data.title}
              </Text>
              <View style={styles.ratings}>
                <Rating rating={data.ratingValue} />
                {/* <Text>{data.ratingValue}</Text> */}
                <Text>{data.reviews} reviews</Text>
              </View>
            </View>
            <View style={styles.bottomRight}>
              {/* data.user.account.photo.url */}
              <Image
                source={{
                  uri: data.user.account.photo.url,
                }}
                style={styles.userPic}
                resizeMode="cover"
              />
              <Image />
            </View>
          </View>
          <View style={styles.descriptionBlock}>
            <Text>{data.description}</Text>
          </View>
          <View>
            <MapView
              style={styles.mapBlock}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: 48.856614,
                longitude: 2.3522219,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              showsUserLocation={true}
            >
              <MapView.Marker
                coordinate={{
                  latitude: data.location[1],
                  longitude: data.location[0],
                }}
                // title={data.title}
                // description={marker.description}
              />
            </MapView>

            {/*     latitude: data.location[1],
                longitude: data.location[0], */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  picBlock: {
    height: 200,
    width: width,
  },
  topCardPic: {
    backgroundColor: "red",
    // flex: 3,
    // marginHorizontal: "auto",
    height: 180,
    width: width,
    marginHorizontal: 2,
    // width: "100%",
  },
  topCardPrice: {
    backgroundColor: "black",
    position: "absolute",
    bottom: 10,
    left: 0,
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
    // borderBottomColor: "#B2B2B2",
    paddingBottom: 10,
  },
  bottomLeft: {
    width: "70%",
    borderWidth: 1,
    borderColor: "red",
    justifyContent: "space-between",
  },
  // starsBlock: {
  //   borderColor: "red",
  //   borderWidth: 1,
  // },
  // reviewBlock: {
  //   borderWidth: 1,
  //   borderColor: "red",
  //   color: "red",
  // },
  cardTitle: {
    fontSize: 18,
  },
  ratings: {
    borderWidth: 1,

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
  descriptionBlock: {
    borderWidth: 2,
    height: 100,
  },

  //******************** mapBlock ********************

  mapBlock: {
    borderWidth: 2,
    height: 220,
    width: width,
  },
});

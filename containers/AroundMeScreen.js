import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function AroundMeScreen(props) {
  // **********************************************************************************
  // **********************************************************************************
  // *********************** mon log de props qui ne donne rien ***********************
  console.log(props);
  // *********************** mon log de props qui ne donne rien ***********************
  // **********************************************************************************
  // **********************************************************************************

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  //   console.log("data =====>", data);

  useEffect(() => {
    const getPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        // console.log(status);
        if (status === "granted") {
          // console.log("ok c'est good");
          const location = await Location.getCurrentPositionAsync();

          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);

          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          );
          setData(response.data);
          //   console.log("response =====>", response.data);

          setIsLoading(false);
        } else {
          alert("Permission denied");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    // const fetchData = getPermission();
    getPermission();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <SafeAreaView style={styles.container}>
      <View>
        <MapView
          style={styles.mapBlock}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          showsUserLocation={true}
        >
          {data.map((item, index) => {
            // console.log("item ======>", item.location[0]);
            return (
              <MapView.Marker
                // onPress={()=>}
                key={index}
                coordinate={{
                  latitude: item.location[1],
                  longitude: item.location[0],
                }}
              />
            );
          })}
        </MapView>
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
    borderWidth: 2,
    borderColor: "tomato",
  },
  mapBlock: {
    borderWidth: 2,
    height: height,
    width: width,
  },
});

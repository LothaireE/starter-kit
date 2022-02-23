import { Text, View } from "react-native";
import { useRoute } from "@react-navigation/core";
import { useEffect, useState } from "react";

// const width = Dimensions.get("window").width;
// const height = Dimensions.get("window").height;

export default function RoomScreen() {
  const { params } = useRoute();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${id}`
      );
      setData(response.data);
      SetIsLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <View>
      <Text>ma page Room</Text>
    </View>
  );
}

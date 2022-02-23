import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Rating = ({ rating }) => {
  let starTab = [];

  for (let i = 0; i < 5; i++) {
    if ([i] < rating) {
      starTab.push(
        <FontAwesome key={i} name="star" size={24} color="#FFB100" />
      );
    } else {
      starTab.push(
        <FontAwesome key={i} name="star" size={24} color="#BCBCBC" />
      );
    }
  }
  return (
    <View>
      <Text>{starTab}</Text>
    </View>
  );
};
export default Rating;

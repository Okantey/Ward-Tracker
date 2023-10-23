import React from "react";
import { View, Text } from "react-native";

export default Header = () => {
  return (
    <View className="w-full px-4 my-8">
      <Text
        style={{ fontFamily: "poppins-bold" }}
        className="text-primary text-2xl text-center"
      >
        WARD TRACKER
      </Text>
    </View>
  );
};

import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default Button = ({ name, onPress }) => {
  return (
    <TouchableOpacity
      className="w-full bg-primary p-3 rounded-md shadow-md"
      onPress={onPress}
    >
      <Text
        style={{ fontFamily: "poppins-bold" }}
        className={`text-center  text-white text-xl `}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

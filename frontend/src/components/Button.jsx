import React from "react";
import { Pressable, Text } from "react-native";

export default Button = ({ name, onPress }) => {
  return (
    <Pressable
      className="w-full flex justify-center items-center bg-primary p-3 rounded-md shadow-md"
      onPress={onPress}
    >
      <Text
        style={{ fontFamily: "poppins-bold" }}
        className={`text-center  text-white text-xl `}
      >
        {name}
      </Text>
    </Pressable>
  );
};

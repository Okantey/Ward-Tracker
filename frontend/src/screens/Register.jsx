import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Header, Button } from "../components";

export default Register = ({ navigation }) => {
  const radioButtonsData = [
    {
      id: "yes",
      label: "child",
      selected: true,
    },
    {
      id: "no",
      label: "parent",
      selected: false,
    },
  ];

  const [selectedRadioButton, setSelectedRadioButton] = useState("yes"); // Default selection
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [indicator, setIndicator] = useState(false);

  const handleRadioButtonPress = (id) => {
    setSelectedRadioButton(id);
  };
  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ fontFamily: "poppins-bold" }} className="text-2xl">
          Welcome Back!
        </Text>
        <Text style={{ fontFamily: "poppins-medium" }} className="text-lg my-4">
          We need to verify a few details to get you up and running
        </Text>

        <View className="w-full">
          <Text
            style={{ fontFamily: "poppins-bold" }}
            className="text-lg py-1 pt-4"
          >
            Full Name
          </Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            className="border border-gray w-full p-4 rounded-xl text-base shadow"
          />
        </View>
        <View className="w-full">
          <Text
            style={{ fontFamily: "poppins-bold" }}
            className="text-lg py-1 pt-4"
          >
            Email
          </Text>
          <TextInput
            className="border border-gray w-full p-4 rounded-xl text-base shadow"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View className="w-full">
          <Text
            style={{ fontFamily: "poppins-bold" }}
            className="text-lg py-1 pt-4"
          >
            Password
          </Text>
          <TextInput
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            className="border border-gray w-full p-4 rounded-xl text-base shadow"
          />
        </View>
        {/* prompt */}
        <Text
          style={{ fontFamily: "poppins-bold" }}
          className="text-lg py-1 pt-4"
        >
          What role do you play?
        </Text>
        <View style={{ flexDirection: "row", marginTop: 12 }}>
          {radioButtonsData.map((radioButton) => (
            <TouchableOpacity
              key={radioButton.id}
              onPress={() => handleRadioButtonPress(radioButton.id)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 24,
              }}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 100,
                  borderWidth: 2,
                  borderColor:
                    selectedRadioButton === radioButton.id ? "#4CE5B1" : "gray",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10,
                }}
              >
                {selectedRadioButton === radioButton.id && (
                  <View
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 100,
                      backgroundColor: "#4CE5B1",
                      borderColor: "#4CE5B1",
                    }}
                  />
                )}
              </View>
              <Text
                style={{ fontFamily: "poppins-medium" }}
                className="text-lg"
              >
                {radioButton.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="my-6">
          <Button name="REGISTER" onPress={() => navigation.navigate("Home")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

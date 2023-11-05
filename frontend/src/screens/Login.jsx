import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Header, Button } from "../components";
import Axios from "../api/Axios";
import { AppContext } from "../context/AppContext";

export default Login = ({ navigation }) => {
  const { setChildData, setParentData } = useContext(AppContext);
  const LOGIN_URL = "/auth/login/";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [indicator, setIndicator] = useState(false);

  const handleSubmit = async () => {
    setIndicator(true);
    try {
      const response = await Axios.post(LOGIN_URL, {
        username: username,
        password: password,
      });
      const fetchedData = response.data;
      const role = fetchedData.data.role;
      setUsername("");
      setPassword("");
      if (role === "child") {
        setChildData(fetchedData);
        navigation.navigate("WardScreen");
      } else {
        setParentData(fetchedData);
        navigation.navigate("ParentScreen");
      }
      console.log(fetchedData);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIndicator(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <StatusBar style="auto" />
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ fontFamily: "poppins-bold" }} className="text-2xl">
          Log into your account
        </Text>
        <View className="w-full">
          <Text
            style={{ fontFamily: "poppins-bold" }}
            className="text-lg py-1 pt-4"
          >
            Username
          </Text>
          <TextInput
            className="border border-gray w-full p-4 rounded-xl text-base shadow"
            value={username}
            autoFocus
            onChangeText={(text) => setUsername(text)}
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

        <View className="my-6">
          <Button
            role="submit"
            name={
              indicator ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                "LOGIN"
              )
            }
            onPress={handleSubmit}
          />
        </View>
        <Text
          className="text-center text-lg"
          style={{ fontFamily: "poppins-regular" }}
        >
          Not a member?{" "}
          <Text
            onPress={() => navigation.navigate("RegisterStack")}
            style={{ fontFamily: "poppins-bold" }}
            className="text-primary"
          >
            Create new account.
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

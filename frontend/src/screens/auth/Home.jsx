import React, { useEffect, useState } from "react";
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";
import { TextInput, View, Image, Text, TouchableOpacity } from "react-native";
import child from "../../../assets/images/student_.png";
import logo from "../../../assets/images/finder.png";
import * as Location from "expo-location";
import { FontAwesome5 } from "@expo/vector-icons";

export default Home = () => {
  const [userLocation, setUserLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const handleUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });
    setUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };
  useEffect(() => {
    handleUserLocation();
  }, [userLocation]);

  return (
    <View className="flex-1 relative">
      <MapView className="w-full h-full" region={userLocation}>
        <Marker coordinate={userLocation} title="Marker">
          <Image source={child} className="w-16 h-16 object-contain" />
        </Marker>
      </MapView>
      <View
        className=" absolute bottom-0 left-0 right-0 shadow-2xl bg-white w-full p-6 flex justify-center items-center"
        style={{ borderTopLeftRadius: 45, borderTopRightRadius: 45 }}
      >
        <View className="flex flex-row w-full items-center border border-gray-300 p-3 rounded-md my-4">
          <FontAwesome5 name="bus" size={30} color="#4CE5B1" />
          <TextInput
            placeholder="Enter bus ID number"
            className="ml-2 w-full"
            style={{ fontFamily: "poppins-regular" }}
          />
        </View>
        <View className="flex flex-row w-full items-center border border-gray-300 p-3 rounded-md mb-4">
          <FontAwesome5 name="child" size={30} color="#4252FF" />
          <TextInput
            placeholder="Enter ward ID number"
            className="ml-2 w-full"
            style={{ fontFamily: "poppins-regular" }}
          />
        </View>
        <TouchableOpacity className=" w-full p-3 bg-primary rounded-xl shadow-md">
          <Text
            className="text-lg text-white text-center"
            style={{ fontFamily: "poppins-bold" }}
          >
            Get Ward Location
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

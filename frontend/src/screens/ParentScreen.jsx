import React, { useEffect, useState, useContext } from "react";
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import {
  TextInput,
  View,
  Image,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import child from "../../assets/images/student_.png";
import * as Location from "expo-location";
import { FontAwesome5 } from "@expo/vector-icons";
import Axios from "../api/Axios";
import { AppContext } from "../context/AppContext";

export default ParentScreen = () => {
  const PARENT_URL = "/parent/child/link/";
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { parentData } = useContext(AppContext);
  const token = parentData.token;

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

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await Axios.post(
        PARENT_URL,
        {
          unique_id: id,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      const newLocation = response.data.data.location;
      const updatedLocation = {
        latitude: newLocation.latitude,
        longitude: newLocation.longitude,
        latitudeDelta: newLocation.latitudeDelta,
        longitudeDelta: newLocation.longitudeDelta,
      };
      setUserLocation(updatedLocation);
      console.log(updatedLocation);
      setId("");
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 relative">
      <MapView className="w-full h-full" region={userLocation}>
        <Marker coordinate={userLocation} title="Marker">
          <Image source={child} className="w-16 h-16 object-contain" />
        </Marker>
      </MapView>
      <View className=" absolute bottom-0 left-0 right-0 shadow-2xl bg-white w-full p-6 flex justify-center items-center">
        <View className="flex flex-row w-full items-center border border-gray-300 p-3 rounded-md mb-4">
          <FontAwesome5 name="child" size={30} color="#4252FF" />
          <TextInput
            placeholder="Enter ward ID number"
            className="ml-2 w-full"
            value={id}
            onChangeText={(text) => setId(text)}
            style={{ fontFamily: "poppins-regular" }}
          />
        </View>
        <Pressable
          onPress={handleSubmit}
          role="button"
          className=" w-full p-3 bg-primary rounded-xl shadow-md"
        >
          {!isLoading ? (
            <Text
              className="text-lg text-white text-center"
              style={{ fontFamily: "poppins-bold" }}
            >
              Get Ward Location
            </Text>
          ) : (
            <ActivityIndicator size="small" color="white" />
          )}
        </Pressable>
      </View>
    </View>
  );
};

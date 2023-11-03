import React, { useEffect, useState } from "react";
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";
import { View, Image } from "react-native";
import child from "../../assets/images/student_.png";
import * as Location from "expo-location";

export default WardScreen = () => {
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
    <View className="flex-1">
      <MapView className="w-full h-full" region={userLocation}>
        <Marker coordinate={userLocation} title="Marker">
          <Image source={child} className="w-16 h-16 object-contain" />
        </Marker>
      </MapView>
    </View>
  );
};

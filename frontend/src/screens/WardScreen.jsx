import React, { useContext, useEffect, useState } from "react";
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Clipboard,
} from "react-native";
import child from "../../assets/images/student_.png";
import * as Location from "expo-location";
import Axios from "../api/Axios";
import { AppContext } from "../context/AppContext";

export default WardScreen = () => {
  const { childData } = useContext(AppContext);
  const token = childData.token;
  const CHILD_URL = "/child/location/";

  const [userLocation, setUserLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [uniqueID, setUniqueID] = useState("");

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
    try {
      const response = await Axios.post(CHILD_URL, userLocation, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const uniqueID = response.data.data.unique_id;
      setUniqueID(uniqueID);
      setModalVisible(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCopyToClipboard = () => {
    Clipboard.setString(uniqueID);
    alert("Unique ID copied to clipboard!");
  };

  useEffect(() => {
    handleUserLocation();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ width: "100%", height: "100%" }} region={userLocation}>
        <Marker coordinate={userLocation} title="Marker">
          <Image source={child} style={{ width: 50, height: 50 }} />
        </Marker>
      </MapView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
            className="flex justify-center items-center"
          >
            <Text style={{ fontFamily: "poppins-bold", fontSize: 20 }}>
              Give this id to your parent
            </Text>
            <Text
              className="text-green-500 text-lg"
              style={{ fontFamily: "poppins-bold", fontSize: 18 }}
            >
              {" "}
              {uniqueID}
            </Text>
            <View className="flex flex-row items-center">
              <TouchableOpacity
                onPress={handleCopyToClipboard}
                className="my-2 mx-2 bg-primary py-2 px-4 rounded"
              >
                <Text
                  style={{
                    fontFamily: "poppins-bold",
                    fontSize: 18,
                    color: "white",
                  }}
                >
                  Copy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-secondary py-2 px-4 rounded-lg"
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text
                  style={{
                    fontFamily: "poppins-bold",
                    fontSize: 18,
                    color: "white",
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

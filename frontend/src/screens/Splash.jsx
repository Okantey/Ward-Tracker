import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Image, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import logo from "../../assets/images/finder.png";
import { useEffect } from "react";

export default Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("RegisterStack");
    }, 2000);
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-primary flex justify-center items-center">
      <StatusBar style="auto" />
      <View className="w-24 h-24 flex justify-center items-center bg-white p-2 rounded-xl">
        <Image source={logo} />
      </View>
      <Text
        className="text-3xl text-white my-4"
        style={{ fontFamily: "poppins-bold" }}
      >
        Ward Tracker
      </Text>
    </SafeAreaView>
  );
};

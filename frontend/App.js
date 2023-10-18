import "react-native-reanimated"
import "react-native-gesture-handler"
import "react-native-safe-area-context"
import * as Font from "expo-font"
import React, { useState, useEffect } from "react"
import MainNavigation from "./src/routes/MainNavigation"
import { ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  const loadFonts = async () => {
    await Font.loadAsync({
      "poppins-regular": require('./assets/fonts/Poppins-Regular.ttf'),
      "poppins-medium": require('./assets/fonts/Poppins-Medium.ttf'),
      "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
    })
    setFontsLoaded(true)
  }
  useEffect(() => {
    loadFonts()
  }, [])
  return (
    fontsLoaded ? <MainNavigation /> : (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#4CE5B1" />
      </SafeAreaView>
    )
  )
}
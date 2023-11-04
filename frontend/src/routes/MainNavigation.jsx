import { NavigationContainer } from "@react-navigation/native";
import { MainStack } from "./StackNavigation";
import { AppProvider } from "../context/AppContext";

export default MainNavigation = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </AppProvider>
  );
};

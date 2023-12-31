import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Splash, Register, ParentScreen, Login, WardScreen } from "../screens";
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="RegisterStack" component={RegisterStack} />
      <Stack.Screen name="WardScreen" component={WardScreen} />
      <Stack.Screen name="ParentScreen" component={ParentScreen} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

const RegisterStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export { MainStack, AuthStack, RegisterStack };

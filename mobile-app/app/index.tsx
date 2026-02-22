import { router } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-800">
      <Text className="text-white text-4xl ">
        Welcome to AlertZone
      </Text>

      <Pressable 
        className="bg-white mt-3 px-6 py-3 rounded-xl"
        onPress={()=>router.push("/home")}>
        <Text className="text-blue-800 font-semibold">
          LogIn
        </Text>
      </Pressable>

    </View>
  );
}
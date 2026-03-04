import { router } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-800">
      <Text className="text-white text-4xl font-bold">
        AlertZone
      </Text>
      <Text className="text-blue-100 text-lg mt-2 text-center px-10">
        Citizen-Driven Safety & Infrastructure Reporting
      </Text>

      {/* This button will now take the user to the login page to start the Firebase check */}
      <Pressable 
        className="bg-white mt-10 px-10 py-4 rounded-2xl shadow-lg"
        onPress={() => router.push("/(auth)/login")}
      >
        <Text className="text-blue-800 font-bold text-lg">
          Get Started
        </Text>
      </Pressable>
    </View>
  );
}
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { emailPasswordLogin } from "@/lib/appwrite"; // ✅ sadece email login

import { useGlobalContext } from "@/lib/global-provider";
import { Redirect, router } from "expo-router";

const SignIn = () => {
  const { refetch, loading, isLogged } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!loading && isLogged) return <Redirect href="/" />;

  const handleEmailLogin = async () => {
    try {
      await emailPasswordLogin(email, password);
      refetch();
    } catch {
      Alert.alert("Login Failed", "Invalid email or password.");
    }
  };



  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full px-10 justify-center">
        <Image
          source={images.onboarding}
          className="w-full h-60"
          resizeMode="contain"
        />

        <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-4">
          Sign In
        </Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          className="border border-gray-300 rounded-md px-4 py-3 mt-6 text-black"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="border border-gray-300 rounded-md px-4 py-3 mt-4 text-black"
        />

        <TouchableOpacity
          onPress={handleEmailLogin}
          className="bg-primary-300 rounded-md py-4 mt-6"
        >
          <Text className="text-white font-rubik-medium text-center text-lg">
            Sign In
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace("/sign-up")}>
          <Text className="text-center text-black-200 mt-6">
            Don’t have an account?{" "}
            <Text className="text-primary-300 font-rubik-medium">Sign up</Text>
          </Text>
        </TouchableOpacity>

        {/* 🔒 Şimdilik gizli ama daha sonra aktif edilecek Google Login */}
        {/*
        <Text className="text-lg font-rubik text-black-200 text-center mt-12">
          Or continue with
        </Text>

        <TouchableOpacity
          onPress={handleGoogleLogin}
          className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
        >
          <View className="flex flex-row items-center justify-center">
            <Image
              source={icons.google}
              className="w-5 h-5"
              resizeMode="contain"
            />
            <Text className="text-lg font-rubik-medium text-black-300 ml-2">
              Continue with Google
            </Text>
          </View>
        </TouchableOpacity>
        */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

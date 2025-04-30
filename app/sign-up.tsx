import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
  } from "react-native";
  import React, { useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { registerUser, emailPasswordLogin } from "@/lib/appwrite";
  import { useGlobalContext } from "@/lib/global-provider";
  import { Redirect, router } from "expo-router";
  
  const SignUp = () => {
    const { refetch, loading, isLogged } = useGlobalContext();
  
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
  
    if (!loading && isLogged) return <Redirect href="/" />;
  
    const handleRegister = async () => {
      try {
        await registerUser(email, password, name);
        await emailPasswordLogin(email, password); // otomatik giriş
        refetch();
        router.replace("/"); // anasayfaya yönlendir
      } catch (error) {
        Alert.alert("Registration Failed", "Check your info or try again.");
      }
    };
  
    return (
      <SafeAreaView className="bg-white h-full">
        <ScrollView contentContainerClassName="h-full px-10 justify-center">
          <Text className="text-3xl font-rubik-bold text-black-300 text-center mb-8">
            Create Account
          </Text>
  
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            className="border border-gray-300 rounded-md px-4 py-3 mt-2 text-black"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-gray-300 rounded-md px-4 py-3 mt-4 text-black"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="border border-gray-300 rounded-md px-4 py-3 mt-4 text-black"
          />
  
          <TouchableOpacity
            onPress={handleRegister}
            className="bg-primary-300 rounded-md py-4 mt-6"
          >
            <Text className="text-white font-rubik-medium text-center text-lg">
              Sign Up
            </Text>
          </TouchableOpacity>
  
          <TouchableOpacity onPress={() => router.replace("/sign-in")}>
            <Text className="text-center text-black-200 mt-6">
              Already have an account?{" "}
              <Text className="text-primary-300 font-rubik-medium">Sign in</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default SignUp;
  
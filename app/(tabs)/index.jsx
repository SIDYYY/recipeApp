import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';

// 20/01/2025 Update - Builded the App 
// 24/01/2025 Update - Add API + Rebuilded

const API_KEY = 'f228514709024550b424b118f5659bcd'; // API KEY from spoonacular API

export default function HomeScreen() {
  const [recipes, setRecipes] = useState([]); // for storing recipes
  const router = useRouter(); 

  useEffect(() => {
    // Fetching recipes from Spoonacular API
    const fetchRecipes = async () => {
      try {
        const response = await fetch(  //sends a GET request to the Spoonacular API using the fetch function.
          `https://api.spoonacular.com/recipes/complexSearch?number=12&addRecipeNutrition=true&apiKey=${API_KEY}`
        );
        const data = await response.json(); //API response is parsed as JSON and stored in the variable data.
        setRecipes(data.results || []); //results property contains the array of recipes. If results is undefined, an empty array ([]) is used as a fallback.

      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes(); 
  }, []); // no dependency array so only run once and that is when the app is opened

  const columns = 2;

  return (
    <View className="flex-1 items-center bg-white">
      <View className="pt-5 p-1 mb-4">
        <Text className="text-center text-lime-800 font-bold text-xs">
          Created by Carl Patrick Daguinotas
        </Text>
        <Text className="text-center text-xs text-lime-700 font-medium">
          BSIT 3R10 - IT323
        </Text>
        <Text className="text-3xl text-center font-extrabold text-green-600 mt-4">
          RECIPE LIST
        </Text>
      </View>

      <FlatList
        data={recipes} // the fetched data from the useEffect
        numColumns={columns} 
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mt-4 items-center rounded-lg p-4 mb-4 w-44 mx-3 border-2 border-gray-700"
            onPress={() => router.push(`/nextPage?recipeId=${item.id}`)}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: '100%', height: 100, borderRadius: 8 }}
            />
            <View className="flex-1 flex-col">
              <Text className="mt-2 pb-5 text-center text-lg font-extrabold text-green-800">
                {item.title}
              </Text>
            </View>
            <Text className="text-center text-sm text-gray-500 mt-1">
              {item.nutrition?.nutrients?.find((n) => n.name === 'Calories')?.amount || 'N/A'} kcal
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

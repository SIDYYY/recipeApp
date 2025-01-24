import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// 20/01/2025 Update - Builded the App 
// 24/01/2025 Update - Add API + Rebuilded

const API_KEY = 'f228514709024550b424b118f5659bcd'; // API KEY from spoonacular API

export default function NextPage() {
  const { recipeId } = useLocalSearchParams(); // Extracting recipe ID from params
  const [recipeDetails, setRecipeDetails] = useState(null);  //for carrying the retrieved data from the API
  const [loading, setLoading] = useState(true); // for the loading page
  const [error, setError] = useState(null); // for the error page

  useEffect(() => { //  useEffect to fetch recipe details from the API whenever the recipeId/ID changes
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch recipe details.'); // will throw an error. If the response is not ok // provide an error
        }
        const data = await response.json(); // If response is ok
        setRecipeDetails(data); // da purpose : to parse the json response and store it in recipeDetails

        // Will retrieve that specific ID from the API and look if that API ID is existing and it will display its informations and etc 

      } catch (err) {
        setError(err.message); // throw an error page when theres an error fetching
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]); // Dependency array - Will rerun the useEffect if recipeId changes

  // Loading Page
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  // Error Page
  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-xl text-red-600">{error}</Text>
      </View>
    );
  }

  // Recipes not found Page 
  if (!recipeDetails) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-xl text-red-600">Recipe not found or deleted.</Text>
      </View>
    );
  }

  // Main recipe page 
  return (
    <ScrollView className="flex-1 bg-white p-6 ">
      {/* Recipe Image */}
      <Image
        source={{ uri: recipeDetails.image }}
        style={{ width: '100%', height: 250, borderRadius: 12, marginBottom: 20 }}
      />

      {/* Recipe Title */}
      <Text className="text-green-600 text-3xl font-extrabold mb-4">{recipeDetails.title}</Text>

      {/* Ingredients */}
      <View className="mb-6">
        <Text className="text-2xl font-semibold text-green-600 mb-2">Ingredients:</Text>
        {recipeDetails.extendedIngredients?.map((ingredient, index) => (
          <Text key={index} className="text-lg text-gray-800">
            • {ingredient.amount} {ingredient.unit} {ingredient.name}
          </Text>
        )) || <Text className="text-lg text-gray-800">No ingredients available.</Text>}
      </View>

      {/* Instructions */}
      <View className='mb-28'>
        <Text className="text-2xl font-semibold text-green-600 mb-2">Instructions:</Text>
        {recipeDetails.analyzedInstructions?.[0]?.steps?.map((step, index) => (
          <Text key={index} className="text-lg text-gray-800 mb-2">
            {index + 1}. {step.step}
          </Text>
        )) || <Text className="text-lg text-gray-800">No instructions available.</Text>}
      </View>
    </ScrollView>
  );
}

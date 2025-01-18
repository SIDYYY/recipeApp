import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, useRouter  } from 'expo-router';
import { recipes } from '../components/datas/recipe';

export default function NextPage() {
  const { recipeId } = useLocalSearchParams(); // Extract recipeId from URL params
  const router = useRouter(); // Access the router for navigation


  const selectedRecipe = recipes.find((recipe) => recipe.id === recipeId);

  if (!selectedRecipe) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100 p-4">
        <Text className="text-xl text-gray-600">Recipe not found or deleted.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-orange-200 p-6">

      <View className="bg-lime-600 rounded-2xl rounded-t-3xl pb-10">
      {/* Recipe Image Section */}
      <Image
        source={{ uri: selectedRecipe.imageUrl }}
        style={{ width: '100%', height: 250, borderRadius: 12, marginBottom: 20, borderTopRightRadius: 22, borderTopLeftRadius: 22 }}
      />
      <Text className="text-white text-3xl font-extrabold  mb-4 px-5">{selectedRecipe.title}</Text>

      {/* Ingredients Section */}
      <View className="mb-6 px-5">
        <Text className="text-2xl font-semibold text-white mb-2 ">Ingredients:</Text>
        <View className="flex-col space-y-2 px-5">
          {selectedRecipe.ingredients.split(',').map((ingredient, index) => (
            <Text key={index} className="text-lg text-white">{ingredient.trim()}</Text>
          ))}
        </View>
      </View>

      {/* Instructions Section */}
      <View>
        <Text className="text-2xl font-semibold text-white mb-2 px-5">Instructions:</Text>
        <View className="flex-col space-y-2 px-5">
          {/* Split the instructions by each step */}
          {selectedRecipe.instructions.split('.').map((step, index) => (
            step.trim() && (
              <Text key={index} className="text-lg text-white px-5">{step.trim()}.</Text>
            )
          ))}
        </View>
      </View>
      </View>
          

    </ScrollView>
  );
}

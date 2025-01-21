import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, useRouter  } from 'expo-router';
import { recipes } from '../components/datas/recipe';

export default function NextPage() {
  const { recipeId } = useLocalSearchParams(); // Extracting recipeId from local params


  const selectedRecipe = recipes.find((recipe) => recipe.id === recipeId);

  if (!selectedRecipe) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100 p-4">
        <Text className="text-xl text-red-600">Recipe not found or deleted.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-6 ">

      <View className="rounded-3xl rounded-t-3xl mb-12 border-2 border-black">
        
      {/* Recipe Image Section */}
      <Image
        source={{ uri: selectedRecipe.imageUrl }}
        style={{ width: '100%', height: 250, borderRadius: 12, marginBottom: 20, borderTopRightRadius: 18, borderTopLeftRadius: 18, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
      />
      <Text className="text-green-600 text-3xl font-extrabold  mb-4 px-5">{selectedRecipe.title}</Text>
      <Text className="text-green-600 text-lg mb-7 px-5 ">{selectedRecipe.description}</Text>

      {/* Ingredients Section */}
      <View className="mb-6 px-6">
        <Text className="text-2xl font-semibold text-green-600 mb-2 ">Ingredients:</Text>
        <View className="flex-col space-y-2 px-7 ">
          {selectedRecipe.ingredients.split(',').map((ingredient, index) => (
            <Text key={index} className="text-lg text-gray-800">{ingredient.trim()}</Text>
          ))}
        </View>
      </View>

      {/* Instructions Section */}
      <View className="pb-10">
        <Text className="text-2xl font-semibold text-green-600 mb-2 px-6">Instructions:</Text>
        <View className="flex-col space-y-2 px-7">
          {/* Split the instructions by each step */}
          {selectedRecipe.instructions.split('.').map((step, index) => (
            step.trim() && (
              <Text key={index} className="text-lg text-gray-800 px-5 ">{step.trim()}.</Text>
            )
          ))}
        </View>
      </View>
      </View>
          

    </ScrollView>
  );
}

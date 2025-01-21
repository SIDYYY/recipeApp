import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { recipes } from '../../components/datas/recipe';

export default function HomeScreen() {
  const router = useRouter();
  const columns = 2;
  return (
    <View className="flex-1 items-center bg-white">
    <View>
      
      <View className="pt-5 p-1 mb-4">
      <Text className="text-center text-lime-800 font-bold text-xs">
          Created by Carl Patrick Daguinotas
        </Text>
        <Text className="text-center text-xs text-lime-700 font-medium">
          BSIT 3R10 - IT323
        </Text>
        <Text className="text-3xl text-center font-extrabold text-green-600 mt-4 ">RECIPE LIST</Text>
      </View>

      <FlatList
        data={recipes}
        numColumns={columns}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mt-4  items-center rounded-lg p-4 mb-4 w-44 mx-3 border-2 border-gray-700 "
            onPress={() => router.push(`/nextPage?recipeId=${item.id}`)} 
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={{ width: '100%', height: 100, borderRadius: 8 }}
            />
            <View className="flex-1 flex-col">
              <Text className="mt-2 pb-5 text-center text-lg font-extrabold text-green-800">{item.title}</Text>
            </View>
            <Text className="text-center text-base">{item.calories} Calories</Text>

          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }} 
      />

      
    </View>
    </View>
  );
}

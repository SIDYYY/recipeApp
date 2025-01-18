import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { recipes } from '../../components/datas/recipe';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center bg-orange-200 ">

  <View className="p-4">
        <Text className="text-3xl font-extrabold text-lime-800 mb-4">RECIPE LIST</Text>
      </View>

      <FlatList
        data={recipes}
        renderItem={({ item }) => (
          <TouchableOpacity
            className=" shadow-sm rounded-lg p-4 mb-4 w-96 flex-row bg-lime-600"
            onPress={() => router.push(`/nextPage?recipeId=${item.id}`)} 
          >
            <Image
        source={{ uri: item.imageUrl }}
        style={{ width: '50%', height: 100, borderRadius: 8, marginRight: 16, aspectRatio: 1}}
      />
          <View className='flex-1 flex-col'>
            <Text className="text-2xl font-extrabold text-white">{item.title}</Text>
            <Text className="text-white text-lg">{item.description}</Text>
          </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false} 

      />
    </View>
  );
}

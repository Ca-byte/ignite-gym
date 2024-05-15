import { ExerciseCard } from "@/components/ExerciseCard";
import { Group } from "@/components/Group";
import { HomeHeader } from "@/components/HomeHeader";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

import { AppNavigatorRoutesProps } from "@/routes/app.route";
import { api } from "@/services/api";
import { AppError } from "@/utils/AppError";
import { FlatList, HStack, Heading, Text, Toast, VStack } from "native-base";

export function Home(){
	const [groups, setGroups] = useState<string[]>([])
	const [exercises, setExercises] = useState(['Front Pull', 'Bent Row', 'Single Row', 'Deadlifts']);
	const [groupSelected, setGroupSelected] = useState('back')

	const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise');
  }

	async function fetchGroups() {
    try {
      const response = await api.get('/groups');
      setGroups(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares';

      Toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  useEffect(() => {
    fetchGroups();
  },[])

	return (
		<VStack flex={1}>
			<HomeHeader />
				<FlatList
					data={groups}
					keyExtractor={item => item}
					renderItem={({ item}) => (
						<Group 
							name={item} 
							isActive={groupSelected.toUpperCase() === item.toUpperCase()}
							onPress={() => setGroupSelected(item)}
						/>
					)}
					horizontal
					showsHorizontalScrollIndicator={false}
					_contentContainerStyle={{ px: 8 }}
					my={10}
					maxH={10}
					minH={10}
				/>
				<VStack px={8}>
					<HStack justifyContent="space-between" mb={5}>
						<Heading 
							color="gray.200" 
							fontSize="md" 
							fontFamily="heading"
						>
							Exercícios
						</Heading>

						<Text color="gray.200" fontSize="sm">
							{exercises.length}
						</Text>
					</HStack>

					<FlatList 
						data={exercises}
						keyExtractor={item => item}
						renderItem={({ item }) => (
							<ExerciseCard  onPress={handleOpenExerciseDetails}/>
						)}
						showsVerticalScrollIndicator={false}
						_contentContainerStyle={{
							paddingBottom: 20
						}}
					/>
      </VStack>
		</VStack>
	)
}
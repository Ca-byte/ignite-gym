import { ExerciseCard } from "@/components/ExerciseCard";
import { Group } from "@/components/Group";
import { HomeHeader } from "@/components/HomeHeader";
import { ExerciseDTO } from "@/dtos/ExerciseDTO";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList, HStack, Heading, Text, Toast, VStack } from "native-base";
import { useCallback, useEffect, useState } from "react";

import { AppNavigatorRoutesProps } from "@/routes/app.route";
import { api } from "@/services/api";
import { AppError } from "@/utils/AppError";

export function Home(){
	const [groups, setGroups] = useState<string[]>([])
	const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
	const [groupSelected, setGroupSelected] = useState('back')

	const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise');
  }

	async function fecthExercisesByGroup() {
    try {
      const response = await api.get(`/exercises/bygroup/${groupSelected}`);
			setExercises(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Unable to load exercises';

      Toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

	async function fetchGroups() {
    try {
      const response = await api.get('/groups');
      setGroups(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Unable to load muscle groups';

      Toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

	useFocusEffect(
    useCallback(() => {
      fecthExercisesByGroup()
    },[groupSelected])
  )

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
						keyExtractor={item => item.id}
						renderItem={({ item }) => (
							<ExerciseCard
							data={item}  
							onPress={handleOpenExerciseDetails}/>
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
import { HistoryCard } from "@/components/HistoryCard";
import { ScreenHeader } from "@/components/ScreenHeader";
import { HistoryByDayDTO } from "@/dtos/HistoryByDayDTO";
import { api } from "@/services/api";
import { AppError } from "@/utils/AppError";
import { useFocusEffect } from "@react-navigation/native";
import { Heading, Text, VStack, useToast } from "native-base";
import { useCallback, useState } from "react";
import { SectionList } from "react-native";

export function History(){
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);
  const toast = useToast();

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const response = await api.get('/history');

      setExercises(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Unable to register exercises details';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory()
    },[])
  )
	return (
		<VStack flex={1}>
      <ScreenHeader title=" Exercise history"/>
      <SectionList 
        sections={exercises}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <HistoryCard />
        )}
        renderSectionHeader={({ section }) => (
          <Heading 
            color="gray.200" 
            fontSize="md" 
            mt={10} 
            mb={3} 
            px={8} 
            fontFamily="heading"
          >
            {section.title}
          </Heading>
        )}
        contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center' }}
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            There are no exercises registered yet. {'\n'}
            Shall we exercise today?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
		</VStack>
	)
}
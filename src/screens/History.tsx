import { useState } from "react";
import { SectionList } from "react-native";
import { HistoryCard } from "@/components/HistoryCard";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Heading, VStack} from "native-base";

export function History(){
	const [exercises, setExercises] = useState([
    {
      title: '26.08.22',
      data: ["Front Pull", "One-Sided Row"]
    },
    {
      title: '27.08.22',
      data: ["Pushups"]
    }
  ]);
	return (
		<VStack flex={1}>
		<ScreenHeader title=" Exercise history"/>
		<SectionList 
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <HistoryCard />
        )}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3} px={8}>
            {section.title}
          </Heading>
        )}
        
      />
		</VStack>
	)
}
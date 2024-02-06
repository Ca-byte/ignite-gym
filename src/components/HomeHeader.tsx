import { HStack, Heading, Text, VStack } from "native-base";

export function HomeHeader(){
	return(
		<HStack>
			<VStack>
			<Text color="gray.100"> Hi</Text>
			<Heading color="gray.100">
				Caroline
			</Heading>
			</VStack>
		</HStack>
	)
}
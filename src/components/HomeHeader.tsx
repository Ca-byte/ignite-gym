import { HStack, Heading, Text, VStack } from "native-base";

export function HomeHeader(){
	return(
		<HStack bg="gray.600" pt={16} pb={5} alignItems="center">
			<VStack>
			<Text color="gray.100" fontSize="md">
				 Hi
			</Text>
			<Heading color="gray.100" fontSize="md">
				Caroline
			</Heading>
			</VStack>
		</HStack>
	)
}
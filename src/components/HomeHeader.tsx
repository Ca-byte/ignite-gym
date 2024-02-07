import { HStack, Heading, Text, VStack } from "native-base";
import { UserPhoto } from "./UserPhoto";

export function HomeHeader(){
	return(
		<HStack bg="gray.600" pt={16} pb={5} alignItems="center">
			<UserPhoto 
			source={{ uri: 'https://github.com/Ca-byte.png'}}
			alt="User Image Profile"
			size={16}
			mr={4}
			/>
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
import { MaterialIcons } from "@expo/vector-icons";
import { HStack, Heading, Icon, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { UserPhoto } from "./UserPhoto";

export function HomeHeader(){
	return(
		<HStack 
			bg="gray.600" 
			pt={16} 
			pb={5} 
			px={4} 
			alignItems="center"
		>
			<UserPhoto 
				source={{ uri: 'https://github.com/Ca-byte.png'}}
				alt="User Image Profile"
				size={16}
				mr={4}
			/>
			<VStack flex={1}>
			<Text color="gray.100" fontSize="md">
				 Hi
			</Text>
			<Heading 
				color="gray.100" 
				fontSize="md" 
				fontFamily="heading"
			>
				Caroline
			</Heading>
			</VStack>
			<TouchableOpacity>
				<Icon 
					as={MaterialIcons}
					name="logout"
					color="gray.200"
					size={7}
				/>
			</TouchableOpacity>
		</HStack>
	)
}
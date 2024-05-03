import { useAuth } from "@/hooks/useAuth";
import { MaterialIcons } from "@expo/vector-icons";
import { HStack, Heading, Icon, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { UserPhoto } from "./UserPhoto";

import defaulUserPhotoImg from '@assets/userPhotoDefault.png';

export function HomeHeader(){
	const { user, signOut } = useAuth();
	return(
		<HStack 
			bg="gray.600" 
			pt={16} 
			pb={5} 
			px={4} 
			alignItems="center"
		>
			<UserPhoto 
				 source={user.avatar  ? { uri: user.avatar } : defaulUserPhotoImg}
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
				{user.name}
			</Heading>
			</VStack>
			<TouchableOpacity onPress={signOut}>
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
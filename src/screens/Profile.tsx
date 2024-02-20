import { ScreenHeader } from "@/components/ScreenHeader";
import { UserPhoto } from "@/components/UserPhoto";
import { Center, ScrollView, Text, VStack } from "native-base";

export function Profile(){
	return (
		<VStack>
		<ScreenHeader title="Profile" />
		<ScrollView>
			<Center mt={6} px={10}>
			<UserPhoto 
				source={{ uri: 'https://github.com/Ca-byte.png'}}
				alt="User Image Profile"
				size={33}
			/>
			</Center>
		</ScrollView>
		</VStack>
	)
}
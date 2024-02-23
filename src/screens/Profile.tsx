import { ScreenHeader } from "@/components/ScreenHeader";
import { UserPhoto } from "@/components/UserPhoto";
import { Center, ScrollView, VStack, Skeleton, Text } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

const PHOTO_SIZE = 33;

export function Profile(){
	const [isPhotoLoaded, setIsPhotoLoaded]= useState(false)
	return (
		<VStack>
			<ScreenHeader title="Profile" />
			<ScrollView>
				<Center mt={6} px={10}>
					{ isPhotoLoaded ?
						<Skeleton 
							w={PHOTO_SIZE} 
							h={PHOTO_SIZE} 
							rounded="full" 
							startColor="gray.400"
							endColor="green.500"
						/> :
						<UserPhoto 
							source={{ uri: 'https://github.com/Ca-byte.png'}}
							alt="User Image Profile"
							size={PHOTO_SIZE}
						/>
					}
					<TouchableOpacity>
						<Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
							Change Photo
						</Text>

					</TouchableOpacity>
				</Center>
			</ScrollView>
		</VStack>
	)
}
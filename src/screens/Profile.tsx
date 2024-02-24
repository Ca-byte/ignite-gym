import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { ScreenHeader } from "@/components/ScreenHeader";
import { UserPhoto } from "@/components/UserPhoto";
import { Center, ScrollView, VStack, Skeleton, Text, Heading} from "native-base";
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
					<Input 
						bg="gray.600"
						placeholder="Name"
					/>
					<Input 
						bg="gray.600"
						placeholder="E-mail"
						isDisabled
					/>
				</Center>
				<VStack px={10} mt={12} mb={9}>
          <Heading color="gray.200" fontSize="md" mb={2}>
						Change Password
          </Heading>

          <Input 
            bg="gray.600"
            placeholder="Old password"
            secureTextEntry
          />

          <Input 
            bg="gray.600"
            placeholder="New password"
            secureTextEntry
          />

          <Input 
            bg="gray.600"
            placeholder="Confirm new password"
            secureTextEntry
          />

          <Button title="Update" mt={4} />
        </VStack>
			</ScrollView>
		</VStack>
	)
}
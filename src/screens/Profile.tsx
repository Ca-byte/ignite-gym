import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { ScreenHeader } from "@/components/ScreenHeader";
import { UserPhoto } from "@/components/UserPhoto";
import { useAuth } from "@/hooks/useAuth";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from "native-base";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";

const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  oldPassword: string;
  newPassword: string;
}

export function Profile(){
	const [isPhotoLoaded, setIsPhotoLoaded]= useState(false);
	const [ usePhoto, setUserPhoto]= useState('https://github.com/Ca-byte.png');

	const toast = useToast();
	const { user } = useAuth();
	const { control } = useForm<FormDataProps>({ defaultValues: { 
		name: user.name,
		email: user.email
	} });
	
	async function handleUserPhothSelected() {


		const photoSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
    });

    if(photoSelected.canceled) {
      return;
    }
		if(photoSelected.assets[0].uri) {
			const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);
			console.log(photoInfo);

		setUserPhoto(photoSelected.assets[0].uri);
		if (photoInfo.exists && (photoInfo.size / 1024 / 1024 > 5)) {
			return toast.show({
				title: 'This image is very large. Choose one up to 5 MB.',
				placement: 'top',
				bgColor: 'red.500'
			})
		}
		
  	}
	}
		
	return (
		<VStack>
			<ScreenHeader title="Profile" />
			<ScrollView contentContainerStyle={{ paddingBottom: 36}}>
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
							source={{ uri: usePhoto}}
							alt="User Image Profile"
							size={PHOTO_SIZE}
						/>
					}
					<TouchableOpacity onPress={handleUserPhothSelected}>
						<Text 
							color="green.500" 
							fontWeight="bold" 
							fontSize="md" 
							mt={2} 
							mb={8}
						>
							Change Photo
						</Text>
					</TouchableOpacity>
					 <Controller 
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input 
                bg="gray.600" 
                placeholder='Nome'
                onChangeText={onChange}
                value={value}
              />
            )}
          />
					 <Controller 
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input 
                bg="gray.600" 
                placeholder="E-mail"
                isDisabled
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Heading 
						color="gray.200" 
						fontSize="md" 
						mb={2} 
						alignSelf="flex-start" 
						mt={12}
						fontFamily="heading"
					>
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
        </Center>
			</ScrollView>
		</VStack>
	)
}
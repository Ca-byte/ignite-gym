import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { ScreenHeader } from "@/components/ScreenHeader";
import { UserPhoto } from "@/components/UserPhoto";
import { useAuth } from "@/hooks/useAuth";
import { yupResolver } from '@hookform/resolvers/yup';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from "native-base";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import * as yup from 'yup';

const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  email?: string;
  password?: string;
  old_password?: string;
  confirm_password?: string;
}

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome'),

})

export function Profile(){
	const [isPhotoLoaded, setIsPhotoLoaded]= useState(false);
	const [ usePhoto, setUserPhoto]= useState('https://github.com/Ca-byte.png');

	const toast = useToast();
	const { user } = useAuth();
	 const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({ 
    defaultValues: { 
      name: user.name,
      email: user.email
    },
    resolver: yupResolver(profileSchema) 
  });
	
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
	async function handleProfileUpdate(data: FormDataProps) {
    console.log(data);
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
								 errorMessage={errors.name?.message}
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

					<Controller 
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
							<Input 
							bg="gray.600"
							placeholder="Old password"
							secureTextEntry
						/>
            )}
          />
         
				 <Controller 
            control={control}
            name="email"
            render={({ field: {onChange } }) => (
						<Input 
							bg="gray.600"
							placeholder="New password"
							secureTextEntry
							errorMessage={errors.password?.message}
						/>
            )}
          />	
					<Controller 
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
							<Input 
							bg="gray.600"
							placeholder="Confirm new password"
							secureTextEntry
							errorMessage={errors.confirm_password?.message}
						/>
            )}
          />	
          <Button 
					title="Update"
					mt={4}
					onPress={handleSubmit(handleProfileUpdate)} 
					/>
        </Center>
			</ScrollView>
		</VStack>
	)
}
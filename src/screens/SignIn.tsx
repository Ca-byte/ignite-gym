
import BackgroundImg from '@/assets/background.png';
import LogoSvg from '@/assets/logo.svg';
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useNavigation } from "@react-navigation/native";
import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";

import { AuthNavigatorRoutesProps } from "@/routes/auth.routes";

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

type FormDataProps = {
  email: string;
  password: string;
}

const signInSchema = yup.object({
  email: yup.string().required('Inform e-mail').email('Invalid E-mail'),
  password: yup.string().required('Inform password').min(6, 'The password must be at least 6 digits long.'),
});

export function SignIn(){

	const navigation = useNavigation<AuthNavigatorRoutesProps>();
	const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  });

	function handleNewAccount(){
		navigation.navigate('signUp');
	}

	function HandleSignIn({ email, password}: FormDataProps){
		console.log(email, password)

	}
	
	return(
		<ScrollView 
		contentContainerStyle={{ flexGrow: 1}} 
		showsVerticalScrollIndicator={false}
		>
			<VStack flex={1} px={10} pb={16}>
				<Image 
					source={BackgroundImg} 
					defaultSource={BackgroundImg}
					alt="People training" 
					resizeMode="contain"
					position="absolute"
				/>
				<Center my={24}>
					<LogoSvg />
					<Text color='gray.100' fontSize="sm">
						Train your mind and body
					</Text>
				</Center>
				<Center>
					<Heading color="gray.100" fontSize="xl" fontFamily="heading" mb={6}>
						Access your account 
					</Heading>

					<Controller 
					control={control}
					name="email"
					render={(
						{ field : {onChange, value}}
					)=> (
						<Input 
							placeholder='Email'
							keyboardType="email-address"
							autoCapitalize="none"
							onChangeText={onChange}
							value={value}
							errorMessage={errors.email?.message}
						/>
					)}
					/>
					<Controller 
						control={control}
						name="password"
						render={(
							{ field : {onChange, value}}
						)=> (
						<Input 
							placeholder='Password'
							secureTextEntry
							onChangeText={onChange}
							value={value}
							errorMessage={errors.password?.message}
						/>
					)}
					/>

					<Button
						title="Access"
						onPress={handleSubmit(HandleSignIn)}
					/>
				</Center>

				<Center mt={24}>
					<Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
						Don't have access yet?
					</Text>

					<Button 
						variant="outline"
						title="Create account"
						onPress={handleNewAccount}
					/>
				</Center>
			</VStack>
		</ScrollView>
	)
}
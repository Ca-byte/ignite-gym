import BackgroundImg from '@/assets/background.png';
import LogoSvg from '@/assets/logo.svg';
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/services/api';
import { AppError } from '@/utils/AppError';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from "@react-navigation/native";
import { Center, Heading, Image, ScrollView, Text, VStack, useToast } from "native-base";
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const signUpSchema = yup.object({
  name: yup.string().required('Inform name'),
  email: yup.string().required('Inform e-mail').email('Invalid E-mail'),
  password: yup.string().required('Inform password').min(6, 'The password must be at least 6 digits long.'),
  confirm_password: yup.string().required('Confirm your password').min(6, 'The password must be at least 6 digits long.').oneOf([yup.ref('password')], 'Passwords must match'),
});

export function SignUp(){
	const [isLoading, setIsLoading] = useState(false);

	const toast = useToast();
	const { singIn } = useAuth();

	const navigation = useNavigation();
	const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

	function handleGoBack(){
		navigation.goBack();
	}

	async function handleSignUp({ name, email, password }: FormDataProps) {
		try {
      setIsLoading(true)
			
      await api.post('/users', { name, email, password });
      await singIn(email, password)

    } catch (error) {
			setIsLoading(false);

      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Unable to create account. Try again later';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
		}
	}

	return (
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
					<Heading 
						color="gray.100" 
						fontSize="xl" 
						fontFamily="heading" 
						mb={6}
					>
						Create your account 
					</Heading>

					<Controller
						control={control}
						name="name"
						render={(
							{ field : {onChange, value}}
						)=> (
							<Input 
								placeholder='Name'
								onChangeText={onChange}
								value={value}
								errorMessage={errors.name?.message}
							/>
					)}
					 />
			
					<Controller 
						control={control}
						name="email"
						render={(
							{ field : {onChange, value}}
						)=> (
							<Input 
								placeholder="E-mail"
								keyboardType='email-address'
								autoCapitalize='none'
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
								placeholder="Password"
								secureTextEntry
								onChangeText={onChange}
								value={value}
								errorMessage={errors.password?.message}
							/>
						)}
				 	/>
					<Controller 
						control={control}
						name="confirm_password"
						render={(
							{ field : {onChange, value}}
						)=> (
							<Input 
								placeholder="Confirm Password"
								secureTextEntry
								onChangeText={onChange}
								value={value}
								returnKeyType='send'
								onSubmitEditing={handleSubmit(handleSignUp)}
								errorMessage={errors.confirm_password?.message}
							/>
						)}
				 	/>
				
					<Button
						title="Create and access"
						onPress={handleSubmit(handleSignUp)}
						isLoading={isLoading}
					/>
				</Center>

					<Button mt={12}
						variant="outline"
						title="Back to login"
						onPress={handleGoBack}
					/>
			</VStack>
		</ScrollView>
	)
}
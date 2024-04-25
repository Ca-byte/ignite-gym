
import BackgroundImg from '@/assets/background.png';
import LogoSvg from '@/assets/logo.svg';
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useNavigation } from "@react-navigation/native";
import { Center, Heading, Image, ScrollView, Text, VStack, useToast } from "native-base";

import { useAuth } from '@/hooks/useAuth';
import { AuthNavigatorRoutesProps } from "@/routes/auth.routes";
import { AppError } from '@/utils/AppError';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

type FormDataProps = {
  email: string;
  password: string;
}

const signInSchema = yup.object({
  email: yup.string().required('Inform an e-mail').email('Invalid E-mail'),
  password: yup.string().required('Inform a password').min(6, 'The password must have at least 6 digits long.'),
});

export function SignIn(){
	const { singIn } = useAuth()
	const toast = useToast();

	const navigation = useNavigation<AuthNavigatorRoutesProps>();
	const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  });

	function handleNewAccount(){
		navigation.navigate('signUp');
	}

	async function handleSignIn({ email, password }: FormDataProps) {
    try {
      await singIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title =  isAppError ? error.message : 'Unable to enter. Try again later.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
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
					<Heading 
						color="gray.100" 
						fontSize="xl" 
						fontFamily="heading" 
						mb={6}
					>
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
						onPress={handleSubmit(handleSignIn)}
					/>
				</Center>

				<Center mt={24}>
					<Text 
						color="gray.100" 
						fontSize="sm" 
						mb={3} 
						fontFamily="body"
					>
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
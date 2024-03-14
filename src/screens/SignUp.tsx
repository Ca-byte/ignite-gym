
import BackgroundImg from '@/assets/background.png';
import LogoSvg from '@/assets/logo.svg';
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useNavigation } from "@react-navigation/native";
import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";
import { Controller, useForm } from 'react-hook-form';

export function SignUp(){
	const navigation = useNavigation();
	const { control, handleSubmit } = useForm()


	function handleGoBack(){
		navigation.goBack();
	}

	function HandleSignUp(data: any){
		console.log(data)
		
	
	
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
					<Text color='gray.100' fontSize="sm">Train your mind and body</Text>
				</Center>
				<Center>
					<Heading color="gray.100" fontSize="xl" fontFamily="heading" mb={6}>
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
								onSubmitEditing={handleSubmit(HandleSignUp)}
								returnKeyType='send'
							/>
						)}
				 	/>
				
					<Button
						title="Create and access"
						onPress={handleSubmit(HandleSignUp)}
					/>
				</Center>

					<Button mt={24}
						variant="outline"
						title="Back to login"
						onPress={handleGoBack}
					/>
					
			</VStack>
		</ScrollView>
	)
}
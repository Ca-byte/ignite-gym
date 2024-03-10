
import BackgroundImg from '@/assets/background.png';
import LogoSvg from '@/assets/logo.svg';
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useNavigation } from "@react-navigation/native";
import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";
import { useState } from "react";

export function SignUp(){
	const navigation = useNavigation();
	const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');


	function handleGoBack(){
		navigation.goBack();
	}

	function HandleSignUp(){
		console.log({
			name,
      email,
      password,
      passwordConfirm
		})
	
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
					<Heading color="gray.100" fontSize="xl" fontFamily="heading">
						Create your account 
					</Heading>

					<Input 
						placeholder='Name'
						onChangeText={setName}
					/>

					<Input 
						placeholder='Email'
						keyboardType="email-address"
						autoCapitalize="none"
						onChangeText={setEmail}

					/>
					<Input 
						placeholder='Password'
						secureTextEntry
						onChangeText={setPassword}
					/>
					<Input 
						placeholder='Confirm Password'
						secureTextEntry
						onChangeText={setPasswordConfirm}
					/>
					
					<Button
						title="Create and access"
						onPress={HandleSignUp}
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
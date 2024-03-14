
import BackgroundImg from '@/assets/background.png';
import LogoSvg from '@/assets/logo.svg';
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useNavigation } from "@react-navigation/native";
import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";

import { AuthNavigatorRoutesProps } from "@/routes/auth.routes";
export function SignIn(){

	const navigation = useNavigation<AuthNavigatorRoutesProps>();

	function handleNewAccount(){
		navigation.navigate('signUp');
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

					<Input 
						placeholder='Email'
						keyboardType="email-address"
						autoCapitalize="none"

					/>
					<Input 
						placeholder='Password'
						secureTextEntry
					/>

					<Button
						title="Access"
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
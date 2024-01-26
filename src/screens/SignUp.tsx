
import { Center, Image, Text, VStack, Heading, ScrollView } from "native-base";
import BackgroundImg from '@/assets/background.png';
import LogoSvg from '@/assets/logo.svg'
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export function SignUp(){
	return(
		<ScrollView 
		contentContainerStyle={{ flexGrow: 1}} 
		showsVerticalScrollIndicator={false}
		>
			<VStack flex={1} px={10} pb={16}>
				<Image 
					source={BackgroundImg} 
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
					/>

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
						title="Create and access"
					/>
				</Center>

					<Button mt={24}
						variant="outline"
						title="Back to login"
					/>
					
			</VStack>
		</ScrollView>
	)
}
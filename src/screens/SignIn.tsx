
import { Center, Image, Text, VStack } from "native-base";
import BackgroundImg from '@/assets/background.png';
import LogoSvg from '@/assets/logo.svg'

export function SignIn(){
	return(
		<VStack flex={1} bg="gray.700">
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
		</VStack>
	)
}
import { SignIn } from '@/screens/SignIn';
import { SignUp } from '@/screens/SignUp';
import { createNativeStackNavigator } from '@react-navigation/native-stack'



const { Navigator, Screen } = createNativeStackNavigator();


export function AuthRoutes(){
	return(
		<Navigator>
			<Screen 
			name="signIn"
			component={SignIn}
			/>
			<Screen 
			name="signUn"
			component={SignUp}
			/>
		</Navigator>
	)

}
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Box, useTheme } from "native-base";

import { useAuth } from '@/hooks/useAuth';

import { AuthRoutes } from "./auth.routes";

export function Routes(){
	const { colors } = useTheme();

	const theme = DefaultTheme;
	
	const { user } = useAuth();

	theme.colors.background = colors.gray[700];

  console.log("USUÁRIO LOGADO =>", user);
	
	return(
		<Box flex={1} bg="gray.700">
			<NavigationContainer theme={theme}>
				<AuthRoutes />
			</NavigationContainer>
		</Box>
	)
}
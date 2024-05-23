import { AppNavigatorRoutesProps } from "@/routes/app.route";
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, HStack, Heading, Icon, Image, ScrollView, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";

import RepetitionsSvg from '../assets/repetitions.svg';
import SeriesSvg from '../assets/series.svg';

import { Button } from "@/components/Button";
import BodySvg from '../assets/body.svg';

type RouteParamsProps = {
  exerciseId: string;
}

export function Exercise(){

	const navigation = useNavigation<AppNavigatorRoutesProps>()

	const route = useRoute();

  const { exerciseId } = route.params as RouteParamsProps;

	function handleGoBack(){
		navigation.goBack()
	}

	return (
		<VStack flex={1}>
			<ScrollView>
				<VStack px={8} bg="gray.600" pt={12}>
					<TouchableOpacity onPress={handleGoBack}>
						<Icon 
							as={Feather} 
							name="arrow-left" 
							color="green.500" 
							size={6}
						/>
					</TouchableOpacity>

					<HStack 
						justifyContent="space-between" 
						mt={4} 
						mb={8} 
						alignItems="center"
					>
						<Heading 
							color="gray.100" 
							fontSize="lg" 
							flexShrink={1}
							fontFamily="heading"
						>
							Front Pull
						</Heading>
						<HStack alignItems="center">
							<BodySvg />
							<Text 
								color="gray.200" 
								ml={1} 
								textTransform="capitalize"
							>
								Back
							</Text>
						</HStack>
					</HStack>
				</VStack>
					<VStack p={8}>
					<Image
						w="full"
						h={80}
						source={{ uri: 'http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg' }}
						alt="Exercise Image"
						mb={3}
						resizeMode="cover"
						rounded="lg"
						/>
					</VStack>

				<Box bg="gray.600" rounded="md" pb={4} px={4}>
					<HStack 
						alignItems="center" 
						justifyContent="space-around" 
						mb={6} 
						mt={5}
					>
						<HStack>
							<SeriesSvg />
							<Text color="gray.200" ml="2">
								3 series
							</Text>
						</HStack>

						<HStack>
							<RepetitionsSvg />
							<Text color="gray.200" ml="2">
								12 repetitions
							</Text>
						</HStack>
					</HStack>

					<Button 
						title="Well Done!"
					/>
				</Box>
			</ScrollView>
		</VStack>

	)
}
import { Group } from "@/components/Group";
import { HomeHeader } from "@/components/HomeHeader";
import { HStack, VStack } from "native-base";
import { useState } from "react";

export function Home(){
	const [groupSelected, setGroupSelected] = useState('back')
	return (
		<VStack flex={1}>
			<HomeHeader />
			<HStack>
				<Group 
					name="back" 
					isActive={groupSelected === "back"}
					onPress={() => setGroupSelected('back')}
				/>
				<Group 
				name="shoulders" 
				isActive={groupSelected === "shoulders"}
				onPress={() => setGroupSelected("shoulders")}
				/>
			</HStack>
		</VStack>
	)
}
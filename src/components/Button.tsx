import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base'

type Props = IButtonProps & {
	title: string;
}

export function Button({title, ...rest}: Props){
	return(
		<ButtonNativeBase
		w='full'
		h={14}
		bg="green.700"
		_pressed={{
			bg:"green.500"
		}}
		{...rest}
		>
			<Text 
				color="white" 
				fontFamily="heading" 
				fontSize="sm"
				rounded="sm"
			>
				{title}
			</Text>
		</ButtonNativeBase>
	)
}
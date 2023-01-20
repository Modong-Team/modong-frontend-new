import styled from 'styled-components';
import { CustomButtonProps, CustomButtonType } from '../../@types/client/dep';
import { ButtonTypes } from '../../constants/buttons';
import {
	ButtonStyles,
	LineButtonColors,
	PrimaryButtonColors,
	RedButtonColors,
	SecondaryButtonColors,
} from '../../styles/buttons';

export default function CustomButton({
	label = '버튼',
	onClick,
	buttonSize,
	buttonType,
}: CustomButtonProps) {
	return (
		<S.Button buttonSize={buttonSize} buttonType={buttonType} onClick={onClick}>
			{label}
		</S.Button>
	);
}

namespace S {
	export const Button = styled.button<CustomButtonType>`
		transition: 0.3s ease;
		${(props) => ButtonStyles[props.buttonSize]}

		${(props) => props.buttonType === ButtonTypes.primary && PrimaryButtonColors.active}
		${(props) => props.buttonType === ButtonTypes.secondary && SecondaryButtonColors.active}
		${(props) => props.buttonType === ButtonTypes.red && RedButtonColors.active}
		${(props) => props.buttonType === ButtonTypes.line && LineButtonColors.active}

    &:hover {
			${(props) => props.buttonType === ButtonTypes.primary && PrimaryButtonColors.hover}
			${(props) => props.buttonType === ButtonTypes.secondary && SecondaryButtonColors.hover}
      ${(props) => props.buttonType === ButtonTypes.red && RedButtonColors.hover}
      ${(props) => props.buttonType === ButtonTypes.line && LineButtonColors.hover}
		}

		&:active {
			${(props) => props.buttonType === ButtonTypes.primary && PrimaryButtonColors.pressed}
			${(props) => props.buttonType === ButtonTypes.secondary && SecondaryButtonColors.pressed}
      ${(props) => props.buttonType === ButtonTypes.red && RedButtonColors.pressed}
      ${(props) => props.buttonType === ButtonTypes.line && LineButtonColors.pressed}
		}

		&:disabled {
			${(props) => props.buttonType === ButtonTypes.primary && PrimaryButtonColors.disabled}
			${(props) => props.buttonType === ButtonTypes.secondary && SecondaryButtonColors.disabled}
      ${(props) => props.buttonType === ButtonTypes.red && RedButtonColors.disabled}
      ${(props) => props.buttonType === ButtonTypes.line && LineButtonColors.disabled}
		}
	`;
}
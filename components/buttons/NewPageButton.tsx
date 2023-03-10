import styled from 'styled-components';
import { Colors } from '../../styles/colors';
import { Devices } from '../../styles/devices';
import { Fonts } from '../../styles/fonts';
import { svgPrev, svgNext } from '../../styles/svgs';

export default function NewPageButton({
	label,
	onClick,
	isLeft,
	isRight,
	isHidden,
	disabled,
}: NewPageButtonProps) {
	return (
		<S.Button onClick={onClick} isHidden={isHidden} disabled={disabled}>
			{isLeft && svgPrev}
			{label}
			{isRight && svgNext}
		</S.Button>
	);
}

namespace S {
	export const Button = styled.button<IsHiddenType>`
		${Fonts.button14bold}
		padding: 1.4rem 2rem;
		display: flex;
		align-items: center;
		gap: 0.48rem;
		border-radius: 0.8rem;
		border: 0.1rem solid ${Colors.gray200};
		background-color: ${Colors.white};
		visibility: ${(props) => (props.isHidden ? 'hidden' : '')};

		:disabled {
			background-color: ${Colors.gray300};
			border-color: ${Colors.gray400};
			color: ${Colors.white};
			cursor: default;

			path {
				fill: ${Colors.white};
				stroke: ${Colors.white};
			}
		}

		> svg {
			position: relative;
			width: 0.7rem;
		}

		@media ${Devices.mobile} {
			${Fonts.button16bold}
		}
	`;
}

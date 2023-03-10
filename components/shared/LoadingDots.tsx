import Lottie from 'react-lottie';
import LoadingLottieBlue from '../../public/assets/loadingBlue.json';
import LoadingLottieWhite from '../../public/assets/loadingWhite.json';
import styled from 'styled-components';
import { LoadingDotsProps } from '../../@types/client';
import { LoadingWidths } from '../../constants/loadingWidths';
import useMobile from '../../hooks/useMobile';

export default function LoadingDots({ width, isWhite, isHidden }: LoadingDotsProps) {
	const isMobile = useMobile();

	const options = {
		loop: true,
		autoplay: true,
		animationData: isWhite ? LoadingLottieWhite : LoadingLottieBlue,
	};

	return (
		<S.Container isHidden={isHidden}>
			<Lottie
				options={options}
				width={width === LoadingWidths.fullscreen && isMobile ? LoadingWidths.mobile : width}
				isClickToPauseDisabled={true}
			/>
		</S.Container>
	);
}

namespace S {
	export const Container = styled.div<IsHiddenType>`
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		visibility: ${(props) => props.isHidden && 'hidden'};
		opacity: ${(props) => (props.isHidden ? 0 : 1)};
		transition: 1s ease;

		> div {
			display: flex;
		}
	`;
}

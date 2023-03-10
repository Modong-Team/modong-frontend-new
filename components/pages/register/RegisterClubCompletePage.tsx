import styled from 'styled-components';
import { Colors } from '../../../styles/colors';
import { Fonts } from '../../../styles/fonts';
import { Icons } from '../../../styles/icons';
import { svgCopy24 } from '../../../styles/svgs';
import copyToClipBoard from '../../../utils/copyToClipBoard';
import useSnackBar from '../../../hooks/useSnackBar';
import SnackBar from '../../shared/SnackBar';
import CustomButton from '../../buttons/CustomButton';
import { ButtonTypes, ButtonSizes } from '../../../constants/buttons';
import useRouteToPath from '../../../hooks/useRouteToPath';
import { Paths } from '../../../constants/paths';
import useMobile from '../../../hooks/useMobile';
import { Devices } from '../../../styles/devices';

export default function RegisterClubCompletePage({ clubId }: RegisterClubCompletePageProps) {
	const isMobile = useMobile();
	const { isShowSnackBar, onTriggerSnackBar } = useSnackBar();
	const onRouteToRegisterMember = useRouteToPath(Paths.registerMember + '/' + clubId);

	const onClickClipBoard = () => {
		copyToClipBoard(clubId);
		onTriggerSnackBar();
	};

	return (
		<S.Container>
			<h1>
				{Icons.hands}
				<br />
				동아리 등록이 완료되었어요.
			</h1>
			<div>
				<S.ClipBoard onClick={onClickClipBoard}>
					<div>동아리 코드</div>
					<div>{clubId}</div>
					<div>{svgCopy24}</div>
				</S.ClipBoard>
				<p>
					지금 회원 가입 하지 않으신다면{isMobile ? <br /> : ' '}동아리 코드를 "꼭!" 따로
					보관해주세요.
					<br />
					<span>동아리 코드가 없으면 회원가입 하실 수 없어요.</span>
				</p>
				<SnackBar
					label={'동아리 코드를 복사했어요.'}
					width='100%'
					bottom='-2.3rem'
					isShown={isShowSnackBar}
				/>
			</div>
			<div>
				<CustomButton
					label={'운영진 회원가입'}
					onClick={onRouteToRegisterMember}
					buttonType={ButtonTypes.primary}
					buttonSize={ButtonSizes.large}
				/>
			</div>
		</S.Container>
	);
}

namespace S {
	export const Container = styled.div`
		> h1 {
			${Fonts.heading24bold}
			margin-bottom: 6rem;
			text-align: center;
		}

		> div {
			position: relative;

			> p {
				${Fonts.subtitle14medium}
				color: ${Colors.gray700};
				text-align: center;
				padding-top: 1.6rem;
				margin-bottom: 4rem;

				> span {
					${Fonts.button14bold}
					color: ${Colors.red900};
				}
			}
		}

		> div:last-of-type {
			background-color: ${Colors.white};
			border-radius: 1rem 1rem 0 0;
			padding-bottom: 10rem;
			z-index: 150;

			> button {
				width: 100%;
			}
		}
	`;

	export const ClipBoard = styled.div`
		padding: 2.4rem;
		background-color: ${Colors.blue100};
		border-radius: 0.8rem;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		column-gap: 1.6rem;
		align-items: center;
		cursor: pointer;

		> div {
			:first-of-type {
				${Fonts.button14bold}
				color: ${Colors.gray800};

				@media ${Devices.mobile} {
					word-break: keep-all;
				}
			}

			:nth-of-type(2) {
				${Fonts.heading26bold}
			}

			:last-of-type {
				display: flex;
				margin-left: auto;
			}
		}
	`;
}

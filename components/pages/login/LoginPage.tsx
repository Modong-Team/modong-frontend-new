import styled from 'styled-components';
import { Colors } from '../../../styles/colors';
import { Fonts } from '../../../styles/fonts';
import { svgLogo } from '../../../styles/svgs';
import CustomButton from '../../buttons/CustomButton';
import ReplyTextInput from '../../inputs/ReplyTextInput';
import { ButtonTypes, ButtonSizes } from '../../../constants/buttons';
import useInput from '../../../hooks/useInput';
import { Paths } from '../../../constants/paths';
import { postLogin } from '../../../api/login';
import useAuthData from '../../../hooks/useAuthData';
import useRouteToPath from '../../../hooks/useRouteToPath';
import { Urls } from '../../../constants/urls';

export default function LoginPage() {
	const [memberId, onChangeMemberId] = useInput();
	const [password, onChangePassword] = useInput();
	const { onRequestSetAuthData } = useAuthData();
	const onRouteToContact = useRouteToPath(Urls.kakaoChannel);

	const onWelcome = () =>
		alert('링코의 서비스는 2023년 3월 1일부터 사용하실 수 있습니다. 3월 1일에 만나요!');

	const onSubmit = async () => {
		const post = await postLogin({
			memberId,
			password,
		});
		onRequestSetAuthData(post.data);
	};

	return (
		<S.Container>
			<h1>{svgLogo}</h1>
			<h2>동아리 모집을 쉽고 빠르게</h2>
			<div>
				<ReplyTextInput
					value={memberId}
					onChange={onChangeMemberId}
					label={'아이디'}
					errorMessage={'아이디를 입력하세요.'}
					isSingleLine
				/>
				<ReplyTextInput
					value={password}
					onChange={onChangePassword}
					label={'비밀번호'}
					errorMessage={'비밀번호를 입력하세요.'}
					type={'password'}
					isSingleLine
				/>
				<CustomButton
					label={'로그인'}
					onClick={onSubmit}
					buttonType={ButtonTypes.primary}
					buttonSize={ButtonSizes.large}
					disabled={!(memberId && password)}
				/>
			</div>
			<div>
				<a href={Paths.register}>회원 가입</a>
				<a onClick={onRouteToContact}>이용 문의</a>
			</div>
			<S.PrivacyPolicy>
				<p>© 2023. Linko all rights reserved.</p>
				<p>
					<a href={Urls.privacyPolicy}>개인정보처리방침</a>
				</p>
			</S.PrivacyPolicy>
		</S.Container>
	);
}

namespace S {
	export const Container = styled.div`
		> h1 {
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 1.2rem;
		}

		> h2 {
			${Fonts.subtitle16semibold}
			color: ${Colors.blue700};
			text-align: center;
		}

		> div:first-of-type {
			margin-bottom: 2.6rem;

			> div:first-of-type {
				margin: 5rem 0;
			}

			> div:last-of-type {
				margin-bottom: 0 !important;
			}

			> button {
				width: 100%;
				margin-top: 3.2rem;
			}
		}

		> div:nth-of-type(2) {
			display: grid;
			grid-template-columns: 1fr 1fr;
			position: relative;

			> a {
				${Fonts.button13medium}
				color: ${Colors.gray900};
				padding: 0 3.2rem;
				cursor: pointer;

				:first-of-type {
					margin-left: auto;
				}

				:last-of-type {
					margin-right: auto;
				}
			}

			::after {
				content: '';
				position: absolute;
				width: 0.1rem;
				height: 1.3rem;
				background-color: ${Colors.gray300};
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
	`;

	export const PrivacyPolicy = styled.div`
		position: fixed;
		left: 50%;
		bottom: 4rem;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		text-align: center;

		> p:first-of-type {
			${Fonts.body14regular}
			color: ${Colors.gray700};
			white-space: nowrap;
		}

		> p:last-of-type {
			${Fonts.button13medium}
		}
	`;
}

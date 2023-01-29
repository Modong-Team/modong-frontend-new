import styled from 'styled-components';
import { Colors } from '../../../styles/colors';
import { Fonts } from '../../../styles/fonts';
import { Styles } from '../../../styles/styles';
import { svgUser24, svgNewPlus } from '../../../styles/svgs';
import useRouteToPath from '../../../hooks/useRouteToPath';
import { Paths } from '../../../constants/paths';
import CustomButton from '../../buttons/CustomButton';
import { ButtonTypes, ButtonSizes } from '../../../constants/buttons';
import { AlphaToHex } from '../../../styles/alphaToHex';
import { useState, useEffect } from 'react';
import useGet from '../../../hooks/useGet';
import { getApplications } from '../../../api/applications';
import useLocalLoading from '../../../hooks/useLocalLoading';
import LoadingDots from '../../shared/LoadingDots';
import { LoadingWidths } from '../../../constants/loadingWidths';
import { SC } from '../../../styles/styled';
import useCustomRouter from '../../../hooks/useCustomRouter';

export default function MainSidebar({ applicationId }: MainPageProps) {
	const routeToNew = useRouteToPath(Paths.new);
	const [applications, setApplications] = useState<ResponseApplications.Get>();
	const { isLocalLoading, onStartLocalLoading, onFinishLocalLoading } = useLocalLoading();
	const { onRouteToPath } = useCustomRouter();

	useEffect(() => {
		onStartLocalLoading();
		useGet(() => getApplications(1), setApplications, onFinishLocalLoading);
	}, []);

	return (
		<S.SidebarContainer>
			<S.SidebarProfile>
				<S.ProfileImage>
					<img src='https://user-images.githubusercontent.com/98504939/204071204-d8965b7f-8a6f-4c8f-904a-63bd16447081.jpg' />
				</S.ProfileImage>
				<h2>동아리 이름</h2>
				<h3>동아리 ID</h3>
				<S.ProfilePopulation>{svgUser24} 3</S.ProfilePopulation>
			</S.SidebarProfile>
			<S.SidebarApplications>
				<h3>지원서 목록</h3>
				{applications &&
					applications.data.map((application, i) => (
						<S.ApplicationItem
							isFocus={applicationId === application.id}
							onClick={() => onRouteToPath(Paths.main + '/' + application.id)}
							key={i}>
							{application.title}
						</S.ApplicationItem>
					))}
				<LoadingDots width={LoadingWidths.section} isHidden={!isLocalLoading} />
			</S.SidebarApplications>
			<CustomButton
				onClick={routeToNew}
				label={'새로운 지원서'}
				buttonType={ButtonTypes.primary}
				buttonSize={ButtonSizes.large}
				svgIcon={svgNewPlus}
			/>
		</S.SidebarContainer>
	);
}

namespace S {
	export const SidebarContainer = styled.div`
		${SC.HideScrollBar}
		border-right: 0.1rem solid ${Colors.gray200};
		position: fixed;
		top: ${Styles.headerHeight};
		height: calc(100vh - ${Styles.headerHeight});
		z-index: 10;
		width: 15.28vw;
		min-width: 22rem;
		max-width: 27.2rem;
		background-color: ${Colors.white};
		overflow: scroll;

		> button {
			display: block;
			margin: 0 auto;
			margin-bottom: 2.4rem;

			svg {
				position: relative;
				top: -0.05rem;
			}
		}
	`;

	export const SidebarProfile = styled.section`
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 4rem 2.6rem 2.85rem 2.6rem;
		border-bottom: 0.1rem solid ${Colors.gray200};

		> h2 {
			${Fonts.heading18bold}
			color:${Colors.gray950};
			margin-top: 2.4rem;
		}

		> h3 {
			${Fonts.body12medium}
			color:${Colors.gray700};
			margin-top: 0.4rem;
		}
	`;

	export const ProfileImage = styled.div`
		width: 9.6rem;
		height: 9.6rem;
		border-radius: 50%;
		overflow: hidden;

		> img {
			width: 100%;
			height: 100%;
		}
	`;

	export const ProfilePopulation = styled.div`
		${Fonts.button16bold}
		color: ${Colors.gray600};
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 1.9rem;
		gap: 0.35em;
	`;

	export const SidebarApplications = styled.section`
		padding: 2.4rem 1.1rem;

		> h3 {
			${Fonts.subtitle14semibold}
			text-align: center;
		}
	`;

	export const ApplicationItem = styled.li<IsFocusType>`
		${Fonts.subtitle16semibold}
		cursor: pointer;
		text-align: left;
		padding: 1.2rem 1.7rem;
		border-radius: 0.8rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: 0.3s ease;
		background-color: ${(props) => props.isFocus && Colors.blue500 + AlphaToHex['0.2']};
		color: ${(props) => (props.isFocus ? Colors.gray990 : Colors.gray700)};

		&:first-of-type {
			margin-top: 1.2rem;
		}
	`;
}
import CustomButton from '../../buttons/CustomButton';
import ClubLogoPreview from './ClubLogoPreview';
import { ButtonTypes, ButtonSizes } from '../../../constants/buttons';
import styled from 'styled-components';
import ReplyTextInput from '../../inputs/ReplyTextInput';
import useInput from '../../../hooks/useInput';
import { Fonts } from '../../../styles/fonts';
import { Colors } from '../../../styles/colors';
import SignUpModal from '../../modals/SignUpModal';
import useActive from '../../../hooks/useActive';
import useUniqueId from '../../../hooks/useUniqueId';
import { useRef, MutableRefObject, useEffect } from 'react';
import useInputFile from '../../../hooks/useInputFile';
import { v4 as uuid } from 'uuid';
import { uploadFileToS3 } from '../../../s3/index';
import { postClub } from '../../../api/club';
import useCustomRouter from '../../../hooks/useCustomRouter';
import { Paths } from '../../../constants/paths';
import Calendar from '../../shared/Calendar';
import useChange from '../../../hooks/useChange';
import { svgCalendar, svgQuestionMark } from '../../../styles/svgs';
import withoutPropagation from '../../../utils/withoutPropagation';
import ToolTip from '../../shared/ToolTip';
import useLoadingStatus from '../../../hooks/useLoadingStatus';
import { Devices } from '../../../styles/devices';
import BottomSheet from '../../shared/BottomSheet';
import useMobile from '../../../hooks/useMobile';

export default function RegisterClubPage() {
	const id = useUniqueId();
	const isMobile = useMobile();
	const [clubName, onChangeClubName] = useInput();
	const { file, onChangeFile } = useInputFile();
	const [isShowModal, onShowModal, onHideModal] = useActive();
	const [isShowBottomSheet, onShowBottomSheet, onHideBottomSheet] = useActive();
	const labelRef = useRef() as MutableRefObject<HTMLLabelElement>;
	const { onRouteToPath } = useCustomRouter();
	const [startDate, onChangeStartDate] = useChange(0);
	const [endDate, onChangeEndDate] = useChange(0);
	const [isCalendarOpened, onOpenCalendar, onCloseCalendar] = useActive();
	const [isToolTipOpened, onOpenTooltip, onCloseTooltip] = useActive();
	const { onStartGlobalLoading, onFinishGlobalLoading } = useLoadingStatus();

	const onClickLabel = () => labelRef.current.click();

	const checkIfFulfilled = () => clubName && file && startDate && endDate;

	const onSubmit = async () => {
		onStartGlobalLoading();
		try {
			let fileKey = '';
			if (file) {
				fileKey = clubName + '_' + uuid().slice(0, 6);
				const upload = await uploadFileToS3(fileKey, file);
			}
			const post = await postClub({
				name: clubName,
				profileImgUrl: fileKey,
				startDate: '2023. 3. ' + startDate,
				endDate: '2023. 3. ' + endDate,
			});
			onHideModal();
			onHideBottomSheet();
			onRouteToPath(Paths.registerClubComplete + '/' + post.data.code);
		} catch (e) {
			console.log(e);
		}
		onFinishGlobalLoading();
	};

	useEffect(() => {
		return () => {
			onHideModal();
			onHideBottomSheet();
		};
	}, []);

	return (
		<S.Container>
			<h2>????????? ??????</h2>
			<div>
				<ClubLogoPreview file={file} />
				<CustomButton
					label={'????????? ??????'}
					onClick={onClickLabel}
					buttonType={ButtonTypes.secondary}
					buttonSize={ButtonSizes.medium}
				/>
				<label htmlFor={id} ref={labelRef} />
				<input type='file' id={id} onChange={onChangeFile} />
			</div>
			<ReplyTextInput
				value={clubName}
				onChange={onChangeClubName}
				label={'????????? ??????'}
				errorMessage={'????????? ????????? ???????????????.'}
				isSingleLine
			/>
			<S.PeriodOfUse>
				<label>
					????????? ?????? ?????? (????????? ?????? ??????)
					<button onBlur={onCloseTooltip}>
						<div onClick={isMobile ? onShowBottomSheet : onOpenTooltip}>{svgQuestionMark}</div>
						{!isMobile && (
							<ToolTip
								onClose={(e) => withoutPropagation(e, onCloseTooltip)}
								isHidden={!isToolTipOpened}
							/>
						)}
					</button>
				</label>
				<div onClick={onOpenCalendar}>
					{svgCalendar}
					<p>
						{startDate ? '2023. 3. ' + startDate : <S.Gray>?????? ??????</S.Gray>}
						{startDate && endDate ? ' ??? ' : <S.Gray> ??? </S.Gray>}
						{endDate ? '2023. 3. ' + endDate : <S.Gray>?????? ??????</S.Gray>}
					</p>
					<Calendar
						startDate={startDate}
						endDate={endDate}
						onChangeStartDate={onChangeStartDate}
						onChangeEndDate={onChangeEndDate}
						onClose={onCloseCalendar}
						isHidden={!isCalendarOpened}
					/>
				</div>
			</S.PeriodOfUse>
			<CustomButton
				label={'??????'}
				onClick={onShowModal}
				buttonType={ButtonTypes.primary}
				buttonSize={ButtonSizes.large}
				disabled={!checkIfFulfilled()}
			/>
			<p>
				????????? ????????? ????????? ????????? ????????? ????????????
				<br />
				???????????? ??????????????????.
			</p>
			<SignUpModal
				title={clubName}
				description={'????????? ????????? ????????? ???????????????.'}
				onCancel={onHideModal}
				onConfirm={onSubmit}
				isHidden={!isShowModal}
			/>
			<BottomSheet onClose={onHideBottomSheet} isHidden={!isShowBottomSheet} />
		</S.Container>
	);
}

namespace S {
	export const Container = styled.div`
		margin-bottom: 15rem;

		@media ${Devices.mobile} {
			margin-bottom: 20rem;
		}

		> h2 {
			${Fonts.subtitle16medium}
			color: ${Colors.gray700};
			margin-bottom: 1.6rem;
		}

		> div:first-of-type {
			display: flex;
			gap: 1.6rem;
			margin-bottom: 5.5rem;
			display: flex;
			align-items: center;

			> label,
			> input {
				display: none;
			}
		}

		> div:nth-of-type(2) {
			margin: 0;
		}

		> p {
			${Fonts.subtitle14medium}
			color: ${Colors.gray700};
			margin: 3.2rem 0;
			text-align: center;
		}

		> button {
			width: 100%;
		}
	`;

	export const PeriodOfUse = styled.div`
		margin: 3.2rem 0;
		cursor: pointer;

		> label {
			${Fonts.button13medium}
			color: ${Colors.gray700};
			margin-bottom: 1.9rem;
			display: flex;
			gap: 0.4rem;

			> button {
				position: relative;

				> div {
					display: flex;

					> svg {
						position: relative;
						top: 0.1rem;
					}
				}
			}
		}

		> div {
			display: flex;
			align-items: center;
			padding: 0.8rem 0;
			border-bottom: 0.1rem solid ${Colors.gray200};
			gap: 0.8rem;
			position: relative;

			> svg {
				position: relative;
				top: -0.05rem;
			}

			> p {
				${Fonts.body16regular}
			}
		}
	`;

	export const Gray = styled.span`
		color: ${Colors.gray700};
	`;
}

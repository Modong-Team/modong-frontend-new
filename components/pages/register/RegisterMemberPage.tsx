import styled from 'styled-components';
import CustomButton from '../../buttons/CustomButton';
import ReplyTextInput from '../../inputs/ReplyTextInput';
import { ButtonTypes, ButtonSizes } from '../../../constants/buttons';
import { postRegister } from '../../../api/register';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import useCustomRouter from '../../../hooks/useCustomRouter';
import { Paths } from '../../../constants/paths';
import useLoadingStatus from '../../../hooks/useLoadingStatus';
import React from 'react';
import { postMemberCheck } from '../../../api/member';
import { useState, useEffect } from 'react';
import { Devices } from '../../../styles/devices';
import CheckIcon from '../../buttons/CheckIcon';
import IconButton from '../../buttons/IconButton';
import { svgRight16 } from '../../../styles/svgs';
import { Fonts } from '../../../styles/fonts';
import { Colors } from '../../../styles/colors';
import useActive from '../../../hooks/useActive';
import withoutPropagation from '../../../utils/withoutPropagation';
import AgreementModal from '../../modals/AgreementModal';

export default function RegisterMemberPage({ clubId }: RegisterMemberPageProps) {
	const { onRouteToPath } = useCustomRouter();
	const { onStartGlobalLoading, onFinishGlobalLoading } = useLoadingStatus();
	const [duplicateError, setDuplicateError] = useState(false);
	const [isAgree, onAgree, onDisagree] = useActive();
	const [isShowAgreementModal, onShowAgreementModal, onHideAgreementModal] = useActive();

	const formik = useFormik({
		initialValues: {
			memberId: '',
			password: '',
			passwordForCheck: '',
			name: '',
			email: '',
			phone: '',
		},
		validationSchema: object({
			memberId: string().min(3).max(20).required(),
			password: string()
				.min(6)
				.max(20)
				.matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)
				.required(),
			name: string().required(),
			email: string().email().required(),
			phone: string()
				.length(11)
				.matches(/^[0-9]+$/)
				.required(),
		}),
		onSubmit: async () => {
			onStartGlobalLoading();
			const post = await postRegister({ ...formik.values, clubCode: clubId });
			onFinishGlobalLoading();
			if (post) onRouteToPath(Paths.login);
		},
		validateOnChange: true,
		validateOnMount: true,
	});

	const checkIfErrorExist = () => {
		if (!isAgree) return true;
		if (duplicateError) return true;
		if (formik.values.password !== formik.values.passwordForCheck) return true;
		for (const error in formik.errors) if (error !== '') return true;
		return false;
	};

	const handleMemberIdBlur = async (e: React.ChangeEvent<HTMLInputElement>) => {
		formik.handleBlur(e);
		if (!formik.errors.memberId) {
			const post = await postMemberCheck({ memberId: formik.values.memberId });
			if (post) setDuplicateError(post.data.duplicated);
		} else setDuplicateError(false);
	};

	useEffect(() => {
		return () => onHideAgreementModal();
	}, []);

	return (
		<S.Container>
			<ReplyTextInput
				name={'memberId'}
				value={formik.values.memberId}
				isError={formik.touched.memberId && (!!formik.errors.memberId || duplicateError)}
				onChange={formik.handleChange}
				onBlur={handleMemberIdBlur}
				label={'????????? (3~20???)'}
				errorMessage={
					duplicateError
						? '????????? ??????????????????.'
						: formik.errors.memberId
						? '???????????? ???????????? ??????????????????.'
						: ''
				}
				maxLength={20}
				isSingleLine
			/>
			<ReplyTextInput
				name={'password'}
				value={formik.values.password}
				isError={formik.touched.password && !!formik.errors.password}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				label={'???????????? (??????, ??????, ???????????? ?????? 6~20???)'}
				errorMessage={'??????????????? ???????????? ??????????????????.'}
				type={'password'}
				maxLength={20}
				isSingleLine
			/>
			<ReplyTextInput
				name={'passwordForCheck'}
				value={formik.values.passwordForCheck}
				isError={
					formik.touched.passwordForCheck &&
					formik.values.password !== formik.values.passwordForCheck
				}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				label={'???????????? ??????'}
				errorMessage={'??????????????? ???????????? ????????????.'}
				type={'password'}
				maxLength={20}
				isSingleLine
			/>
			<ReplyTextInput
				name={'name'}
				value={formik.values.name}
				isError={formik.touched.name && !!formik.errors.name}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				label={'????????? ??????'}
				errorMessage={'????????? ???????????? ??????????????????.'}
				isSingleLine
			/>
			<ReplyTextInput
				name={'email'}
				value={formik.values.email}
				isError={formik.touched.email && !!formik.errors.email}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				label={'?????????'}
				errorMessage={'???????????? ???????????? ??????????????????.'}
				isSingleLine
			/>
			<ReplyTextInput
				name={'phone'}
				value={formik.values.phone}
				isError={formik.touched.phone && !!formik.errors.phone}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				label={'???????????? (????????? ??????)'}
				errorMessage={'??????????????? ???????????? ??????????????????.'}
				maxLength={11}
				isSingleLine
			/>
			<S.AgreeMent onClick={isAgree ? onDisagree : onAgree}>
				<CheckIcon isHover={false} isChecked={isAgree} />
				<h2>???????????? ?????? ??? ?????? ?????? (??????)</h2>
				<IconButton
					svgIcon={svgRight16}
					onClick={(e) => withoutPropagation(e, onShowAgreementModal)}
					type={'button'}
				/>
			</S.AgreeMent>
			<CustomButton
				label={'?????? ??????'}
				onClick={formik.handleSubmit}
				buttonType={ButtonTypes.primary}
				buttonSize={ButtonSizes.large}
				disabled={checkIfErrorExist()}
			/>
			<AgreementModal onClose={onHideAgreementModal} isHidden={!isShowAgreementModal} />
		</S.Container>
	);
}

namespace S {
	export const Container = styled.form`
		@media ${Devices.mobile} {
			margin-bottom: 2rem;
		}

		> div {
			margin: 5.5rem 0;

			:first-of-type {
				margin-top: 1rem;
			}

			:last-of-type {
				margin-bottom: 0;
			}
		}

		> button {
			width: 100%;
			margin-top: 3.2rem;
		}
	`;

	export const AgreeMent = styled.div`
		width: fit-content;
		margin: 0 !important;
		display: flex;
		align-items: center;
		gap: 0.9rem;
		cursor: pointer;

		> h2 {
			${Fonts.button13medium}
			color: ${Colors.gray700};
		}

		> button path {
			stroke: ${Colors.gray700};
		}
	`;
}

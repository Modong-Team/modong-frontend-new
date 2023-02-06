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
import { useRef, MutableRefObject } from 'react';
import useInputFile from '../../../hooks/useInputFile';
import { v4 as uuid } from 'uuid';
import { uploadFileToS3 } from '../../../s3/index';
import { postClub } from '../../../api/club';
import useCustomRouter from '../../../hooks/useCustomRouter';
import { Paths } from '../../../constants/paths';

export default function RegisterClubPage() {
	const id = useUniqueId();
	const [clubName, onChangeClubName] = useInput();
	const { file, onChangeFile } = useInputFile();
	const [isShowModal, onShowModal, onHideModal] = useActive();
	const labelRef = useRef() as MutableRefObject<HTMLLabelElement>;
	const { onRouteToPath } = useCustomRouter();

	const onClickLabel = () => labelRef.current.click();

	const onSubmit = async () => {
		try {
			let fileKey = '';
			if (file) {
				fileKey = clubName + '_' + uuid().slice(0, 6);
				const upload = await uploadFileToS3(fileKey, file);
			}
			const post = await postClub({
				name: clubName,
				profileImgUrl: fileKey,
			});
			onRouteToPath(Paths.registerClubComplete + '/' + post.data.code);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<S.Container>
			<h2>동아리 로고</h2>
			<div>
				<ClubLogoPreview file={file} />
				<CustomButton
					label={'이미지 선택'}
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
				label={'동아리 이름'}
				errorMessage={''}
			/>
			<p>
				동아리 로고와 동아리 이름은 추후에 수정하실 수 없으니
				<br />
				신중하게 입력해주세요!
			</p>
			<CustomButton
				label={'확인'}
				onClick={onShowModal}
				buttonType={ButtonTypes.primary}
				buttonSize={ButtonSizes.large}
				disabled={clubName === ''}
			/>
			<SignUpModal
				title={clubName}
				description={'동아리 이름은 수정이 불가능해요.'}
				onCancel={onHideModal}
				onConfirm={onSubmit}
				isHidden={!isShowModal}
			/>
		</S.Container>
	);
}

namespace S {
	export const Container = styled.div`
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
}
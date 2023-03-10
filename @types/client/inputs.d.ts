type CommonInputProps = {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type ApplicationTitleInputProps = {
	isError: boolean;
};

type EssentialCheckInputProps = {
	label: string;
	isFixed: boolean;
	essentialIdx: number;
};

type OptionTitleInputProps = {
	formIdx: number;
	questionIdx: number;
	optionIdx: number;
	questionType: 2 | 3;
};

type QuestionTitleInputProps = CommonInputProps & {
	onClickRemove: () => void;
	placeHolder: string;
};

type ReplyTextInputProps = CommonInputProps & {
	name?: string;
	label: string;
	errorMessage?: string;
	isSingleLine?: boolean;
	maxLength?: number;
	minLength?: number;
	pattern?: string;
	type?: string;
	isError?: boolean;
	onBlur?: (e: any) => void;
};

type ReplyCheckInputProps = Omit<ReplyTextInputProps, 'value'> & {
	isChecked: boolean;
};

type ReplyRadioInputProps = ReplyCheckInputProps & {
	name: string;
};

type ViewMemoInputProps = CommonInputProps & {
	onSubmit: () => void;
};

type AutoResizeTextAreaProps = CommonInputProps & {
	placeholder: string;
	onFocus?: () => void;
	onBlur?: () => void;
	row?: number;
};

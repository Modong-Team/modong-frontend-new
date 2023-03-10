type PageProps = {
	page: number;
};

type NewIndicatorProps = Partial<PageProps> & {
	isComplete?: boolean;
};

type NewPageButtonsProps = PageProps & {
	onPrevPage: () => void;
	onNextPage: () => void;
	isNextButtonDisabled?: boolean;
};

type NewMainProps = PageProps & {};

type NewFormsProps = {
	formIdx: number;
};

type NewNavigatorProps = PageProps & {
	onChangePage: (page: number) => void;
};

type NewCompletePageProps = {
	applicationId: number;
};

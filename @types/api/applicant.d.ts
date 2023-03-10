declare namespace RequestApplicant {
	type Post = {
		applicationId: number | null;
		name: string;
		essentialAnswers: {
			answer: string;
			essentialQuestionId: number;
		}[];
		questionAnswers: {
			answer: string;
			questionId: number;
		}[];
	};

	type Patch = {
		applicantStatusCode: number;
	};

	type PatchCancelFail = {};
}

declare namespace ResponseApplicant {
	type Post = {
		status: number;
		message: string;
		code: string;
		data: {
			id: number;
		};
	};

	type Get = {
		status: number;
		message: string;
		code: string;
		data: {
			id: number;
			name: string;
			rate: number;
			status: string;
			submitDate: string;
			numOfEvaluator: number;
			essentialAnswers: EssentialAnswer[];
			questionAnswers: {
				id: string;
				question: string;
				answer: string;
			}[];
			fail: boolean;
			applicationId: number;
		};
	};

	type EssentialAnswer = {
		id: number;
		essentialQuestion: string;
		essentialAnswer: string;
	};

	type PatchStatus = {
		id: number;
	};

	type PatchCancelFail = {
		status: number;
		message: string;
		code: string;
		data: {
			id: number;
		};
	};
}

declare namespace RequestClub {
	type Post = {
		name: string;
		profileImgUrl: string;
		startDate: string;
		endDate: string;
	};
}

declare namespace ResponseClub {
	type Get = {
		status: number;
		message: string;
		code: string;
		data: ClubData;
	};

	type ClubData = {
		id: 1;
		name: string;
		profileImgUrl: string;
		clubCode: string;
		startDate: string;
		endDate: string;
		numOfMember: number;
	};

	type Post = {
		status: number;
		message: string;
		code: string;
		data: {
			id: number;
			code: string;
		};
	};
}

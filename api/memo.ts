import request from './core/index';

const baseUrl = '/memo';

export const getMemos = (applicantId: number) => {
	const query = 'applicantId=' + applicantId;
	const url = `${baseUrl}s?${query}`;
	return request.get<ResponseMemo.Get>(url);
};

export const postMemo = (data: RequestMemo.Post) => {
	const url = `${baseUrl}`;
	return request.post<ResponseMemo.Post, RequestMemo.Post>(url, data);
};

export const deleteMemo = (memoId: number) => {
	const url = `${baseUrl}/${memoId}`;
	return request.delete<ResponseMemo.Delete>(url);
};

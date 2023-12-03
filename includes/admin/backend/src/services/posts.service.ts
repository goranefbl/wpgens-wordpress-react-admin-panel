import apiFetch from '@wordpress/api-fetch';

export type PostsResponse = {
	numOfPages: number;
	data: {
		postID: string;
		postName: string;
		postDate: string;
		postAuthor: string;
		postStatus: string;
	}[];
};

export const getPostsService = (page: number) => apiFetch<PostsResponse>({ path: `/posts/${page}` }).then((response) => response);

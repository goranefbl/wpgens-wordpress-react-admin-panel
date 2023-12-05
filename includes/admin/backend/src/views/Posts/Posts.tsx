import { useMutation } from 'react-query';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader/Loader';
import { getPostsService, PostsResponse } from '@/services/posts.service';

export default function Posts() {
	const [posts, setPosts] = useState<PostsResponse | null>(null);
	const [page, setPage] = useState(1);

	const { isLoading, mutate } = useMutation<any, void, number, () => void>(getPostsService, {
		onSuccess: (response: PostsResponse) => {
			setPosts(response);
		},
		onError: (err: unknown) => {
			console.log('error', err);
		},
	});

	useEffect(() => {
		if (page) {
			mutate(page);
		}
	}, [page]);

	return (
		<div className='max-w-screen-2xl px-6'>
			<header className='mb-8'>
				<h2 className='text-2xl font-bold'>Posts</h2>
				<span className='text-sm block mt-1'>Example list of some data.</span>
			</header>
			<div className='bg-white p-6 rounded-xl border border-gray-200 mb-4 w-full relative'>
				{isLoading ? (
					<Loader />
				) : (
					<div className='block w-full overflow-x-auto'>
						<table className='items-center bg-transparent w-full border-collapse '>
							<thead>
								<tr>
									<th className='px-6 bg-[#344054] text-white align-middle border border-solid border-[#344054] py-4 text-xs uppercase border-l-0 border-r-0 xl:whitespace-nowrap font-semibold text-left'>
										#ID
									</th>
									<th className='px-6 bg-[#344054] text-white align-middle border border-solid border-[#344054] py-4 text-xs uppercase border-l-0 border-r-0 font-semibold text-left'>
										Date
									</th>
									<th className='px-6 bg-[#344054] text-white align-middle border border-solid border-[#344054] py-4 text-xs uppercase border-l-0 border-r-0 xl:whitespace-nowrap font-semibold text-left'>
										Title
									</th>
									<th className='px-6 bg-[#344054] text-white align-middle border border-solid border-[#344054] py-4 text-xs uppercase border-l-0 border-r-0 font-semibold text-left'>
										Written By
									</th>
									<th className='px-6 bg-[#344054] text-white align-middle border border-solid border-[#344054] py-4 text-xs uppercase border-l-0 border-r-0 font-semibold text-left'>
										Status
									</th>
								</tr>
							</thead>

							<tbody>
								{posts?.data?.map((post, k) => (
									<tr key={post.postID} className={(k + 1) % 2 === 0 ? 'bg-gray-100' : ''}>
										<td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm xl:whitespace-nowrap p-4'>{post.postID}</td>
										<td
											className='table-info border-t-0 px-6 align-center border-l-0 border-r-0 text-sm p-4'
											dangerouslySetInnerHTML={{ __html: post.postDate }}
										/>
										<td
											className='table-info border-t-0 px-6 align-center border-l-0 border-r-0 text-sm p-4'
											dangerouslySetInnerHTML={{ __html: post.postName }}
										/>
										<td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm xl:whitespace-nowrap p-4 '>
											{post.postAuthor}
										</td>
										<td className='border-t-0 px-6 align-middle border-l-0 border-r-0 xl:whitespace-nowrap p-4 text-left text-gray-700 font-semibold tag'>
											<span className={`tag-alt ${post.postStatus}`}></span>
											<span className='capitalize'>{post.postStatus}</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<div className='pt-8 px-4'>
							<nav className='flex items-center space-x-2'>
								{page > 1 && (
									<span
										className='text-gray-400 p-4 inline-flex items-center gap-2 font-medium rounded-md cursor-pointer'
										onClick={() => setPage((p) => p - 1)}
									>
										<span aria-hidden='true'>«</span>
										<span className='sr-only'>Previous</span>
									</span>
								)}
								{[...Array(posts?.numOfPages).keys()]
									.filter((k) => k < page + 3 && k > page - 3)
									.map((k) => (
										<span
											key={k}
											onClick={() => setPage(k + 1)}
											className={`cursor-pointer w-8 h-8 ${
												k + 1 === page ? 'bg-[#344054] text-white' : 'text-gray-400'
											} inline-flex justify-center items-center text-sm font-medium rounded-full hover:bg-gray-800 hover:text-white`}
											aria-current='page'
										>
											{k + 1}
										</span>
									))}
								{posts?.numOfPages && page < posts?.numOfPages && (
									<span
										className='text-gray-400 p-4 inline-flex items-center gap-2 font-medium rounded-md cursor-pointer'
										onClick={() => setPage((p) => p + 1)}
									>
										<span className='sr-only'>Next</span>
										<span aria-hidden='true'>»</span>
									</span>
								)}
							</nav>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

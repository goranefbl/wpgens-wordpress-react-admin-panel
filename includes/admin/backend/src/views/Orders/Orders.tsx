/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from 'react-query';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader/Loader';
import { getOrdersService, OrdersResponse } from '@/services/orders.service';

export default function Orders() {
	const [orders, setOrders] = useState<OrdersResponse>();
	const [page, setPage] = useState(1);

	const { isLoading, mutate } = useMutation<any, void, number, () => void>(getOrdersService, {
		onSuccess: (response: OrdersResponse) => {
			setOrders(response);
		},
		onError: (err: unknown) => {
			console.log('ee', err);
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
				<h2 className='text-2xl font-bold'>Referral Orders</h2>
				<span className='text-sm block mt-1'>List of all the referral orders made on your store.</span>
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
										Status
									</th>
									<th className='px-6 bg-[#344054] text-white align-middle border border-solid border-[#344054] py-4 text-xs uppercase border-l-0 border-r-0 xl:whitespace-nowrap font-semibold text-left'>
										Order
									</th>
									<th className='px-6 bg-[#344054] text-white align-middle border border-solid border-[#344054] py-4 text-xs uppercase border-l-0 border-r-0 font-semibold text-left'>
										Referred By
									</th>
									<th className='px-6 bg-[#344054] text-white align-middle border border-solid border-[#344054] py-4 text-xs uppercase border-l-0 border-r-0 font-semibold text-left'>
										Date
									</th>
									<th className='px-6 bg-[#344054] text-white align-middle border border-solid border-[#344054] py-4 text-xs uppercase border-l-0 border-r-0 font-semibold text-left'>
										Order Amount
									</th>
								</tr>
							</thead>

							<tbody>
								{orders?.data.map((log, k) => (
									<tr key={log.order_info} className={(k + 1) % 2 === 0 ? 'bg-gray-100' : ''}>
										<td className='border-t-0 px-6 align-middle border-l-0 border-r-0 xl:whitespace-nowrap p-4 text-left text-gray-700 font-semibold tag'>
											<span className={`tag-alt ${log.order_status}`}></span>
											<span>{log.order_status}</span>
										</td>
										<td
											className='table-info border-t-0 px-6 align-center border-l-0 border-r-0 text-sm p-4'
											dangerouslySetInnerHTML={{ __html: log.order_info }}
										/>
										<td
											className='table-info border-t-0 px-6 align-center border-l-0 border-r-0 text-sm p-4'
											dangerouslySetInnerHTML={{ __html: log.order_referrer }}
										/>
										<td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm xl:whitespace-nowrap p-4 '>
											{log.order_date}
										</td>
										<td
											className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm xl:whitespace-nowrap p-4'
											dangerouslySetInnerHTML={{ __html: log.order_total }}
										/>
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
								{[...Array(orders?.num_of_pages).keys()]
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
								{orders?.num_of_pages && page < orders?.num_of_pages && (
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

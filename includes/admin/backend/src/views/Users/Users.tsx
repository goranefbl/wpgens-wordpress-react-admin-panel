/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from 'react-query';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader/Loader';
import { CustomerRequest, CustomersResponse, getCustomersService } from '@/services/users.service';

const options = [
	{
		id: '30',
		name: '30 Days',
	},
	{
		id: '90',
		name: '90 Days',
	},
	{
		id: '180',
		name: '6 Months',
	},
	{
		id: '365',
		name: '12 Months',
	},
	{
		id: '1825',
		name: '5 Years (slow query)',
	},
];

export default function Users() {
	const [customers, setCustomers] = useState<CustomersResponse>();
	const [days, setDays] = useState('90');

	// Had to go with client side navigation.
	const [page, setPage] = useState(1);
	const totalPages = Math.ceil((customers?.data.length || 0) / 10);

	const { isLoading, mutate } = useMutation<any, void, CustomerRequest, () => void>({
		mutationFn: getCustomersService,
		mutationKey: 'customers',
		onSuccess: (response: CustomersResponse) => {
			setCustomers(response);
		},
		onError: (err: unknown) => {
			console.log('ee', err);
		},
	});

	useEffect(() => {
		if (page) {
			mutate({ days });
		}
	}, [days]);

	return (
		<div className='max-w-screen-2xl px-6'>
			<header className='mb-8'>
				<div className='flex justify-between items-end'>
					<div>
						<h2 className='text-2xl font-bold'>Users List</h2>
						<span className='text-sm block mt-1'>List of customers that referred friends.</span>
					</div>
					<div>
						<select
							className={`block w-40 appearance-none capitalize border text-gray-700 pr-8 !py-1 rounded leading-tight focus:outline-none bg-white border-gray-200 focus:border-blue-500`}
							disabled={isLoading}
							onChange={(v) => setDays(v.target.value)}
							defaultValue={days}
						>
							{options.map((o) => (
								<option key={o.id} value={o.id}>
									{o.name}
								</option>
							))}
						</select>
					</div>
				</div>
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
										Name
									</th>
									<th className='px-6 bg-[#344054] text-white align-middle border border-solid border-[#344054] py-4 text-xs uppercase border-l-0 border-r-0 xl:whitespace-nowrap font-semibold text-left'>
										Email
									</th>
									<th className='px-6 bg-[#344054] text-white align-middle border border-solid border-[#344054] py-4 text-xs uppercase border-l-0 border-r-0 xl:whitespace-nowrap font-semibold text-left'>
										Registration Date
									</th>
									<th className='px-6 bg-[#344054] text-white align-middle border border-solid border-[#344054] py-4 text-xs uppercase border-l-0 border-r-0 font-semibold text-left'>
										Role
									</th>
								</tr>
							</thead>

							<tbody>
								{customers?.data.slice(page * 10 - 10, page * 10).map((customer, k) => (
									<tr key={customer.user_email} className={(k + 1) % 2 === 0 ? 'bg-gray-100' : ''}>
										<td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm xl:whitespace-nowrap p-4 '>
											{customer.user_name ? customer.user_name : '-'}
										</td>
										<td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm xl:whitespace-nowrap p-4 '>
											<a
												href={customer.user_link ? customer.user_link : `mailto:${customer.user_email}`}
												target='_blank'
												className='text-orange-400 underline'
											>
												{customer.user_email}
											</a>
										</td>
										<td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm xl:whitespace-nowrap p-4 '>
											{customer.raf_code}
										</td>
										<td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm xl:whitespace-nowrap p-4 '>
											{customer.num_of_orders}
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
								{[...Array(totalPages).keys()]
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
								{totalPages > 0 && page < totalPages && (
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

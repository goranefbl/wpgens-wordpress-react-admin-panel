import apiFetch from '@wordpress/api-fetch';

export type CustomersResponse = {
	total: {
		amount: number;
		advocates: number;
		orders: number;
	};
	data: {
		raf_code: string;
		num_of_orders: string;
		total_amount: string;
		user_id: string;
		user_email: string;
		user_name: string;
		user_link: string | '';
	}[];
};

export type CustomerRequest = {
	days: string;
};

export const getCustomersService = ({ days }: CustomerRequest) => apiFetch<CustomersResponse>({ path: `/customers/${days}` }).then((response) => response);

import apiFetch from '@wordpress/api-fetch';

apiFetch.use(apiFetch.createRootURLMiddleware(window.gens_raf_object?.root));
apiFetch.use(apiFetch.createNonceMiddleware(window.gens_raf_object?.api_nonce));

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

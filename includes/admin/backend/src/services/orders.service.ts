import apiFetch from '@wordpress/api-fetch';

apiFetch.use(apiFetch.createRootURLMiddleware(window.gens_raf_object?.root));
apiFetch.use(apiFetch.createNonceMiddleware(window.gens_raf_object?.api_nonce));

export type OrdersResponse = {
    num_of_pages: number;
    data: {
        order_date: string;
        order_info: string;
        order_referrer: string;
        order_status: string;
        order_total: string;
    }[];
};

export const getOrdersService = (page: number) => apiFetch<OrdersResponse>({ path: `/orders/${page}` }).then((response) => response);

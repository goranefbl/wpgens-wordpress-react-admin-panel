import apiFetch from '@wordpress/api-fetch';

apiFetch.use(apiFetch.createRootURLMiddleware(window.gens_raf_object?.root));
apiFetch.use(apiFetch.createNonceMiddleware(window.gens_raf_object?.api_nonce));

export type LogsResponse = {
    num_of_pages: number;
    data: {
        date: string;
        info: string;
        type: string;
        type_name: string;
    }[];
};

export const getEventsService = (page: number) => apiFetch<LogsResponse>({ path: `/events/${page}` }).then((response) => response);

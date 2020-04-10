
export interface QueryParam {
    page?: number;
    category_id?: number | string;
    sort?: string;
    sortby?: string;
    class?: string;
    is_web?: boolean;
    contest_id?: number;
    payment_gateway_id?: number;
    amount?: number;
    is_active?: boolean;
    contestant_id?: string;
}

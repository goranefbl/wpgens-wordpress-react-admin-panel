import { FieldErrors } from 'react-hook-form';
import InputText from '../Form/InputText/InputText';
import SelectField from '../Form/SelectField/SelectField';
import ProductCatSelect from '../Form/ProductCatSelect/ProductCatSelect';
import ToggleField from '../Form/ToggleField/ToggleField';
import { useState } from 'react';

export interface AdvocateRewardSettings {
    gens_raf_coupon_type?: string;
    gens_raf_coupon_amount?: number;
    gens_raf_coupon_duration?: number | null;
    gens_raf_min_order?: number | null;
    gens_raf_individual_use?: boolean;
    gens_raf_exclude_sale_items?: boolean;
    gens_raf_free_shipping?: boolean;
    gens_raf_limit_usage?: number | null;
    gens_raf_nth_coupon?: number | null;

    gens_raf_subscription?: boolean;

    gens_raf_generate_for_registration?: boolean;
    gens_raf_generate_for_order?: boolean;
}
export interface FriendRewardSettings {
    gens_raf_friend_coupon_type?: string;
    gens_raf_friend_coupon_amount?: number | null;
    gens_raf_friend_coupon_duration?: number | null;
    gens_raf_friend_min_order?: number | null;
    gens_raf_friend_individual_use?: boolean;
    gens_raf_friend_exclude_sale_items?: boolean;
    gens_raf_friend_free_shipping?: boolean;
    gens_raf_friend_limit_usage?: number | null;
    gens_raf_friend_nth_coupon?: number | null;

    gens_raf_subscription?: boolean;
    gens_raf_friend_enable?: boolean;
    gens_raf_guest_enable?: boolean;
    gens_raf_guest_coupon_code?: string;
    gens_raf_guest_coupon_message?: string;
}

export interface AdvocateRewardSettingsForm extends AdvocateRewardSettings {
    gens_raf_product_ids?: SelectField[];
    gens_raf_product_exclude_ids?: SelectField[];
    gens_raf_product_categories?: SelectField[];
    gens_raf_exclude_product_categories?: SelectField[];
}
export interface FriendRewardSettingsForm extends FriendRewardSettings {
    gens_raf_friend_product_ids?: SelectField[];
    gens_raf_friend_product_exclude_ids?: SelectField[];
    gens_raf_friend_product_categories?: SelectField[];
    gens_raf_friend_exclude_product_categories?: SelectField[];
}
export interface AdvocateRewardSettingsRequest extends AdvocateRewardSettings {
    gens_raf_product_ids?: string;
    gens_raf_product_exclude_ids?: string;
    gens_raf_product_categories?: string;
    gens_raf_exclude_product_categories?: string;
}
export interface FriendRewardSettingsRequest extends FriendRewardSettings {
    gens_raf_friend_product_ids?: string;
    gens_raf_friend_product_exclude_ids?: string;
    gens_raf_friend_product_categories?: string;
    gens_raf_friend_exclude_product_categories?: string;
}

export type SelectField = {
    label: string;
    value: number;
};

export enum CouponType {
    ProductDiscount = 'fixed_product',
    CartDiscount = 'fixed_cart',
    PercentageDiscount = 'percent',
    PercentageOrder = 'order_percent',
    FreeShipping = 'free_shipping',
    RecurringFee = 'recurring_fee',
    RecurringPercent = 'recurring_percent',
    SignUpFee = 'sign_up_fee',
    SignUpFeePercent = 'sign_up_fee_percent',
}

type WooCouponsProps = {
    errors: FieldErrors<AdvocateRewardSettingsForm | FriendRewardSettingsForm>;
    subscriptionActive: boolean;
    register: any; // UseFormRegister<AdvocateRewardSettingsForm | FriendRewardSettingsForm>;
    control: any; // Control<AdvocateRewardSettingsForm | FriendRewardSettingsForm>;
    type: 'advocate' | 'friend';
};

const couponOptions = [
    { id: CouponType.CartDiscount, name: 'Fixed Cart Discount' },
    { id: CouponType.PercentageDiscount, name: 'Percentage Discount' },
    { id: CouponType.ProductDiscount, name: 'Product Discount' },
    { id: CouponType.PercentageOrder, name: "Percentage of Friend's Order" },
    { id: CouponType.FreeShipping, name: 'Free Shipping' },
];

const friendCouponOptions = [
    { id: CouponType.CartDiscount, name: 'Fixed Cart Discount' },
    { id: CouponType.PercentageDiscount, name: 'Percentage Discount' },
    { id: CouponType.ProductDiscount, name: 'Product Discount' },
    { id: CouponType.FreeShipping, name: 'Free Shipping' },
];

const subscriptionCouponOptions = [
    { id: CouponType.RecurringFee, name: 'Recurring Product Discount' },
    { id: CouponType.RecurringPercent, name: 'Recurring Product % Discount' },
    { id: CouponType.SignUpFee, name: 'Sign Up Fee Discount' },
    { id: CouponType.SignUpFeePercent, name: 'Sign Up Fee % Discount' },
];

export default function WooCoupons({ errors, register, type, control, subscriptionActive }: WooCouponsProps) {
    const [expand, setExpand] = useState(false);
    const prefix = type === 'advocate' ? 'gens_raf_' : 'gens_raf_friend_';

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 md:gap-y-4">
                <SelectField
                    options={
                        type === 'advocate'
                            ? [...couponOptions, ...(subscriptionActive ? subscriptionCouponOptions : [])]
                            : [...friendCouponOptions, ...(subscriptionActive ? subscriptionCouponOptions : [])]
                    }
                    label="Coupon type"
                    name={`${prefix}coupon_type`}
                    register={register}
                />
                <InputText label="Coupon Amount" error={errors[`${prefix}coupon_amount`]?.message} register={register} type="number" name={`${prefix}coupon_amount`} />
                <ProductCatSelect
                    description="Products that the coupon will be applied to, or that need to be in the cart in order for the coupon to be applied."
                    label="Include Products"
                    name={`${prefix}product_ids`}
                    control={control}
                />
                <ProductCatSelect
                    description="Products that the coupon will not be applied to. This product will not get discounted by this coupon."
                    label="Exclude Products"
                    name={`${prefix}product_exclude_ids`}
                    control={control}
                />
                <ProductCatSelect
                    description="Categories that the coupon will be applied to, or that need to be in the cart in order for the coupon to be applied."
                    label="Include Categories"
                    name={`${prefix}product_categories`}
                    control={control}
                />
                <ProductCatSelect
                    description="Categories that the coupon will not be applied to. This product will not get discounted by this coupon."
                    label="Exclude Categories"
                    name={`${prefix}exclude_product_categories`}
                    control={control}
                />
                {expand && (
                    <>
                        <ToggleField
                            register={register}
                            name={`${prefix}free_shipping`}
                            label="Free Shipping"
                            description="Check this box if the coupon grants free shipping. A free shipping method must be enabled in your shipping zone."
                        />
                        <ToggleField
                            register={register}
                            name={`${prefix}individual_use`}
                            label="Individual Use"
                            description="Check this box if the coupon cannot be used in conjunction with other coupons."
                        />
                        <InputText
                            type="number"
                            label="Minimum Order"
                            description="Define minimum order subtotal in order for coupon to work."
                            error={errors[`${prefix}min_order`]?.message}
                            register={register}
                            name={`${prefix}min_order`}
                        />
                        <InputText
                            type="number"
                            label="Coupon Duration"
                            description="How many days coupon should last, just type number, like: 30. Leave empty for no duration."
                            error={errors[`${prefix}coupon_amount`]?.message}
                            register={register}
                            name={`${prefix}coupon_duration`}
                        />
                        <InputText
                            type="number"
                            label="Limit usage to X Items"
                            description="The maximum number of individual items this coupon can apply to when using product discounts. Leave blank to apply to all qualifying items in cart."
                            error={errors[`${prefix}limit_usage`]?.message}
                            register={register}
                            name={`${prefix}limit_usage`}
                        />
                        {type === 'advocate' && (
                            <InputText
                                type="number"
                                label="Generate Coupon on every X Order"
                                description="By default, coupons are generated on every referral order. If you want to generate on every three orders. Place number 3. Leave empty for default every order."
                                error={errors[`${prefix}nth_coupon`]?.message}
                                register={register}
                                name={`${prefix}nth_coupon`}
                            />
                        )}
                        <ToggleField
                            register={register}
                            name={`${prefix}exclude_sale_items`}
                            label="Exclude sale items"
                            description="Check this box if the coupon should not apply to items on sale."
                        />
                    </>
                )}
            </div>
            {!expand && (
                <div className="block text-right">
                    <button onClick={() => setExpand(true)} className="text-blue-500 hover:no-underline underline text-sm">
                        Show advance options
                    </button>
                </div>
            )}
            {expand && (
                <div className="block text-right">
                    <button onClick={() => setExpand(false)} className="text-blue-500 hover:no-underline underline text-sm">
                        Show less options
                    </button>
                </div>
            )}
        </>
    );
}

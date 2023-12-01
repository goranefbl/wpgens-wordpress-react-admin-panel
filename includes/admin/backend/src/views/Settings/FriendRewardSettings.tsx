/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import InlineError from '@/components/InlineError/InlineError';
import Alert from '@/components/Alert/Alert';
import { setGeneralSettings, getGeneralSettings } from '@/services/settings.service';
import WooCoupons, { FriendRewardSettingsForm, FriendRewardSettingsRequest } from '@/components/WooCoupons/WooCoupons';
import ToggleField from '@/components/Form/ToggleField/ToggleField';
import InputText from '@/components/Form/InputText/InputText';
import TextArea from '@/components/Form/TextArea/TextArea';
import { emptyStringToNull } from '@/utils/helpers';
import Loader from '@/components/Loader/Loader';

const schema = yup
    .object()
    .shape({
        gens_raf_friend_coupon_type: yup.string().optional(),
        gens_raf_friend_coupon_amount: yup.number().transform(emptyStringToNull).nullable(),
        gens_raf_friend_product_ids: yup.array().of(
            yup.object().shape({
                value: yup.number().required(),
                label: yup.string().required(),
            })
        ),
        gens_raf_friend_product_exclude_ids: yup.array().of(
            yup.object().shape({
                value: yup.number().required(),
                label: yup.string().required(),
            })
        ),
        gens_raf_friend_product_categories: yup.array().of(
            yup.object().shape({
                value: yup.number().required(),
                label: yup.string().required(),
            })
        ),
        gens_raf_friend_exclude_product_categories: yup.array().of(
            yup.object().shape({
                value: yup.number().required(),
                label: yup.string().required(),
            })
        ),
        gens_raf_friend_coupon_duration: yup.number().transform(emptyStringToNull).nullable(),
        gens_raf_friend_min_order: yup.number().transform(emptyStringToNull).nullable(),
        gens_raf_friend_individual_use: yup.boolean().optional(),
        gens_raf_friend_exclude_sale_items: yup.boolean().optional(),
        gens_raf_friend_free_shipping: yup.boolean().optional(),
        gens_raf_friend_limit_usage: yup.number().transform(emptyStringToNull).nullable(),
        gens_raf_friend_nth_coupon: yup.number().transform(emptyStringToNull).nullable(),
    })
    .required();

export default function FriendRewardSettings() {
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        control,
        watch,
        formState: { errors },
    } = useForm<FriendRewardSettingsForm>({
        resolver: yupResolver(schema),
    });

    const friendRewardAfterPurchase = watch('gens_raf_friend_enable');
    const friendRewardDuringPurchase = watch('gens_raf_guest_enable');

    const { data: settings, isLoading }: { data: FriendRewardSettingsRequest | undefined; isLoading: boolean } = useQuery('wpgens-friend-settings', getGeneralSettings);

    useEffect(() => {
        // Formating product/cats, they are saved as 1,2,3 in DB while we need object{value:x,label:x}
        if (settings) {
            const { gens_raf_friend_product_ids, gens_raf_friend_product_exclude_ids, gens_raf_friend_product_categories, gens_raf_friend_exclude_product_categories, ...rest } = settings;
            const wooProducts = window.gens_raf_object.products;
            const wooCats = window.gens_raf_object.cats;

            const formatted: FriendRewardSettingsForm = { ...rest };

            if (formatted) {
                // Format Product IDs
                formatted['gens_raf_friend_product_ids'] =
                    settings['gens_raf_friend_product_ids']?.split(',').map((id) => ({ value: parseInt(id), label: wooProducts.find((p) => p.value === parseInt(id))?.label || '' })) || [];
                // Format Excluded Product IDs
                formatted['gens_raf_friend_product_exclude_ids'] =
                    settings['gens_raf_friend_product_exclude_ids']?.split(',').map((id) => ({ value: parseInt(id), label: wooProducts.find((p) => p.value === parseInt(id))?.label || '' })) || [];
                // Format Category IDs
                formatted['gens_raf_friend_product_categories'] =
                    settings['gens_raf_friend_product_categories']?.split(',').map((id) => ({ value: parseInt(id), label: wooCats.find((p) => p.value === parseInt(id))?.label || '' })) || [];
                // Format Excluded Category IDs
                formatted['gens_raf_friend_exclude_product_categories'] =
                    settings['gens_raf_friend_exclude_product_categories']?.split(',').map((id) => ({ value: parseInt(id), label: wooCats.find((p) => p.value === parseInt(id))?.label || '' })) || [];

                reset(formatted);
            }
        }
    }, [settings]);

    const {
        isSuccess,
        mutate,
        isLoading: submitLoading,
    } = useMutation<any, void, FriendRewardSettingsForm, () => void>(setGeneralSettings, {
        onSuccess: () => {},
        onError: (err: unknown) => {
            if (err instanceof Error) {
                setError(err?.message);
            } else {
                setError('Something went wrong. Please try again or contact support.');
            }
        },
    });

    const formatBeforeSubmit = (d) => {
        d['gens_raf_friend_product_ids'] = d['gens_raf_friend_product_ids'].map((v) => v.value).join(',');
        d['gens_raf_friend_product_exclude_ids'] = d['gens_raf_friend_product_exclude_ids'].map((v) => v.value).join(',');
        d['gens_raf_friend_product_categories'] = d['gens_raf_friend_product_categories'].map((v) => v.value).join(',');
        d['gens_raf_friend_exclude_product_categories'] = d['gens_raf_friend_exclude_product_categories'].map((v) => v.value).join(',');
        mutate(d);
    };

    if (isLoading) {
        return (
            <div className="text-center">
                <Loader />
                <div>Loading Screen...</div>
            </div>
        );
    }

    return (
        <form className="max-w-5xl px-6" onSubmit={handleSubmit(formatBeforeSubmit, (err) => console.log(err))}>
            <header className="mb-8">
                <h2 className="text-2xl font-bold">Friend Reward</h2>
                <span className="text-sm block mt-1">
                    Reward issued to user coming via referral link or referral code. You can give discount during first purchase, or AFTER he makes a purchase, you can send him a coupon code. Select
                    in the options below.
                </span>
            </header>
            <div className="flex flex-col mb-8">
                <div className="flex flex-col justify-between items-center bg-white p-6 rounded-xl border border-gray-200 mb-4 w-full">
                    <ToggleField
                        register={register}
                        name="gens_raf_guest_enable"
                        label="First Purchase Discount"
                        description="With this option, a discount will be automatically applied when the referred user reaches the cart or checkout screen during their first purchase."
                    />
                    <ToggleField
                        register={register}
                        name="gens_raf_friend_enable"
                        label="Post-First Purchase Coupon"
                        description="Choose this option to issue a coupon to the user after they have successfully completed their first order. The coupon will be provided to them as a reward for their initial purchase, encouraging them to return and make future purchases."
                    />
                </div>
            </div>

            {friendRewardDuringPurchase && (
                <div className="flex flex-col mb-8">
                    <div className=" mb-2 pr-2">
                        <h3 className="mb-0 font-bold text-lg">First Purchase Discount</h3>
                        <span className="text-sm block pr-4">If enabled, this coupon will be automatically applied to the referred user first purchase.</span>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 mb-4 w-full">
                        <InputText
                            label="Coupon Code"
                            description="Go to WooCommerce coupons page and manually create a coupon, choose options you want and make sure it does not have limit or email restriction. Then put coupon code in the textbox below and save. Coupon code will not show to the user once applied."
                            error={errors.gens_raf_guest_coupon_code?.message}
                            register={register}
                            name="gens_raf_guest_coupon_code"
                        />
                        <TextArea
                            label="Cart Message"
                            description="This is the message that will be shown at the cart page when coupon is automatically applied."
                            error={errors.gens_raf_guest_coupon_message?.message}
                            register={register}
                            name="gens_raf_guest_coupon_message"
                        />
                    </div>
                </div>
            )}

            {friendRewardAfterPurchase && (
                <div className="flex flex-col mb-8">
                    <div className=" mb-2 pr-2">
                        <h3 className="mb-0 font-bold text-lg">Post-First Purchase Coupon</h3>
                        <span className="text-sm block pr-4">If enabled, this coupon will be sent after referred user makes a purchase and order is marked as completed.</span>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 mb-4 w-full">
                        <WooCoupons subscriptionActive={!!settings?.gens_raf_subscription} errors={errors} register={register} control={control} type="friend" />
                    </div>
                </div>
            )}

            {isSuccess && <Alert message="Settings Saved." type="success" />}
            {error && <InlineError error={error} />}
            <div className="text-right">
                <button type="submit" disabled={submitLoading} className="btn-primary mt-2">
                    Save
                </button>
            </div>
        </form>
    );
}

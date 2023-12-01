/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import InlineError from '@/components/InlineError/InlineError';
import ToggleField from '@/components/Form/ToggleField/ToggleField';
import Alert from '@/components/Alert/Alert';
import InputText from '@/components/Form/InputText/InputText';
import { setGeneralSettings, getGeneralSettings } from '@/services/settings.service';
import TextArea from '@/components/Form/TextArea/TextArea';
import Loader from '@/components/Loader/Loader';

export type DisplaySettingsRequest = {
    gens_raf_tabs_disable?: boolean;
    gens_raf_share_text?: string;
    gens_raf_guest_text?: string;

    gens_raf_my_account_url?: string;
    gens_raf_myaccount_text?: string;

    gens_raf_twitter_via?: string;
    gens_raf_twitter_title?: string;
    gens_raf_whatsapp?: boolean;
    gens_raf_viber?: boolean;
    gens_raf_linkedin?: boolean;
    gens_raf_pinterest?: boolean;
};

const schema = yup
    .object()
    .shape({
        gens_raf_tabs_disable: yup.boolean().optional(),
        gens_raf_share_text: yup.string(),
        gens_raf_guest_text: yup.string(),

        gens_raf_my_account_url: yup.string().url(),
        gens_raf_myaccount_text: yup.string(),

        gens_raf_twitter_via: yup.string(),
        gens_raf_twitter_title: yup.string(),
        gens_raf_whatsapp: yup.boolean().optional(),
        gens_raf_viber: yup.boolean().optional(),
        gens_raf_linkedin: yup.boolean().optional(),
        gens_raf_pinterest: yup.boolean().optional(),
    })
    .required();

export default function DisplaySettings() {
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<DisplaySettingsRequest>({
        resolver: yupResolver(schema),
    });

    const { data: generalSettings, isLoading } = useQuery('wpgens-display-settings', getGeneralSettings);

    useEffect(() => {
        if (generalSettings) {
            reset(generalSettings as DisplaySettingsRequest);
        }
    }, [generalSettings]);

    const {
        isSuccess,
        isLoading: submitLoading,
        mutate,
    } = useMutation<any, void, DisplaySettingsRequest, () => void>(setGeneralSettings, {
        onSuccess: () => {},
        onError: (err: unknown) => {
            if (err instanceof Error) {
                setError(err?.message);
            } else {
                setError('Something went wrong. Please try again or contact support.');
            }
        },
    });

    if (isLoading) {
        return (
            <div className="text-center">
                <Loader />
                <div>Loading Screen...</div>
            </div>
        );
    }

    return (
        <form
            className="max-w-5xl px-6"
            onSubmit={handleSubmit(
                (d) => mutate(d),
                (err) => setError(JSON.stringify(err))
            )}
        >
            <header className="mb-8">
                <h2 className="text-2xl font-bold">Display Settings</h2>
            </header>
            <div className="flex flex-col md:flex-row mb-8">
                <div className="md:basis-1/5 mb-2 pr-2">
                    <h3 className="mb-0 font-bold text-lg">My Account Page</h3>
                    <span className="text-sm block pr-4">Settings for My Account Refer a Friend tab.</span>
                </div>
                <div className="md:basis-4/5">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 mb-4">
                        <InputText
                            label="My Account Page Share Link"
                            placeholder=""
                            description="Page URL that is used for refer a friend link in my account page. Leave empty for home page."
                            error={errors.gens_raf_my_account_url?.message}
                            register={register}
                            name="gens_raf_my_account_url"
                        />
                        <TextArea
                            label="Description Text"
                            description="Text that is shown above share icons. HTML allowed"
                            error={errors.gens_raf_myaccount_text?.message}
                            register={register}
                            name="gens_raf_myaccount_text"
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row mb-8">
                <div className="md:basis-1/5 mb-2 pr-2">
                    <h3 className="mb-0 font-bold text-lg">Single Product</h3>
                    <span className="text-sm block pr-4">Refer a friend will show on single product pages as tab. Use settings here to change this.</span>
                </div>
                <div className="md:basis-4/5">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 mb-4">
                        <ToggleField register={register} name="gens_raf_tabs_disable" label="Hide on Product Tabs" description="Check to disable showing referral links on product single pages." />
                        <TextArea
                            label="Description Text"
                            description="Text that is shown on Refer a Friend Product Tab, above share icons. HTML allowed."
                            error={errors.gens_raf_share_text?.message}
                            register={register}
                            name="gens_raf_share_text"
                        />
                        <TextArea
                            label="Text to show when user is not logged in."
                            description="If you enable guest feature, this text will show for them on single product pages."
                            error={errors.gens_raf_guest_text?.message}
                            register={register}
                            name="gens_raf_guest_text"
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row mb-8">
                <div className="md:basis-1/5 mb-2 pr-2">
                    <h3 className="mb-0 font-bold text-lg">Share Settings</h3>
                </div>
                <div className="md:basis-4/5">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 mb-4">
                        <InputText label="Twitter via (without @)" description="" error={errors.gens_raf_twitter_via?.message} register={register} name="gens_raf_twitter_via" />
                        <InputText
                            label="Twitter & WhatsUp Title"
                            placeholder=""
                            description="Default Text that will appear as a title in Twitter and WhatsUp. User can change this manualy."
                            error={errors.gens_raf_twitter_title?.message}
                            register={register}
                            name="gens_raf_twitter_title"
                        />
                        <ToggleField register={register} name="gens_raf_whatsapp" label="Desktop WhatsApp Share." description="Mobile share is always available on mobile." />
                        <ToggleField register={register} name="gens_raf_viber" label="Share via Viber" />
                        <ToggleField register={register} name="gens_raf_linkedin" label="Share via Linkedin" />
                        <ToggleField register={register} name="gens_raf_pinterest" label="Share via Pinterest" />
                    </div>
                </div>
            </div>
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

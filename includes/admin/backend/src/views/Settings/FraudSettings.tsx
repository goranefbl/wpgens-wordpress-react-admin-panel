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
import Loader from '@/components/Loader/Loader';

export type FraudSettingsRequest = {
    gens_raf_fraud_disable_ip?: boolean;
    gens_raf_allow_existing?: boolean;
    gens_raf_fraud_disable_street?: boolean;
    gens_raf_fraud_email_address?: string;
};

const schema = yup
    .object()
    .shape({
        gens_raf_fraud_disable_ip: yup.boolean().optional(),
        gens_raf_allow_existing: yup.boolean().optional(),
        gens_raf_fraud_disable_street: yup.boolean().optional(),
        gens_raf_fraud_email_address: yup.string().email(),
    })
    .required();

export default function FraudSettings() {
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FraudSettingsRequest>({
        resolver: yupResolver(schema),
    });

    const { data: generalSettings, isLoading } = useQuery('wpgens-fraud-settings', getGeneralSettings);

    useEffect(() => {
        if (generalSettings) {
            reset(generalSettings as FraudSettingsRequest);
        }
    }, [generalSettings]);

    const {
        isSuccess,
        isLoading: submitLoading,
        mutate,
    } = useMutation<any, void, FraudSettingsRequest, () => void>(setGeneralSettings, {
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
                (err) => console.log(err)
            )}
        >
            <header className="mb-8">
                <h2 className="text-2xl font-bold">Fraud Prevention</h2>
                <span className="text-sm block mt-1">
                    By default, all fraud prevention rules are turned on. If you are testing, you can disable any rule, but for production, we suggest to keep these options off.
                </span>
            </header>
            <div className="flex flex-col md:flex-row mb-8">
                <div className="md:basis-1/5 mb-2 pr-2">
                    <h3 className="mb-0 font-bold text-lg">Fraud Rules</h3>
                    <span className="text-sm block pr-4">If you are unable to test referral settings, you can disable fraud check.</span>
                </div>
                <div className="md:basis-4/5">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 mb-4">
                        <ToggleField
                            register={register}
                            name="gens_raf_fraud_disable_ip"
                            label="Disable IP check	"
                            description="Check this box to disable IP check when user is creating the order via referral link."
                        />
                        <ToggleField
                            register={register}
                            name="gens_raf_allow_existing"
                            label="Disable Email check"
                            description="Check this to allow customers that already have orders on your site to get discount when coming via referral link. If you tick this box, customers will be able to use referral link every time to get a discount. You do not want this turned on unless you are testing or know what you are doing."
                        />
                        <ToggleField
                            register={register}
                            name="gens_raf_fraud_disable_street"
                            label="Disable Street Address check	"
                            description="Check this box to disable Street Address check when user is creating the order via referral link."
                        />

                        <InputText
                            label="Fraud email address"
                            placeholder=""
                            description="If not set, it will be sent to admin email address set under WordPress General Settings."
                            error={errors.gens_raf_fraud_email_address?.message}
                            register={register}
                            name="gens_raf_fraud_email_address"
                        />
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

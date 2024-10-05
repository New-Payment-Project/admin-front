import React from 'react';
import AnimatedCounter from '../AnimatedCounter/AnimatedCounter';
import DoughnutChart from '../DoughnutChart/DoughnutChart';
import { useTranslation } from 'react-i18next';


const TotalBalanceBox = ({ accoounts = [], totalBanks, totalCurrentBalance }) => {
  const { t } = useTranslation();

    return (
        <section className='total-balance overflow-hidden max-w-full mx-auto p-4'>
            <div className='flex flex-col md:flex-row justify-between items-start gap-6'>
                <div className='total-balance-chart w-full md:w-1/2'>
                    <DoughnutChart accoounts={accoounts} />
                </div>
                <div className='flex flex-col gap-6 w-full md:w-1/2'>
                    <h2 className='header-2'>
                        {t('bank-accounts')}: {totalBanks}
                    </h2>
                    <div className='flex flex-col gap-2'>
                        <p className='total-balance-label'>
                            {t('total-balance')}
                        </p>
                        <div className='total-balance-amount flex-center gap-2'>
                            <AnimatedCounter amount={totalCurrentBalance} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TotalBalanceBox;

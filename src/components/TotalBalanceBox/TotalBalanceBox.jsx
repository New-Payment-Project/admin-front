import React from 'react';
import AnimatedCounter from '../AnimatedCounter/AnimatedCounter';
import DoughnutChart from '../DoughnutChart/DoughnutChart';
import { useTranslation } from 'react-i18next';

const TotalBalanceBox = ({ accoounts = [], totalBanks, totalCurrentBalance, loading, paymentData }) => {
  const { t } = useTranslation();

  return (
    <section className='total-balance overflow-hidden max-w-full mx-auto p-4'>
      <div className='flex flex-col md:flex-row justify-between items-start gap-6'>
        <div className='total-balance-chart w-full md:w-1/2'>
          {loading ? (
            <div className="skeleton h-32 w-32 rounded-full bg-gray-300 animate-pulse"></div>
          ) : (
            <DoughnutChart paymentData={paymentData} /> 
          )}
        </div>
        <div className='flex flex-col gap-6 w-full'>
          <h2 className='header-2 xl:flex max-w-full'>
            {t('bank-accounts')}: {totalBanks}
          </h2>
          <div className='flex flex-col gap-2'>
            <p className='total-balance-label'>
              {t('total-balance')}
            </p>
            <div className='total-balance-amount w-full min-w-[100%] flex-center gap-2'>
              {loading ? (
                <div className="skeleton h-8 w-full  bg-gray-300 animate-pulse"></div>
              ) : (
                <AnimatedCounter amount={totalCurrentBalance}/>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
  
export default TotalBalanceBox;

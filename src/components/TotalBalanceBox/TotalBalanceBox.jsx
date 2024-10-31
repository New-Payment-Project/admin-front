import React from 'react';
import AnimatedCounter from '../AnimatedCounter/AnimatedCounter';
import DoughnutChart from '../DoughnutChart/DoughnutChart';
import { useTranslation } from 'react-i18next';

const TotalBalanceBox = ({ accounts = [], totalBanks, totalCurrentBalance, loading, paymentData }) => {
  const { t } = useTranslation();

  return (
    <section className='total-balance overflow-hidden max-w-full mx-auto p-4'>
      <div className='flex flex-col sm:flex-row justify-between w-full items-start gap-6'>
        {/* Chart Section */}
        <div className='total-balance-chart w-full md:w-1/2'>
          {loading ? (
            <div className="skeleton h-24 lg:h-32 w-32 rounded-full bg-gray-300 animate-pulse"></div>
          ) : (
            <DoughnutChart paymentData={paymentData} /> 
          )}
        </div>

        {/* Balance Section */}
        <div className='flex flex-col gap-6 w-full'>
          <h2 className='header-2 xl:flex max-w-full'>
            {t('bank-accounts')}: {totalBanks}
          </h2>
          
          {/* Counters Row */}
          <div className='total-balance-amount w-full flex flex-col sm:flex-row gap-7 items-start'>
            {loading ? (
              <>
                {/* Skeleton for Total Balance */}
                <div className='flex flex-col items-start w-1/2 gap-2'>
                  <div className="skeleton h-4 w-20 bg-gray-300 animate-pulse"></div> {/* Label skeleton */}
                  <div className="skeleton h-6 w-[180px] bg-gray-300 animate-pulse"></div> {/* Counter skeleton */}
                </div>

                {/* Skeleton for Total Profit */}
                <div className='flex flex-col items-start w-1/2 gap-2'>
                  <div className="skeleton h-4 w-20 bg-gray-300 animate-pulse"></div> {/* Label skeleton */}
                  <div className="skeleton h-6 w-[180px] bg-gray-300 animate-pulse"></div> {/* Counter skeleton */}
                </div>
              </>
            ) : (
              <>
                {/* Total Balance Counter */}
                <div className='flex flex-col items-start'>
                  <p className='total-balance-label'>
                    {t('total-balance')}
                  </p>
                  <AnimatedCounter amount={(totalCurrentBalance / 100)} />
                </div>

                {/* Total Profit Counter */}
                <div className='flex flex-col items-start'>
                  <p className='total-balance-label'>
                    {t('total-profit')}
                  </p>
                  <AnimatedCounter amount={(totalCurrentBalance / 100 / 100 * 98)} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;

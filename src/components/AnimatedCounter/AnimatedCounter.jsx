import React from 'react'
import CountUp from 'react-countup'

const AnimatedCounter = ({ amount, loading }) => {
    return (
        <div className='w-full flex'>
            {loading ? (
                <span className="w-full min-w-[80%] skeleton h-6 bg-gray-300 animate-pulse"></span>
            ) : (
                <span className='pr-2 text-xl lg:text-2xl'>
                    <CountUp
                        end={amount}
                        duration={0.675}
                        separator=' '
                        decimals={0}
                        decimal=','
                    />
                </span>
            )}
            <span className='text-xl lg:text-2xl'>UZS</span>
        </div>
    )
}

export default AnimatedCounter;

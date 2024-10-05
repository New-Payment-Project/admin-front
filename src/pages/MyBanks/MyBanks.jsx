import React, { useEffect, useState } from 'react';

const MyBanks = () => {
    const [merchantTransId, setMerchantTransId] = useState('');
    const [merchantCardType, setMerchantCardType] = useState('UZCARD'); // или 'HUMO'

    useEffect(() => {
        // Генерация уникального идентификатора для каждой транзакции
        const transactionId = 'ORD-' + new Date().getTime();
        setMerchantTransId(transactionId);
    }, []);

    return (
        <form method="post" action="http://localhost:3000">
            <script
                src="https://my.click.uz/pay/checkout.js"
                className="uzcard_payment_button"
                data-service-id="37390"
                data-merchant-id="12110"
                data-transaction-param={merchantTransId}
                data-merchant-user-id="46320"
                data-amount="1000"
                data-card-type={merchantCardType}
                data-label="Оплатить"
            ></script>
        </form>
    );
};

export default MyBanks;

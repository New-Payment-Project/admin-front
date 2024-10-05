import React from 'react';

const MyBanks = () => {
  const handlePayment = (event) => {
    event.preventDefault();

    const service_id = "37390";
    const merchant_id = "12110";
    const transaction_param = "ORD-" + new Date().getTime();
    const merchant_user_id = "46320";
    const amount = "800000";
    const return_url = "http://localhost:3000";

    const paymentUrl = `https://my.click.uz/services/pay/?service_id=${service_id}&merchant_id=${merchant_id}&merchant_user_id=${merchant_user_id}&transaction_param=${transaction_param}&amount=${amount}&return_url=${encodeURIComponent(return_url)}`;

    window.location.href = paymentUrl;
  };

  return (
    <div>
      <section>
        <button
          onClick={handlePayment}
          style={{
            cursor: 'pointer',
            border: '1px solid #ebebeb',
            borderRadius: '6px',
            background: 'linear-gradient(to top, #f1f2f2, white)',
            width: '100px',
            height: '54px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            style={{ width: '100px', height: '42px' }}
            src="https://your-image-link.com"
            alt="Pay"
          />
        </button>
      </section>

      <section>
        <form method="GET" action="https://www.uzumbank.uz/open-service?serviceId=498614016">
          {/* Use sandbox URL if available */}

          {/* Test cashier number */}
          <input type="hidden" name="cash" value="5000" />

          {/* Redirect URL after successful payment */}
          <input type="hidden" name="redirectUrl" value="http://localhost:3000/" />

          {/* Description shown to the user */}
          <input type="hidden" name="description" value="Test Payment for Product XYZ" />

          {/* Additional data for testing */}
          <input type="hidden" name="extraData" value="TestData123" />

          <button type="submit" style={{
            cursor: 'pointer',
            border: '1px solid #ebebeb',
            borderRadius: '6px',
            background: 'linear-gradient(to top, #f1f2f2, white)',
            width: '100px',
            height: '54px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img style={{ width: '100px', height: '42px' }} src="https://your-image-link.com" alt="Pay" />
          </button>
        </form>
      </section>
      <section>
        <form method="POST" action="https://checkout.paycom.uz">
          <input type="hidden" name="merchant" value="65cc5f073c319dec9d8ae9d9" />
          <input type="hidden" name="amount" value="200000" />
          <input type="hidden" name="account[name]" value="Karimov Asilbek" />
          <input type="hidden" name="account[phone]" value="+998990663234" />
          <input type="hidden" name="account[payment]" value="1" />
          <input type="hidden" name="account[course_name]" value="Sog'lomlashtirish kursi" />
          <button
            type="submit"
            style={{
              cursor: 'pointer',
              border: '1px solid #ebebeb',
              borderRadius: '6px',
              background: 'linear-gradient(to top, #f1f2f2, white)',
              width: '54px',
              height: '54px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              style={{ width: '42px', height: '42px' }}
              src="http://cdn.payme.uz/buttons/buttonbig_RU.svg"
              alt="Payme Button"
            />
          </button>
        </form>
      </section>
    </div>
  );
};

export default MyBanks;

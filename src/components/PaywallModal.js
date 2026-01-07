import React, { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import api from '../services/api';

function PaywallModal({ show, onHide, userCountry, onPaymentSuccess, isRenewal = false }) {
const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isIndia = userCountry === 'IN';
  const price = isIndia ? '₹99' : '$15';
  const currency = isIndia ? 'INR' : 'USD';

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      // Create order
      const orderResponse = await api.post('/payment/create-order');
      const { orderId, amount, currency, keyId } = orderResponse.data;

      // Initialize Razorpay
      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: 'Snaplet',
        description: isRenewal ? 'Subscription Renewal' : 'Annual Subscription',
        order_id: orderId,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await api.post('/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyResponse.data.success) {
  onPaymentSuccess();
  alert(
    isRenewal
      ? 'Subscription renewed successfully! Your premium access has been extended.'
      : 'Payment successful! You now have unlimited uploads.'
  );
}

          } catch (err) {
            setError('Payment verification failed');
          }
        },
        prefill: {
          email: ''
        },
        theme: {
          color: '#66ead4ff'
        }
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on('payment.failed', function () {
        setError('Payment failed. Please try again.');
      });

      razorpay.open();
    } catch (err) {
      setError('Failed to initiate payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
      <Modal.Title>
  {isRenewal ? 'Renew Subscription' : 'Upgrade to Unlimited'}
</Modal.Title>

      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <div className="text-center mb-4">
  <p>
    {isRenewal
      ? 'Continue enjoying unlimited access and premium features.'
      : 'Upgrade now to get unlimited uploads and searches.'}
  </p>
</div>


        <div className="price-display">
          <div className="price-amount">{price}</div>
          <div className="price-period">/year</div>
        </div>

        <ul className="list-unstyled mt-4">
          <li className="mb-2">✅ Unlimited file uploads</li>
          <li className="mb-2">✅ Smart auto-folders for every upload</li>
          <li className="mb-2">✅ Secure cloud storage</li>
          <li className="mb-2">✅ Priority support</li>
           <li className="mb-2">✅Files instantly organized into Payments, Jobs, Education, Travel & more</li>
          <li className="mb-2">✅ Folder tabs to find anything in seconds</li>
        </ul>
      </Modal.Body>

      <Modal.Footer>
       <Button variant="secondary" onClick={onHide}>
  {isRenewal ? 'Later' : 'Maybe Later'}
</Button>


        <Button
          variant="primary"
          className="btn-gradient"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? 'Processing...' : `Pay ${price}`}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PaywallModal;

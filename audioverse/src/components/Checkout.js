import React, { useState } from 'react';
import styles from '../styles/Checkout.module.css';

const Checkout = ({ book, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedOffers, setSelectedOffers] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');

  const offers = [
    {
      id: 'bundle',
      title: 'Audio + eBook Bundle',
      description: 'Get both audio and eBook versions at a discounted price',
      price: 14.99,
      savings: 5.99
    },
    {
      id: 'premium',
      title: 'Premium Edition',
      description: 'Includes exclusive author commentary and bonus content',
      price: 19.99,
      savings: 7.99
    }
  ];

  const handleOfferToggle = (offerId) => {
    setSelectedOffers(prev => 
      prev.includes(offerId) 
        ? prev.filter(id => id !== offerId)
        : [...prev, offerId]
    );
  };

  const calculateTotal = () => {
    const basePrice = parseFloat(book.price);
    const offersTotal = selectedOffers.reduce((total, offerId) => {
      const offer = offers.find(o => o.id === offerId);
      return total + (offer ? parseFloat(offer.price) : 0);
    }, 0);
    return (basePrice + offersTotal).toFixed(2);
  };

  const renderStep1 = () => (
    <div className={styles.step}>
      <div className={styles.progress}>
        <div className={styles.steps}>
          <span className={`${styles.stepIndicator} ${styles.active}`}>1. Offers</span>
          <span className={styles.stepIndicator}>2. Payment</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.stepHeader}>
          <h2>Special Offers</h2>
          <p>Enhance your reading experience with these exclusive offers</p>
        </div>

        <div className={styles.offers} style={{ padding: '5px', marginBottom: '2px' }}>
          {offers.map(offer => (
            <div
              key={offer.id}
              className={`${styles.offer} ${selectedOffers.includes(offer.id) ? styles.selected : ''}`}
              onClick={() => handleOfferToggle(offer.id)}
            >
              <div className={styles.offerHeader}>
                <h3>{offer.title}</h3>
                <span className={styles.savings}>Save ₹{offer.savings}</span>
              </div>
              <div className={styles.offerPrice}>₹{offer.price}</div>
              <p className={styles.offerDescription}>{offer.description}</p>
              <div className={styles.offerCheck}>
                {selectedOffers.includes(offer.id) ? '✓' : '+'}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.totalSection}>
          <span className={styles.totalLabel}>Total:</span>
          <span className={styles.totalAmount}>₹{calculateTotal()}</span>
        </div>

        <div className={styles.stepActions}>
          <button className={styles.nextButton} onClick={() => setStep(2)}>
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className={styles.step}>
      <div className={styles.progress}>
        <div className={styles.steps}>
          <span className={styles.stepIndicator}>1. Offers</span>
          <span className={`${styles.stepIndicator} ${styles.active}`}>2. Payment</span>
        </div>
      </div>

      <div className={styles.content}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <div className={styles.stepHeader}>
          <h2>Payment Method</h2>
          <p>Choose your preferred payment method</p>
        </div>

        <div className={styles.paymentMethods} style={{ padding: '5px', marginBottom: '2px' }}>
          {[
            { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
            { id: 'paypal', name: 'PayPal', icon: '🌐' },
            { id: 'gpay', name: 'Google Pay', icon: '📱' }
          ].map(method => (
            <div
              key={method.id}
              className={`${styles.paymentMethod} ${paymentMethod === method.id ? styles.selected : ''}`}
              onClick={() => setPaymentMethod(method.id)}
            >
              <span className={styles.paymentIcon}>{method.icon}</span>
              <span className={styles.paymentName}>{method.name}</span>
              <div className={styles.paymentCheck}>
                {paymentMethod === method.id ? '✓' : ''}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.orderSummary}>
          <h3>Order Summary</h3>
          <div className={styles.summaryItem}>
            <span>{book.title}</span>
            <span>₹{book.price}</span>
          </div>
          {selectedOffers.map(offerId => {
            const offer = offers.find(o => o.id === offerId);
            return (
              <div key={offerId} className={styles.summaryItem}>
                <span>{offer.title}</span>
                <span className={styles.addedAmount}>+₹{offer.price}</span>
              </div>
            );
          })}
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>₹{calculateTotal()}</span>
          </div>
        </div>

        <div className={styles.stepActions}>
          <button className={styles.backButton} onClick={() => setStep(1)}>
            Back to Offers
          </button>
          <button 
            className={styles.payButton} 
            disabled={!paymentMethod}
            onClick={() => alert('Payment processing would be implemented here')}
          >
            Pay ₹{calculateTotal()}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        {step === 1 ? renderStep1() : renderStep2()}
      </div>
    </div>
  );
};

export default Checkout;

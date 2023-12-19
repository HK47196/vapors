import React, { useState } from 'react';
import styles from './PriceSlider.module.css';

interface PriceSliderProps {
  maxPrice: number;
  onPriceChange: (max: number) => void;
}

const PriceSlider = ({ maxPrice, onPriceChange }: PriceSliderProps) => {
  const [maxSelectedPrice, setMaxSelectedPrice] = useState(maxPrice);

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxPrice = Math.max(Number(e.target.value), 0);
    setMaxSelectedPrice(newMaxPrice);
    onPriceChange(newMaxPrice);
  };

  let priceMsg = 'Free';
  if(maxSelectedPrice > 0) {
    priceMsg = `Under $${maxSelectedPrice.toFixed(2)}`;
  }

  return (
    <div className={styles.priceSlider}>
      <input
        type="range"
        min={0}
        max={maxPrice}
        value={maxSelectedPrice}
        onChange={handleMaxPriceChange}
        step={5}
        className={styles.rangeInput}
      />
      <div className={styles.priceDisplay}>
        {priceMsg}
      </div>
    </div>
  );
};

export default PriceSlider;
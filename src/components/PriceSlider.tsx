import React, { useState } from 'react';
import styles from './PriceSlider.module.css';

interface PriceSliderProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
}

const PriceSlider: React.FC<PriceSliderProps> = ({ minPrice, maxPrice, onPriceChange }) => {
  const [minSelectedPrice, setMinSelectedPrice] = useState(minPrice);
  const [maxSelectedPrice, setMaxSelectedPrice] = useState(maxPrice);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinPrice = Math.min(Number(e.target.value), maxSelectedPrice - 1);
    setMinSelectedPrice(newMinPrice);
    onPriceChange(newMinPrice, maxSelectedPrice);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxPrice = Math.max(Number(e.target.value), minSelectedPrice + 1);
    setMaxSelectedPrice(newMaxPrice);
    onPriceChange(minSelectedPrice, newMaxPrice);
  };

  return (
    <div className={styles.priceSlider}>
      <input
        type="range"
        min={minPrice}
        max={maxPrice}
        value={minSelectedPrice}
        onChange={handleMinPriceChange}
        className={styles.rangeInput}
      />
      <input
        type="range"
        min={minPrice}
        max={maxPrice}
        value={maxSelectedPrice}
        onChange={handleMaxPriceChange}
        className={styles.rangeInput}
      />
      <div className={styles.priceDisplay}>
        ${minSelectedPrice} - ${maxSelectedPrice}
      </div>
    </div>
  );
};

export default PriceSlider;
import styles from './PriceSlider.module.css';
import React from "react";

interface PriceSliderProps {
  maxPrice: number,
  maxSelectedPrice: number,
  handleMaxPriceChange: React.ChangeEventHandler<HTMLInputElement> | undefined
}

const PriceSlider = ({ maxPrice, maxSelectedPrice, handleMaxPriceChange }: PriceSliderProps) => {
  // const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newMaxPrice = Math.max(Number(e.target.value), 0);
  //   setMaxSelectedPrice(newMaxPrice);
  //   onPriceChange(newMaxPrice);
  // };

  let priceMsg = 'Free';
  if(maxSelectedPrice > 0) {
    priceMsg = `Under $${maxSelectedPrice.toFixed(2)}`;
  }

  return (
    <div className={styles.priceSliderWrapper}>
      <div className={styles.priceHeader}>
        Narrow by Price
      </div>
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
import { useState } from 'react';
import styles from './Carousel.module.css';

const Carousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.imageWrapper}>
        <div
          className={styles.images}
          style={{ transform: `translateX(calc(-${currentIndex * 75}% + 12.5%))` }}
        >
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Slide ${idx + 1}`}
              className={`${styles.image} ${idx === currentIndex ? styles.active : ''}`}
            />
          ))}
        </div>
        <div className={styles.buttons}>
          <button onClick={handlePrev} className={`${styles.button} ${styles.prevButton}`}>
            &#10094;
          </button>
          <button onClick={handleNext} className={`${styles.button} ${styles.nextButton}`}>
            &#10095;
          </button>
        </div>
      </div>
      <div className={styles.dots}>
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`${styles.dot} ${idx === currentIndex ? styles.active : ''}`}
            onClick={() => goToSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
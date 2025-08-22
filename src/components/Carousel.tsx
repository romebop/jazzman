import { useEffect, useRef, useState } from 'react';
import styles from './Carousel.module.css';

interface Slide {
  src: string;
  text: string;
  date: Date;
}

const Carousel = ({ slides }: { slides: Slide[] }) => {

  const [currIdx, setCurrIdx] = useState(0);

  const direction = useRef(1);

  useEffect(() => {
    const Id = setInterval(() => {
      setCurrIdx(prevIdx => {
        if (prevIdx === slides.length - 1) {
          direction.current = -1;
        } else if (prevIdx === 0) {
          direction.current = 1;
        }
        return prevIdx + direction.current;
      });
    }, 2000);
    return () => clearInterval(Id); 
  }, [slides.length]);

  const handleNext = () => {
    setCurrIdx(prev => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrIdx(prev => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (idx: number) => {
    setCurrIdx(idx);
  };

  const getNumber = (idx: number): string => {
    return String(idx + 1).padStart(2, '0');
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.numbersWindow}>
        <div
          className={styles.numbers}
          style={{ transform: `translateX(-${currIdx * 170}px)` }}
        >
          {slides.map((_, idx) =>
            <div
              key={idx}
              className={`${styles.number} ${idx === currIdx ? styles.active : ''}`}
            >{getNumber(idx)}</div>
          )}
        </div>
      </div>
      <div className={styles.imagesWindow}>
        <div
          className={styles.images}
          style={{ transform: `translateX(-${currIdx * 55}%)` }}
        >
          {slides.map((slide, idx) =>
            <div
              key={idx}
              className={`${styles.imageContainer} ${idx === currIdx ? styles.active : ''}`}
            >
              <img
                src={slide.src}
                className={styles.imageContent}
              />
            </div>
          )}
          <div className={styles.endBox} />
        </div>
      </div>
      <div className={styles.textsWindow}>
        <div
          className={styles.texts}
          style={{ transform: `translateY(-${((slides.length - 1) * 200) - (currIdx * 200)}px)` }}
        >
          {slides.toReversed().map((slide, idx) =>
            <div
              key={idx}
              className={`${styles.text} ${idx === (slides.length - 1 - currIdx) ? styles.active : ''}`}
            >{slide.text}</div>
          )}
        </div>
      </div>
      <div className={styles.datesWindow}>
        <div
          className={styles.dates}
          style={{ transform: `translateY(-${currIdx * 78}px)` }}
        >
          {slides.map((slide, idx) =>
            <div
              key={idx}
              className={styles.date}
            >{formatDate(slide.date)}</div>
          )}
        </div>
      </div>
      <div className={styles.indicators}>
        {slides.map((_, idx) =>
          <div
            key={idx}
            className={`${styles.indicator} ${idx === currIdx ? styles.active : ''}`}
          />
        )}
      </div>
    </div>
  );
};

export default Carousel;
import { useState } from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: auto;
`;

const ImageWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const Images = styled.div<{ translateX: number }>`
  display: flex;
  transform: ${({ translateX }) => `translateX(-${translateX}%)`};
  transition: transform 0.5s ease-in-out;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Dot = styled.button<{ active: boolean }>`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  border-radius: 50%;
  border: none;
  background: ${({ active }) => (active ? 'black' : 'gray')};
  cursor: pointer;
`;

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
    <CarouselContainer>
      <ImageWrapper>
        <Images translateX={currentIndex * 100}>
          {images.map((img, idx) => (
            <Image key={idx} src={img} alt={`Slide ${idx + 1}`} />
          ))}
        </Images>
      </ImageWrapper>
      <Buttons>
        <Button onClick={handlePrev}>Previous</Button>
        <Button onClick={handleNext}>Next</Button>
      </Buttons>
      <Dots>
        {images.map((_, idx) => (
          <Dot
            key={idx}
            active={idx === currentIndex}
            onClick={() => goToSlide(idx)}
          />
        ))}
      </Dots>
    </CarouselContainer>
  );
};

export default Carousel;
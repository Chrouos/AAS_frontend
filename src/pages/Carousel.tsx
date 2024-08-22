import CarouselItem from '../components/CarouselItem';

export default function Carousel() {
  return (
    <>
      <div className="mb-10">
        <h2 className="mb-2">Carousel 1</h2>
        <CarouselItem />
      </div>
      <div className="mb-10">
        <h2 className="mb-2">Carousel 2</h2>
        <CarouselItem />
      </div>
    </>
  );
}

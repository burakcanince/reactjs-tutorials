import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';

function App() {
  const images = [
    {url : 'https://images.pexels.com/photos/4060569/pexels-photo-4060569.jpeg', alt : 'Image 1'}, 
    {url : 'https://images.pexels.com/photos/5601991/pexels-photo-5601991.jpeg', alt : 'Image 2'},
    {url : 'https://images.pexels.com/photos/6483585/pexels-photo-6483585.jpeg', alt : 'Image 3'},
    {url : 'https://images.pexels.com/photos/5232929/pexels-photo-5232929.jpeg', alt : 'Image 4'},
    {url : 'https://images.pexels.com/photos/5797913/pexels-photo-5797913.jpeg', alt : 'Image 5'},
    {url : 'https://images.pexels.com/photos/6102229/pexels-photo-6102229.jpeg', alt : 'Image 6'},
  ];

  return (
    <div className="w-full mx-auto max-w-6xl">
      <Swiper
        slidesPerView={1}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        modules={[Navigation, Pagination, Scrollbar]}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image.url} alt={image.alt} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default App;

'use client'
import React ,{useState}from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import Image from 'next/image'
import { Carousel } from 'antd'
import styled from 'styled-components'

const hairItems = [
  { id: 1, name: 'Argan Oil Shampoo', image: '/images/red-hair.png', price: '$15.99' },
  { id: 2, name: 'Keratin Hair Mask', image: '/images/image3.png', price: '$12.49' },
  { id: 3, name: 'Silk Protein Conditioner', image: '/images/image4.png', price: '$13.99' },
  { id: 4, name: 'Silky Straight Hair Extension', image: '/images/image5.png', price: '$49.99' },
  { id: 5, name: 'Curly Hair Bundle', image: '/images/image6.png', price: '$59.99' },
  { id: 6, name: 'Wavy Lace Front Wig', image: '/images/image2.jpg', price: '$89.99' },
];

function HairCarousel({itemsList}) {
    const [items, setItems] = useState(itemsList?itemsList:hairItems);
  return (
    <Swiper
    // style={{backgroundColor:'transperent', border:'none'}}
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
    //   pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      breakpoints={{
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {hairItems.map(item => (
        <SwiperSlide key={item.id}>
          <CarouselCard style={{ textAlign: 'center' }}>
            <Image src={item.image} alt={item.name} width={200} height={200} style={{boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'}} />
            <h3>{item.name}</h3>
            <p><strong>{item.price}</strong></p>
          </CarouselCard>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

const CarouselCard = styled.div`
    margin:0px;
    padding:0px;
    border: 1px solid #eee;
    border-radius: 8px;
    img{
    border-radius:8px;
    margin:0px;
    padding:0px;
    }
    p{
    color:${({theme})=>theme.colors.primary};
    font-weight:200px;
    }
`

export default HairCarousel

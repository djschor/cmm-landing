import React, { useState } from 'react';
import SwiperCore, { Thumbs, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useStaticQuery, graphql } from 'gatsby';
import Fade from 'react-reveal/Fade';
import Image from 'common/components/Image';
import FeatureBlock from 'common/components/FeatureBlock';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Container from 'common/components/UI/Container';
import { SectionHeader } from '../appCreative.style';
import SectionWrapper, {
  ImageGalleryWrap,
  FeatureContactWrapper,
  FeatureItemWrapper,
} from './featureSlider.style';

SwiperCore.use([Thumbs, Autoplay]);

const FeatureSlider = () => {
  const data = useStaticQuery(graphql`
    query {
      appCreativeJson {
        features {
          title
          slogan
          items {
            id
            thumbnail {
              publicURL
            }
            title
            description
          }
        }
      }
    }
  `);

  const { slogan, title, items } = data.appCreativeJson.features;

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <SectionWrapper>
      <Container>
        <SectionHeader>
          <Fade up>
            <Heading content={title} />
            <Text content={slogan} />
          </Fade>
        </SectionHeader>

        <FeatureContactWrapper>
          <ImageGalleryWrap>
            <Swiper
              thumbs={{ swiper: thumbsSwiper }}
              spaceBetween={0}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
            >
              {items.map((item) => (
                <SwiperSlide
                  className="single__img_slider"
                  key={`slide__thumb${item.id}`}
                >
                  <Image
                    src={item.thumbnail.publicURL}
                    alt={`Slide Thumb${item.id}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </ImageGalleryWrap>
          <FeatureItemWrapper>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={0}
              centeredSlides={true}
              slidesPerView="auto"
              touchRatio="0.2"
              slideToClickedSlide={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
            >
              {items.map((item) => (
                <SwiperSlide
                  className="feature__outer"
                  key={`feature-key${item.id}`}
                >
                  <FeatureBlock
                    iconPosition="left"
                    icon={item.id}
                    title={<Heading as="h3" content={item.title} />}
                    description={<Text content={item.description} />}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </FeatureItemWrapper>
        </FeatureContactWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default FeatureSlider;

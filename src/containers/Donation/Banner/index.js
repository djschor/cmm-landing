import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Text from 'common/components/Text';
import Image from 'common/components/Image';
import Button from 'common/components/Button';
import Heading from 'common/components/Heading';
import Container from 'common/components/UI/Container';
import Section, {
  ContentWrapper,
  BannerContent,
  Illustration,
  ButtonGroup,
  TrustedBy,
  ImageGroup,
} from './banner.style';

const Banner = () => {
  const images = useStaticQuery(graphql`
    query {
      paypal: file(relativePath: { eq: "image/donation/banner/paypal.png" }) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      google: file(relativePath: { eq: "image/donation/banner/google.png" }) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      dropbox: file(relativePath: { eq: "image/donation/banner/dropbox.png" }) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  return (
    <Section id="home">
      <ContentWrapper>
        <Container>
          <BannerContent>
            <Heading
              as="h1"
              content="Stay home, be safe &amp; donate helpless"
            />
            <Text
              className="banner-caption"
              content="There will be a day–in our lifetime–when we get to celebrate every person on the planet having access to clean water. We want to celebrate that day with you."
            />
            <ButtonGroup>
              <Button title="Make a Donation" />
              <Button title="Invite Others" className="button-white" />
            </ButtonGroup>
            <TrustedBy>
              <Text content="Trusted by:" />
              <ImageGroup>
                <Image
                  src={images.paypal.childImageSharp.fluid.src}
                  alt="Paypal"
                />
                <Image
                  src={images.google.childImageSharp.fluid.src}
                  alt="Google"
                />
                <Image
                  src={images.dropbox.childImageSharp.fluid.src}
                  alt="Dropbox"
                />
              </ImageGroup>
            </TrustedBy>
          </BannerContent>
        </Container>
        <Illustration />
      </ContentWrapper>
    </Section>
  );
};

export default Banner;

import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Image from 'common/components/Image';
import { Icon } from 'react-icons-kit';
import { ic_check_circle } from 'react-icons-kit/md/ic_check_circle';
import { closeCircled } from 'react-icons-kit/ionicons/closeCircled';
import Container from 'common/components/UI/Container';
import Button from 'common/components/Button';
import { SectionHeader } from '../appCreative.style';
import illustration from 'common/assets/image/appCreative/shapeLeft2.png';
import illustration2 from 'common/assets/image/appCreative/shapeRight2.png';
import SectionWrapper, {
  SectionBgArea,
  ContentWrapper,
  ContentPricing,
  PriceTable,
  PricingFeature,
  FeatureItem,
  ContentWrap,
  ButtonWrap,
} from './pricing.style';

function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

const Pricing = () => {
  const size = useWindowSize();
  const isTablet = Boolean(size.width <= 768);

  const data = useStaticQuery(graphql`
    query {
      appCreativeJson {
        pricing {
          title
          slogan
          pricingFeature {
            id
            name
          }
          pricingItems {
            id
            package_name
            price
            trial_day
            isRecommended
            features {
              id
              name
              isAvailable
            }
          }
        }
      }
    }
  `);

  const {
    slogan,
    title,
    pricingFeature,
    pricingItems,
  } = data.appCreativeJson.pricing;
  return (
    <SectionWrapper id="pricing">
      <SectionBgArea>
        <div className="shape-one">
          <Image src={illustration} alt="Shape" />
        </div>
        <div className="shape-two">
          <Image src={illustration2} alt="Shape" />
        </div>
      </SectionBgArea>
      <Container>
        <SectionHeader className="text-white">
          <Heading content={title} />
          <Text content={slogan} />
        </SectionHeader>
        <ContentWrapper>
          <ContentPricing>
            {!isTablet && (
              <PricingFeature>
                {pricingFeature.map((feature) => (
                  <FeatureItem key={feature.id}>{feature.name}</FeatureItem>
                ))}
              </PricingFeature>
            )}
            {pricingItems.map((priceTable) => (
              <PriceTable
                key={priceTable.id}
                className={priceTable.isRecommended && 'isRecommended'}
              >
                {priceTable.isRecommended && (
                  <div className="recommended">Recommended</div>
                )}

                <h2 className="title">{priceTable.package_name}</h2>
                <div className="price">
                  ${priceTable.price}
                  <span>/ mo.</span>
                </div>
                <ul className="featureList">
                  {priceTable.features.map((feature) => (
                    <FeatureItem key={feature.id}>
                      {isTablet ? (
                        feature.isAvailable ? (
                          feature.name
                        ) : (
                          <Icon
                            icon={closeCircled}
                            size={18}
                            style={{ color: '#CED7E1' }}
                          />
                        )
                      ) : feature.isAvailable ? (
                        <Icon
                          icon={ic_check_circle}
                          size={18}
                          style={{ color: '#3CC68A' }}
                        />
                      ) : (
                        <Icon
                          icon={closeCircled}
                          size={18}
                          style={{ color: '#CED7E1' }}
                        />
                      )}
                    </FeatureItem>
                  ))}
                </ul>
                <Button
                  title="Choose Plan"
                  className={`${
                    !priceTable.isRecommended && 'primaryOutlined'
                  } choosePlan`}
                />
                <p className="trial">{priceTable.trial_day} days free trial</p>
              </PriceTable>
            ))}
          </ContentPricing>
          <ContentWrap>
            <Heading
              as="h3"
              content="Are you looking for custom price? Let’s talk about it."
            />
            <ButtonWrap>
              <Button title="Contact Us Now!" />
            </ButtonWrap>
          </ContentWrap>
        </ContentWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default Pricing;

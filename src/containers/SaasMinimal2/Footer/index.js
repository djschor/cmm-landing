import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Container from 'common/components/UI/Container';
import Image from 'common/components/Image';
import Link from 'common/components/Link';

import {
  Section,
  ContentWrapper,
  Copyright,
  Nav,
  SocialProfiles,
  Icons,
} from './footer.style';

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      logoDark: file(
        relativePath: { eq: "image/saasMinimal2/logo-black.png" }
      ) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      saasMinimal2Json {
        footerNav {
          id
          url
          title
        }
        socialLinks {
          id
          link
          label
          icon {
            childImageSharp {
              fluid(quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);
  return (
    <Section>
      <Container>
        <ContentWrapper>
          <Copyright>
            <figure>
              <Image
                src={data.logoDark.childImageSharp.fluid.src}
                alt="saas minimal"
              />
            </figure>
            <p>
              Copyright © 2020 <Link href="#">RedQ, Inc.</Link>
            </p>
          </Copyright>
          <Nav>
            {data?.saasMinimal2Json?.footerNav?.map((item) => (
              <li key={item.id}>
                <Link href={item.url}>{item.title}</Link>
              </li>
            ))}
          </Nav>
          <SocialProfiles>
            <span>Social</span>
            <Icons>
              {data?.saasMinimal2Json?.socialLinks?.map((item) => (
                <Link key={item.id} href={item.url}>
                  <Image
                    src={item.icon.childImageSharp.fluid.src}
                    alt={item.label}
                  />
                </Link>
              ))}
            </Icons>
          </SocialProfiles>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default Footer;

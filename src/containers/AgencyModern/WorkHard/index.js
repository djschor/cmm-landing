import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Icon } from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/feather/chevronRight';

import Container from 'common/components/UI/ContainerTwo';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Image from 'common/components/Image';
import List from 'common/components/List';
import Link from 'common/components/Link';

import SectionWrapper, {
  Section,
  Content,
  Illustration,
  ListGroup,
} from './workHard.style';
// import data from 'common/data/AgencyModern';
import illustration from 'common/assets/image/agencyModern/work-hard-illustration.png';
// import Tick from 'common/assets/image/agencyModern/tick-circle.svg';

const WorkHard = () => {
  const Data = useStaticQuery(graphql`
    query {
      Tick: file(relativePath: { eq: "image/agencyModern/tick-circle.png" }) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      agencyModernJson {
        workHardList {
          id
          title
        }
      }
    }
  `);

  return (
    <SectionWrapper>
      <Container>
        <Section>
          <Content>
            <Heading
              as="h2"
              content="Don’t work hard, be smart &amp; work smartly. Take relax sit"
            />
            <Text content="Get your tests delivered at let home collect sample from the victory of the managments that supplies best design system guidelines ever." />
            <ListGroup>
              {Data.agencyModernJson.workHardList.map((item) => (
                <List
                  className="list-item"
                  key={item.id}
                  text={item.title}
                  icon={
                    <Image
                      fluid={
                        (Data.Tick !== null) | undefined
                          ? Data.Tick.childImageSharp.fluid
                          : {}
                      }
                      src={Data.Tick.childImageSharp.fluid.src}
                      objectFit="contain"
                      alt="Tick Icon"
                    />
                  }
                />
              ))}
            </ListGroup>
            <Link className="explore" href="#">
              Explore more <Icon icon={chevronRight} />
            </Link>
          </Content>
          <Illustration>
            <Image src={illustration} alt="Illustration" />
          </Illustration>
        </Section>
      </Container>
    </SectionWrapper>
  );
};

export default WorkHard;

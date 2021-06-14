import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Container from 'common/components/UI/Container';
import Heading from 'common/components/Heading';
import Image from 'common/components/Image';
import Text from 'common/components/Text';
import {
  Section,
  SectionHeading,
  TabPanel,
  TabPane,
  ProcessLine,
  LoadingLine,
  Illustration,
} from './dashboard.style';

const Dashboard = () => {
  const data = useStaticQuery(graphql`
    query {
      dashboard: file(
        relativePath: { eq: "image/saasMinimal2/dashboard.png" }
      ) {
        childImageSharp {
          fluid(quality: 100, maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      saasMinimal2Json {
        dashboardProcess {
          id
          title
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
    <Section id="dashboard">
      <Container>
        <SectionHeading>
          <Heading content="Analyze, measure, and improve your customer experience. Over and over again." />
        </SectionHeading>
        <TabPanel>
          <ProcessLine />
          <LoadingLine />
          {data?.saasMinimal2Json?.dashboardProcess?.map((item) => (
            <TabPane key={item.id}>
              <figure>
                <Image
                  src={item?.icon?.childImageSharp?.fluid?.src}
                  alt={item.title}
                />
              </figure>
              <Text content={item.title} />
            </TabPane>
          ))}
        </TabPanel>
        <Illustration>
          <Image
            src={data.dashboard?.childImageSharp?.fluid?.src}
            alt="illustration"
          />
        </Illustration>
      </Container>
    </Section>
  );
};

export default Dashboard;

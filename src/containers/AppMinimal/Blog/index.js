import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Icon } from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/ionicons/chevronRight';
import Heading from 'common/components/Heading';
import Image from 'common/components/Image';
import Text from 'common/components/Text';
import Container from 'common/components/UI/Container';
import BlogArea, { BlockTitle, Row, Col, BlogCard } from './blog.style';

const Blog = () => {
  const Data = useStaticQuery(graphql`
    query {
      appMinimalJson {
        BlogData {
          title
          link
          image {
            publicURL
          }
        }
      }
    }
  `);
  return (
    <BlogArea id="blog_section">
      <Container className="Container">
        <BlockTitle>
          <Heading as="h3" content="What our author post on Newsfeed" />
          <Text
            as="p"
            content="Build an incredible workplace and grow your business with Gusto"
          />
        </BlockTitle>
        <Row>
          {Data.appMinimalJson.BlogData.map(({ image, title, link }, index) => (
            <Col key={`blog-col-key-${index}`}>
              <BlogCard>
                <Image src={image.publicURL} alt="blog image" />
                <Heading as="h3" content={title} />
                <Link to={link} className="blogLink">
                  Learn more <Icon size={12} icon={chevronRight} />
                </Link>
              </BlogCard>
            </Col>
          ))}
        </Row>
      </Container>
    </BlogArea>
  );
};

export default Blog;

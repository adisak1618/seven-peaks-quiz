import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { NextPage, GetServerSidePropsContext } from 'next'
import styled from 'styled-components'
import querystring from 'querystring'
import { Row, Column } from '../components/flex'
import { GuardianSearch, GuardianSection } from '../lib/GuardianJSClient'
import { RichCard } from '../components/articleCard'
import MainLayout from '../components/layout/main'
import Container from '../components/container'
import Header from '../components/pages/home/header'
import { H2 } from '../components/typography'

type HomeProps = {
  hilightData: any
  sportsData: any
  cultureData: any
  lifeandstyleData: any
}

const ArticleSection = styled.section`
  margin-bottom: 20px;
  a {
    color: inherit; /* blue colors for links too */
    text-decoration: inherit; /* no underline */
  }
`

const Home: NextPage<HomeProps> = (props) => {
  const { hilightData, sportsData, cultureData, lifeandstyleData } = props
  const router = useRouter()
  return (
    <MainLayout>
      <Container>
        <Header
          title="Top stories"
          onSelect={(value) => {
            // window.location.href = "/?" + querystring.encode({ ...router.query, sort: value })
            const config = {
              pathname: '/',
              query: { ...router.query, sort: value }
            }
            router.push(config, config)
          }}
        />
        <ArticleSection>
          <Row>
            <Column col={6} colXs={12} padding="15px">
              {
                (hilightData.response.results || []).slice(0, 1).map((value: any) => (
                  <Link key={value.webTitle} href={`/article/` + value.id} passHref>
                    <a>
                      <RichCard
                        data={{
                          headline: value.fields.headline,
                          descriotion: value.fields.trailText,
                          thumbnail: value.fields.thumbnail
                        }}
                        height="430px"
                        color="lightBlue"
                      />
                    </a>
                  </Link>
                ))
              }
            </Column>
            <Column col={6} colXs={12}>
              <Row>
                {
                  (hilightData.response.results || []).slice(1, 3).map((value: any, index: number) => (
                    <Link key={value.webTitle} href={`/article/` + value.id} passHref>

                      <Column col={6} colMd={6} colXs={12} padding="15px">
                        <a>
                          <RichCard
                            data={{
                              headline: value.fields.headline,
                              descriotion: value.fields.trailText,
                              thumbnail: value.fields.thumbnail
                            }}
                            height="280px"
                            showDescription={false}
                            color={(index % 2 === 0) ? "red" : "yellow"}
                            titleFontSize="20px"
                          />
                        </a>
                      </Column>

                    </Link>
                  ))
                }
              </Row>
              <Row>
                {
                  (hilightData.response.results || []).slice(3, 5).map((value: any, index: number) => (
                    <Link key={value.webTitle} href={`/article/` + value.id} passHref>
                      <Column col={6} colMd={6} colXs={12} padding="15px">
                        <a>
                          <RichCard
                            data={{
                              headline: value.fields.headline
                            }}
                            height="120px"
                            showDescription={false}
                            color={(index % 2 === 0) ? "lightBlue" : "green"}
                            showThumbnail={false}
                            titleFontSize="20px"
                            lineClamp={4}
                          />
                        </a>
                      </Column>
                    </Link>
                  ))
                }
              </Row>
            </Column>
          </Row>
          <Row>
            {
              (hilightData.response.results || []).slice(6, 9).map((value: any, index: number) => (
                <Link key={value.webTitle} href={`/article/` + value.id} passHref>
                  <Column col={4} colMd={6} colXs={12} padding="15px">
                    <a>
                      <RichCard
                        data={{
                          headline: value.fields.headline,
                          descriotion: value.fields.trailText,
                          thumbnail: value.fields.thumbnail
                        }}
                        height="350px"
                        color="red"
                        titleFontSize="20px"
                        lineClamp={3}
                      />
                    </a>
                  </Column>
                </Link>
              ))
            }
          </Row>
        </ArticleSection>
        <ArticleSection>
          <H2 as="h2" padding="0 15px">Sports</H2>
          <Row>
            {
              (sportsData.response.results || []).map((value: any, index: number) => (
                <Link key={value.webTitle} href={`/article/` + value.id} passHref>
                  <Column col={4} colMd={6} colXs={12} padding="15px">
                    <a>
                      <RichCard
                        data={{
                          headline: value.fields.headline,
                          descriotion: value.fields.trailText,
                          thumbnail: value.fields.thumbnail
                        }}
                        height="350px"
                        color="lightBlue"
                        titleFontSize="20px"
                        lineClamp={3}
                      />
                    </a>
                  </Column>
                </Link>
              ))
            }
          </Row>
        </ArticleSection>
        <ArticleSection>
          <H2 as="h2" padding="0 15px">Culture</H2>
          <Row>
            {
              (cultureData.response.results || []).map((value: any, index: number) => (
                <Link key={value.webTitle} href={`/article/` + value.id} passHref>
                  <Column col={4} colMd={6} colXs={12} padding="15px">
                    <a>
                      <RichCard
                        data={{
                          headline: value.fields.headline,
                          descriotion: value.fields.trailText,
                          thumbnail: value.fields.thumbnail
                        }}
                        height="350px"
                        color="green"
                        titleFontSize="20px"
                        lineClamp={3}
                      />
                    </a>
                  </Column>
                </Link>
              ))
            }
          </Row>
        </ArticleSection>
        <ArticleSection>
          <H2 as="h2" padding="0 15px">Life and style</H2>
          <Row>
            {
              (lifeandstyleData.response.results || []).map((value: any, index: number) => (
                <Link key={value.webTitle} href={`/article/` + value.id} passHref>
                  <Column col={4} colMd={6} colXs={12} padding="15px">
                    <a>
                      <RichCard
                        data={{
                          headline: value.fields.headline,
                          descriotion: value.fields.trailText,
                          thumbnail: value.fields.thumbnail
                        }}
                        height="350px"
                        color="green"
                        titleFontSize="20px"
                        lineClamp={3}
                      />
                    </a>
                  </Column>
                </Link>
              ))
            }
          </Row>
        </ArticleSection>
      </Container>
    </MainLayout>
  );
}


// Home.getInitialProps = async (ctx: NextPageContext) => {
//   console.log('adisak ctx', ctx)
//   const hilightResponse = await GuardianSearch({
//     pageSize: 9,
//     showFields: 'thumbnail,trailText,headline',
//     orderBy: ctx.query.sort as string || ''
//   })
//   const sportsResponse = await GuardianSection({
//     section: 'sport',
//     pageSize: 3,
//     showFields: 'thumbnail,trailText,headline'
//   })
//   const businessResponse = await GuardianSection({
//     section: 'business',
//     pageSize: 3,
//     showFields: 'thumbnail,trailText,headline'
//   })
//   // business
//   return { hilightData: hilightResponse.data, sportsData: sportsResponse.data, businessData: businessResponse.data }
// }
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const hilightResponse = await GuardianSearch({
    pageSize: 9,
    showFields: 'thumbnail,trailText,headline',
    orderBy: ctx.query.sort as string || ''
  })
  const sportsResponse = await GuardianSection({
    section: 'sport',
    pageSize: 3,
    showFields: 'thumbnail,trailText,headline'
  })
  const cultureResponse = await GuardianSection({
    section: 'culture',
    pageSize: 3,
    showFields: 'thumbnail,trailText,headline'
  })
  const lifeandstyleResponse = await GuardianSection({
    section: 'lifeandstyle',
    pageSize: 3,
    showFields: 'thumbnail,trailText,headline'
  })
  return {
    props: { hilightData: hilightResponse.data, sportsData: sportsResponse.data, cultureData: cultureResponse.data, lifeandstyleData: lifeandstyleResponse.data },
  }
}

export default Home;
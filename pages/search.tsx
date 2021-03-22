import React from 'react'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import querystring from 'querystring'
import MainLayout from '../components/layout/main'
import Container from '../components/container'
import { GuardianSearch } from '../lib/GuardianJSClient'
import { RichCard } from '../components/articleCard'
import { Row, Column } from '../components/flex'
import Header from '../components/pages/home/header'
import Head from 'next/head'

interface searchPagePropsType {
  searchData: any
}

const ArticleSection = styled.section`
  margin-bottom: 20px;
  a {
    color: inherit; /* blue colors for links too */
    text-decoration: inherit; /* no underline */
  }
`

const SearchPage = ({ searchData }: searchPagePropsType) => {
  const router = useRouter()
  return (
    <MainLayout>
      <Head>
        <title>The Peaks - Search</title>
      </Head>
      <Container>
        <Header
          title="Search result"
          onSelect={(value) => {
            const config = {
              pathname: '/search',
              query: { ...router.query, sort: value }
            }
            router.push(config, config)
          }}
        />
        <ArticleSection>
          <Row>
            {
              (searchData.response.results || []).map((value: any, index: number) => (
                <Column key={value.webTitle} colXs={12} colSm={6} col={4} padding="15px">
                  <Link href={`/article/` + value.id} passHref>
                    <a>
                      <RichCard
                        key={value.webTitle}
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
                  </Link>
                </Column>
              ))
            }
          </Row>
        </ArticleSection>
      </Container>
    </MainLayout>
  )
}

export default SearchPage

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const searchResponse = await GuardianSearch({
    pageSize: 9,
    q: (ctx.query.q as string).replace(/[^a-zA-Z ]/g, " "), // Remove all special characters
    showFields: 'thumbnail,trailText,headline',
    orderBy: ctx.query.sort as string || ''
  })
  return {
    props: { searchData: searchResponse.data },
  }
}
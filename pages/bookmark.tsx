import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Layout from '../components/layout/main'
import Container from '../components/container'
import { RichCard } from '../components/articleCard'
import { Row, Column } from '../components/flex'
import { H1, H3, P } from '../components/typography'
import Link from 'next/link'
import Dropdown from '../components/dropdown'
import { getJsonArray } from '../lib/bookmark'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

const Wrapper = styled.div`
  margin-top: 35px;
  a {
    color: inherit; /* blue colors for links too */
    text-decoration: inherit; /* no underline */
  }
  .no-bookmark {
    padding: 100px 10px;
    font-size: 2em;
    color: #ccc;
  }
  .dropdown {
    display: flex;
    justify-content: flex-end;
  }
  @media (max-width: 768px) {
    h1{
      font-size: 32px;
      text-align: center;
    }
    .dropdown {
      justify-content: center;
    }
  }
  @media (max-width: 992px) {
    h1{
      font-size: 36px;
    }
  }
`

const BookMarkPages = ({ sortQuery }: { sortQuery: string | null }) => {
  const router = useRouter()
  const [bookmarkList, setBookmarkList] = useState<Array<any>>([])
  const [sort, setSort] = useState('newest')
  useEffect(() => {
    const bookmark = getJsonArray()
    if (bookmark && bookmark instanceof Array) {
      setBookmarkList(bookmark)
    }

    if (router.query.sort != undefined && router.query.sort != '') {
      setSort(router.query.sort as string)
    }
  }, [])
  return (
    <Layout>
      <Head>
        <title>The Peaks - bookmark</title>
      </Head>
      <Container>
        <Wrapper>
          <Row>
            <Column col={9} colMd={6} colXs={12}>
              <H1 as="h1">All bookmark</H1>
            </Column>
            <Column className="dropdown" col={3} colMd={6} colXs={12} alignSelf="flex-end">
              <Dropdown
                key="bookmarkdropdown"
                data={[['newest', 'Newest first'], ['oldest', 'Oldest first']]}
                defaultValue={sort}
                onSelect={(v) => {
                  const config = {
                    pathname: '/bookmark',
                    query: { ...router.query, sort: v }
                  }
                  router.push(config, config, { shallow: true })
                  setSort(v)
                }}
              />
            </Column>
          </Row>
          <Row>
            {
              bookmarkList
                .sort((a, b) => {
                  const aNum = (new Date(a.createdAt)).getTime()
                  const bNum = (new Date(b.createdAt)).getTime()
                  return sort === 'newest' ? bNum - aNum : aNum - bNum;
                })
                .map(v => (
                  <Column key={v.title} colXs={12} colMd={6} col={4} padding="15px">
                    <Link href={`/article/${v.id}`}>
                      <a>
                        <RichCard
                          data={{
                            headline: v.title,
                            thumbnail: v.thumbnail
                          }}
                          height="350px"
                        />
                      </a>
                    </Link>
                  </Column>
                ))
            }
          </Row>
          {bookmarkList.length === 0 && (
            <Row className="no-bookmark" justify="center">
              <P>No bookmark found</P>
            </Row>
          )}
        </Wrapper>
      </Container>
    </Layout>
  )
}

export default BookMarkPages

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: { sortQuery: ctx.query.sort as string || null },
  }
}
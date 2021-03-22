import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Layout from '../components/layout/main'
import Container from '../components/container'
import { RichCard } from '../components/articleCard'
import { Row, Column } from '../components/flex'
import { H1 } from '../components/typography'
import Dropdown from '../components/dropdown'
import { getJsonArray } from '../lib/bookmark'
import { GetServerSidePropsContext } from 'next'

const Wrapper = styled.div`
  margin-top: 35px;
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
  console.log('bookmark', sortQuery)
  useEffect(() => {
    const bookmark = getJsonArray()
    if (bookmark && bookmark instanceof Array) {
      setBookmarkList(bookmark)
    }

    if (router.query.sort !== undefined || router.query.sort !== '') {
      setSort(router.query.sort as string)
    }
  }, [])
  return (
    <Layout>
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
                  <Column colXs={4} padding="15px">
                    <RichCard
                      data={{
                        headline: v.title,
                        thumbnail: v.thumbnail
                      }}
                      height="350px"
                    />
                  </Column>
                ))
            }
          </Row>
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
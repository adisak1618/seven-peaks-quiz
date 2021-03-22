import React, { useState, useEffect } from 'react'
import { GetServerSidePropsContext } from 'next'
import styled from 'styled-components'
import moment from 'moment-timezone'
import { GuardianContent } from '../../lib/GuardianJSClient'
import Layout from '../../components/layout/main'
import Container from '../../components/container'
import BookmarkButton from '../../components/bookmarkButton'
import { P, H2, H4, Article } from '../../components/typography'
import { Column, Row } from '../../components/flex'
import { JSONparse, getJsonArray } from '../../lib/bookmark'
import Head from 'next/head'

const ArticleSection = styled.section`
  margin-top: 20px;
  h4 {
    font-weight: 700;
  }
  hr {
    margin-top: 20px;
    border: none;
    border-top: 1px solid #ddd;
  }
  @media (max-width: 992px) {
    #article {
      flex-direction: column-reverse;
    }
    .header {
      text-align: center;
    }
  }
  .image__caption {
    color: #979797;
    font-size: 14px;
    img {
      margin-bottom: 10px;
    }
  }
`

interface ArticlePropsType {
  articleData: any
}

const ArticlePage = ({ articleData }: ArticlePropsType) => {
  const [haveBookmark, setHaveBookmark] = useState(false)
  const content = articleData.response.content

  useEffect(() => {
    const bookmark = getJsonArray()
    console.log('bookmark', bookmark)
    if (bookmark && bookmark instanceof Array) {
      const filterBookmark = bookmark.filter(v => v.id == content.id)
      if (filterBookmark.length > 0) {
        setHaveBookmark(true)
      }
    }
  }, [])

  const handleClickBookmark = () => {
    const bookmark = getJsonArray()
    if (haveBookmark) {
      const filterBookmark = bookmark.filter((v: any) => v.id != content.id)
      localStorage.setItem("bookmark", JSON.stringify(filterBookmark))
      setHaveBookmark(false)
    } else {
      if (bookmark && bookmark instanceof Array) {
        const newBookmark = [
          ...bookmark,
          {
            title: content.webTitle,
            id: content.id,
            createdAt: new Date(),
            thumbnail: content.fields.thumbnail
          }
        ]
        localStorage.setItem("bookmark", JSON.stringify(newBookmark))
        setHaveBookmark(true)
      } else {
        const arr = [{
          title: content.webTitle,
          id: content.id,
          createdAt: new Date(),
          thumbnail: content.fields.thumbnail
        }]
        localStorage.setItem("bookmark", JSON.stringify(arr))
        setHaveBookmark(true)
      }
    }
  }

  return (
    <Layout>
      <Head>
        <title>The Peaks - {content.webTitle}</title>
      </Head>
      <Container>
        <ArticleSection>
          <div className="header">
            <BookmarkButton onClick={handleClickBookmark} title={haveBookmark ? 'REMOVE BOOKMARK' : 'ADD BOOKMARK'} />
            <P>{moment(content.webPublicationDate).tz('Europe/London').format('ddd DD MMM YYYY h.mm').toUpperCase() + ' BST'}</P>
          </div>
          <Row>
            <Column colXs={12} colLg={8}>
              <H2 as="h2">{content.webTitle}</H2>
              <br />
              <H4 as="h4">{content.fields.headline}</H4>
              <hr />
            </Column>
            <Column colXs={12} colLg={4} />
          </Row>
          <Row id="article">
            <Column colXs={12} colLg={8}>
              <Article
                dangerouslySetInnerHTML={{
                  __html: content.fields.body
                }}
              />
            </Column>
            <Column colXs={12} colLg={4}>
              <Article
                className="image__caption"
                dangerouslySetInnerHTML={{
                  __html: content.fields.main
                }}
              />
            </Column>
          </Row>
        </ArticleSection>
      </Container>
    </Layout>
  )
}

export default ArticlePage

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const contentId = ctx.query.slug && (ctx.query.slug as Array<string>).join("/")
  const articleResponse = await GuardianContent({
    id: contentId as string,
    showFields: 'all'
  })
  return {
    props: { articleData: articleResponse.data },
  }
}
import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import querystring from 'querystring'
import { Row, Column } from '../../flex'
import { H1 } from '../../typography'
import BookmarkButton from '../../bookmarkButton'
import Dropdown from '../../dropdown'

const Wrapper = styled.div`
  margin-top: 20px;
  .right-menu {
    justify-content: flex-end;
  }
  @media (max-width: 992px) {
    h1 {
      text-align: center;
    }
    .right-menu {
      justify-content: center;
    }
  }
`

interface HeaderPropsType {
  title: string
  onSelect?: (value: string) => void
}

const Header = ({ title, onSelect }: HeaderPropsType) => {
  const router = useRouter()
  const querystr = querystring.encode({ ...router.query })
  return (
    <Wrapper>
      <Row alignItem="baseline">
        <Column colXs={12} colLg={6} padding="15px">
          <H1 as="h1">{title}</H1>
        </Column>
        <Column colXs={12} colLg={6}>
          <Row className="right-menu" alignItem="baseline">
            <Link href={`/bookmark` + (querystr.length > 0 ? '?' + querystr : '')}>
              <a>
                <BookmarkButton title="VIEW BOOKMARK" />
              </a>
            </Link>
            <Dropdown
              data={[
                ['newest', 'Newest first'],
                ['oldest', 'Oldest first'],
                ['', 'Most popular']
              ]}
              defaultValue={router.query.sort as string}
              onSelect={(value) => {
                onSelect && onSelect(value)
              }}
            />
          </Row>
        </Column>
      </Row>
    </Wrapper>
  )
}

export default Header
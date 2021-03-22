import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Container from '../container'
import { colour } from '../css'
import SearchInput from '../searchInput'
import { Row, Column } from '../flex'

const Wrapper = styled.div`
  background: ${colour.Main};
  @media (max-width: 992px) {
    .logo {
      justify-content: center;
    }
    .search-input {
      justify-content: center;
    }
  }
`

const Logo = styled.div`
  padding-top: 30px;
  padding-bottom: 5px;
  cursor: pointer;
`

const HeadComponent: FunctionComponent = () => {
  return (
    <Wrapper>
      <Container>
        <Row className="logo">
          <Link href="/">
            <Logo>
              <img src="/assets/Logo-white.png" />
            </Logo>
          </Link>
        </Row>
        <Row>
          <Column colXs={0} colLg={9}></Column>
          <Column colXs={12} colLg={3}>
            <Row className="search-input" justify="flex-end">
              <SearchInput />
            </Row>
          </Column>
        </Row>
      </Container>
    </Wrapper>
  )
}

export default HeadComponent
import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import querystring from 'querystring'
import { colour, font } from '../css'

interface InputPropsType {
  active: boolean
}

const Wrapper = styled.div<InputPropsType>`
  height: 40px;
  max-width: ${p => p.active ? '500px' : '60px'};
  background: ${p => p.active ? '#2153a3' : 'transparent'};
  width: 100%;
  border-bottom: 3px solid ${colour.White};
  position: relative;
  box-sizing: border-box;
  transition: max-width 0.4s ease-out;
  padding-right: 60px;
  .search-icon {
    content: "";
    position: absolute;
    background: url('/assets/search-icon@2x.svg') no-repeat;
    background-position: center;
    height: 40px;
    min-width: 60px;
    right: 0px;
    top: 0px;
    cursor: pointer;
  }
  input {
    height: 40px;
    border: none;
    outline: none;
    width: 100%;
    background: transparent;
    transition: opacity 0.2s ease-out;
    opacity: ${p => p.active ? '1' : '0'};
    font-family: ${font.Description};
    color: ${colour.White};
    padding:0 10px;
    ::placeholder {
      color: ${colour.White};
      opacity: 0.5;
    }    
  }
`

const SearchInput = () => {
  const inputEl = useRef<HTMLInputElement>(null);
  const wrapperEl = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (active) {
      document.addEventListener('mousedown', handleClick, false)
    }

    return () => {
      document.removeEventListener('mousedown', handleClick, false)
    }
  }, [active])

  const onClickSearch = () => {
    if (active) {
      // window.location.href = "/search?" + querystring.encode({ ...router.query, q: inputEl.current?.value })
      const config = {
        pathname: '/search',
        query: { ...router.query, q: inputEl.current?.value }
      }
      router.push(config, config)
    } else {
      setActive(true)
      inputEl.current?.focus()
      inputEl.current?.select()
    }
  }

  const handleClick = (e: any) => {
    if (!wrapperEl.current?.contains(e.target)) {
      setActive(false)
    }
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickSearch()
    }
  }
  return (
    <Wrapper ref={wrapperEl} active={active}>
      <input ref={inputEl} defaultValue={router.query.q} onKeyDown={handleKeyDown} placeholder="Search all news" />
      <div className="search-icon" onClick={onClickSearch} />
    </Wrapper>
  )
}

export default SearchInput
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const HeaderContainer = styled.header`
    background-color: #101522;
`

export const HeaderWrap = styled.div`
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto;
`

export const Head = styled.section`
    max-width: 1000px;
    width: 100%;
`

export const HeadWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1100px;
    margin: 40px auto 24px auto;
`

export const HeadLogo = styled(Link)`
    color: #fff !important;
    justify-self: start;
    cursor: pointer;
    text-decoration: none !important;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    font-weight: bold;
`

export const WebsiteRights = styled.small`
    color: #fff !important;
    margin-bottom: 16px;
`

export const HeadLink = styled(Link)`
    color: #fff !important;
    text-decoration: none !important;
`

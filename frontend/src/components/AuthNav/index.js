import React from 'react'
import { 
    HeaderContainer, 
    HeaderWrap, 
    HeadLogo, 
    Head, 
    HeadWrap, 
    WebsiteRights, 
    HeadLink 
} from './AuthNavElemnets'

const AuthNav = ({ Title, link }) => {
    return (
        <>
            <HeaderContainer>
                <HeaderWrap>
                    <Head>
                        <HeadWrap>
                            <HeadLogo to='/'>CVArt</HeadLogo>
                            <WebsiteRights>
                                <HeadLink to={link}>
                                    {Title}
                                </HeadLink>
                            </WebsiteRights>
                        </HeadWrap>
                    </Head>
                </HeaderWrap>
            </HeaderContainer>
        </>
    )
}

export default AuthNav

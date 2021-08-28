import React from 'react'
import {animateScroll as scroll} from 'react-scroll'
import {
    FooterContainer,
    FooterWrap,
    SocialMedia,
    SocialMediaWrap,
    SocialLogo,
    WebsiteRights
} from './FooterElements'

const Footer = () => {

    const toggleHome = () => {
        scroll.scrollToTop()
    }

    return (
        <FooterContainer>
            <FooterWrap>
                <SocialMedia>
                    <SocialMediaWrap>
                        <SocialLogo to='/' onClick={toggleHome}>CVArt</SocialLogo>
                        <WebsiteRights>
                            CVArt &copy; {new Date().getFullYear()} All rights reserved.
                        </WebsiteRights>
                    </SocialMediaWrap>
                </SocialMedia>
            </FooterWrap>
        </FooterContainer>
    )
}

export default Footer

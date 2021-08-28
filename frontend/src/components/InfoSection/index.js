import React, { useEffect } from 'react'
import { Button } from '../ButtonElement'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { 
    InfoContainer,
    InfoWrapper,
    InfoRow,
    Column1,
    TextWrapper,
    TopLine,
    Heading,
    Subtitle,
    BtnWrap,
    Column2,
    ImgWrap,
    Img
} from './InfoElements'

const InfoSection = ({
    lightBg, 
    id, 
    imgStart, 
    topLine, 
    lightText,
    headline,
    darkText,
    description,
    buttonLabel,
    img,
    alt,
    primary,
    dark,
    dark2,
    to
}) => {
    
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    return (
        <>
            <InfoContainer lightBg={lightBg} id={id}>
                <InfoWrapper>
                    <InfoRow imgStart={imgStart}>
                        <Column1 data-aos="fade-up" data-aos-duration="2000">
                            <TextWrapper>
                                <TopLine>{topLine}</TopLine>
                                <Heading lightText={lightText}>{headline}</Heading>
                                <Subtitle darkText={darkText}>{description}</Subtitle>
                                <BtnWrap>
                                    <Button 
                                        to={to}
                                        primary={primary ? 1 : 0}
                                        dark={dark ? 1 : 0}
                                        dark2={dark2 ? 1 : 0}
                                    >{buttonLabel}</Button>
                                </BtnWrap>
                            </TextWrapper>
                        </Column1>

                        <Column2 data-aos="fade-down" data-aos-duration="2000">
                            <ImgWrap>
                                <Img src={img} alt={alt} />
                            </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>
            </InfoContainer>
        </>
    )
}

export default InfoSection

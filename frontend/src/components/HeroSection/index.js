import React, {useState} from 'react'
import {Button} from '../ButtonElement'
import Video from '../../videos/video.mp4'
import {
    HeroContainer, 
    HeroBg, 
    VideoBg,
    HeroContent,
    HeroH1,
    HeroP,
    HeroBtnWrapper,
    ArrowForward,
    ArrowRight,
} from './HeroElements'

const HeroSection = () => {

    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }

    return (
        <HeroContainer>
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
            </HeroBg>

            <HeroContent>
                <HeroH1 className='textAnimation1'>The Best CV Maker Online</HeroH1>
                <HeroP className='textAnimation2'>
                    Creating a Professional Resume and Cover Letter Has Never Been So Easy
                </HeroP>
                <HeroBtnWrapper>
                    <Button 
                        to="/signin" 
                        onMouseEnter={onHover} 
                        onMouseLeave={onHover}
                        primary='true'
                        dark='true'
                    >
                        Get Started {hover ? <ArrowForward /> : <ArrowRight />}
                    </Button>
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
    )
}

export default HeroSection

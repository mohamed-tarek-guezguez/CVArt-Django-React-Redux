import React, { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import Icon1 from '../../images/svg-4.svg'
import Icon2 from '../../images/svg-5.svg'
import Icon3 from '../../images/svg-6.svg'
import {
    ServicesContainer,
    ServicesH1,
    ServicesWrapper,
    ServicesCard,
    ServicesIcon,
    ServicesH2,
    ServicesP,

} from './ServicesElements'

const Services = () => {

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    return (
        <ServicesContainer id="services">
            <ServicesH1>Our Services</ServicesH1>
            <ServicesWrapper>
                <ServicesCard data-aos="zoom-in">
                    <ServicesIcon src={Icon1} />
                    <ServicesH2><b>Pick a CV template</b></ServicesH2>
                    <ServicesP>Choose a sleek design and layout to get started.</ServicesP>
                </ServicesCard>

                <ServicesCard data-aos="zoom-in">
                    <ServicesIcon src={Icon2} />
                    <ServicesH2><b>Fill in the blanks</b></ServicesH2>
                    <ServicesP>Type in a few words. Let the CVArt wizard fill the rest.</ServicesP>
                </ServicesCard>

                <ServicesCard data-aos="zoom-in">
                    <ServicesIcon src={Icon3} />
                    <ServicesH2><b>Customize your document</b></ServicesH2>
                    <ServicesP>Make it truly yours. Uniqueness in a few clicks.</ServicesP>
                </ServicesCard>
            </ServicesWrapper>
        </ServicesContainer>
    )
}

export default Services

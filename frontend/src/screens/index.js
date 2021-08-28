import React, {useState} from 'react'
import HeroSection from '../components/HeroSection'
import InfoSection from '../components/InfoSection'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import {homeObjOne, homeObjTwo, homeObjThree} from '../components/InfoSection/Data'
import Services from '../components/Services'
import Footer from '../components/Footer'
import MetaData from '../components/MetaData'

const Home = () => {

    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <MetaData 
                title={'Create a Professional CV Online for Free'} 
                description={'Create an online CV & track your performance. Make a matching cover letter. Make & download your CV in 5 mins! Choose from 20+ professional CV templates.'}
                keywords={'cv maker, resume maker, bio data maker, curriculum vitae maker, cv generator, cv creator, resume creator, resume generator, make cv online, make resume online, cv builder, resume builder, cv automatic, automatically create resume,free online curriculum vitae maker, free cv maker, free resume make, free resume builder, pdf resume, pdf cv, create pdf online, html cv, html resume, html resume generator'}
            />

            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <HeroSection />
            <InfoSection {...homeObjOne}/>
            <InfoSection {...homeObjTwo}/>
            <Services />
            <InfoSection {...homeObjThree}/>
            <Footer />
        </>
    )
}

export default Home

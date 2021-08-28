import React from 'react'
import TempNav from '../components/TempNav'
import Footer from '../components/Footer'
import Detail from '../components/Detail'

const detailPage = ({ match }) => {
    return (
        <>
            <TempNav />
            <Detail id={match.params.id} />
            <Footer />
        </>
    )
}

export default detailPage

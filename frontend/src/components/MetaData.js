import React from 'react'
import { Helmet } from 'react-helmet'

const MetaData = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{`CVArt - ${title}`}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </Helmet>
    )
}

export default MetaData
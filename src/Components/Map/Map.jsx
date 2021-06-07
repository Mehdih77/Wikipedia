import React from 'react'
import ImageMapper from 'react-image-mapper';
import world from '../../Images/world-map.jpg';
import map from './coords.json'

export default function Map({ handleSelectCountry }) {
    return (
            <ImageMapper
            onClick={(e) => handleSelectCountry(e.name)}
            width={800}
            imgWidth={1000}
            src={world}
            map={map}/>
    )
}

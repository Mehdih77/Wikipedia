import React, { useState , useEffect } from 'react';
import wiki from 'wikijs';
import Info from './Info/Info';
import Map from './Map/Map';
import Summary from './Summary/Summary';

export default function Main() {

    const [selectCountry, setselectCountry] = useState("Wordl-Map")
    const [summary, setSummary] = useState('');
    const [info, setInfo] = useState(null);
    const [flag, setFlag] = useState(null);

    useEffect(() => {
        async function fetchData(){
            const page = await wiki().page(selectCountry)

            const [summaryy , infoo , images ] = await Promise.all([
                page.summary(),
                page.info(),
                page.images()
            ])

            const flagg = infoo.imageFlag.replace(/\s/g, '_')
            images.some( image => {
                if(image.includes(flagg)){
                    setFlag(image);
                    return true;
                }
                return false;
            })
            setSummary(summaryy)
            setInfo(infoo)

        };
        fetchData()
    }, [selectCountry])


    function handleSelectCountry(name) {
        setselectCountry(name);
    }

    return (
        <div className="container mt-5">
        <div className="row">
            <div className="col col-md-9">
                <div className="img-border">
                     <Map handleSelectCountry={handleSelectCountry} />
                 </div>           
             </div>
            <div className="col-12 col-md-3">
                 <div className="card-border">
                      <Info info={info} flag={flag} />
                 </div>
            </div>
        </div>
        <div className="row mt-3">
            <div className="mx-4 my-3 summary">
                <Summary summary={summary} />
            </div>
        </div>
    </div>

    )
}

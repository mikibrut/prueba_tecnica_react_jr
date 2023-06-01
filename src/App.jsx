import { useState, useEffect } from 'react'
import './App.css'

const ENDPOINT_CAT_FACT = 'https://catfact.ninja/fact'
//const ENDPOINT_CAT_IMG_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function App () {
const [fact, setFact] = useState()
const [imageUrl, setImageUrl] = useState()

useEffect(() => {
    fetch(ENDPOINT_CAT_FACT)
        .then(res => res.json())
        .then(data => {
            const {fact} = data
            setFact(fact)

            const threeFirstWords = fact.split(' ', 3).join(' ')

        fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
            .then(res => res.json())
            .then(response => {
                const { url } = response
                setImageUrl(url)
            })
        })
}, [])

    return (
        <main>
             <h1>App de gatos</h1>
            <section>
                {fact && <p>{fact}</p>}
                {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`image extracted using the first word for cat ${fact}`}/>}
            </section>
        </main>
    )
}
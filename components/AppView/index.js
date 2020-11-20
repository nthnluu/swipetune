import NavigationBar from "./NavigationBar";
import {useEffect, useState} from "react";
import Carousel from "./Carousel";
import Mixtape from "./Mixtape";
import useSpotifyToken from "../../lib/useSpotifyToken";
import SpotifyTokenContext from "../../lib/context/SpotifyTokenContext";
import fb from "../../lib/firebase";

const AppView = () => {
    const [currentPage, setCurrentPage] = useState('APP')
    const [isLoading, toggleLoading] = useState(true)
    const [trackStack, setTrackStack] = useState([])
    const [renewTracks, toggleRenewTracks] = useState(true)
    const [token, loading, error] = useSpotifyToken()

    useEffect(() => {
        if (renewTracks && token) {
            fetch('https://api.spotify.com/v1/recommendations?&seed_artists=3MZsBdqDrRTJihTHQrO6Dq&seed_genres=classical%2Ccountry&seed_tracks=1jcNHi5D96aaD0T5f1OjFY', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(json => {
                    toggleRenewTracks(false)
                    setTrackStack(prevState => [...prevState, ...json.tracks].filter(track => track.preview_url))
                    toggleLoading(false)
                })
        }
    }, [renewTracks, token])

    return <SpotifyTokenContext.Provider value={token}>
        <div className={`full-height flex ${currentPage === 'APP' ? 'justify-center' : 'justify-start'} items-center`}>
            <NavigationBar currentPage={currentPage} className="fixed top-0 w-full" changePage={setCurrentPage}/>
            {currentPage === 'APP' ? <Carousel renewTracks={toggleRenewTracks} isLoading={isLoading || loading || error} trackData={trackStack}/>  : <Mixtape onBack={() => setCurrentPage('APP')}/>}
        </div>
    </SpotifyTokenContext.Provider>
}

export default AppView
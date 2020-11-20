import GenreSearchField from "../Autocomplete/GenreSearchField";
import {useContext, useEffect, useState} from "react";
import useSpotifyToken from "../../lib/useSpotifyToken";
import SeedSearchField from "../Autocomplete/SeedSearchField";
import SpotifyTokenContext from "../../lib/context/SpotifyTokenContext";

const Mixtape = ({onBack}) => {

    const spotifyToken = useContext(SpotifyTokenContext)
    const [artistSeeds, setArtistSeeds] = useState([])
    const [trackSeeds, setTrackSeeds] = useState([])

    function createMixtape() {
        console.log(trackSeeds)
        let seed = {
            artists: [],
            tracks: []
        }
        fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10&offset=0', {
            headers: {
                Authorization: `Bearer ${spotifyToken}`
            }
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                json.items.forEach((item, index) => index < 2 && seed.tracks.push(item.id))
                json.items.forEach((item, index) => index < 2 && seed.artists.push(item.artists[0].id))
                console.log(seed)
            })

    }

    return <div className="text-white px-8 w-full">
        <div className="text-left ">
            <h1 className="text-4xl font-bold">New Mixtape</h1>
            <form className="mt-6 space-y-4 max-w-lg">
                <input required className="p-4 text-xl w-full block rounded-lg border-2 border-white bg-transparent focus:outline-none" placeholder="New Title" />
                <GenreSearchField/>
                <div className="pt-8">
                    <h2 className="text-2xl font-bold">Seed Artists and Tracks</h2>
                    <p className="opacity-75">We'll find songs similar to these artists and tracks.</p>
                </div>
                {/*<input*/}
                {/*    value={value}*/}
                {/*    onChange={event => setValue(event.target.value)}*/}
                {/*    required*/}
                {/*    className="p-4 text-xl w-full block rounded-lg border-2 border-white bg-transparent focus:outline-none" placeholder="Search tracks and artists" />*/}

                <SeedSearchField setArtistSeeds={(artist) => setArtistSeeds(prevState => [...prevState, {id: artist.id, name: artist.name}])}
                                 setTrackSeeds={(track) => setTrackSeeds(prevState => [...prevState, {id: track.id, name: track.name, artist: track.artists[0].name}])}
                />
                <button className="p-3 bg-frosted rounded-lg font-medium" onClick={createMixtape}>Create Mixtape</button>
            </form>
        </div>
    </div>
}

export default Mixtape
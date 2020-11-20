import GenreSearchField from "../Autocomplete/GenreSearchField";
import {useContext, useEffect, useState} from "react";
import useSpotifyToken from "../../lib/useSpotifyToken";
import SeedSearchField from "../Autocomplete/SeedSearchField";
import SpotifyTokenContext from "../../lib/context/SpotifyTokenContext";
import Chip from "../Chip";
import ArtistSearchField from "../Autocomplete/ArtistSearchField";
import TrackSearchField from "../Autocomplete/TrackSearchField";
import fb from "../../lib/firebase";
import SessionContext from "../../lib/context/SessionContext";

const Mixtape = ({onBack}) => {

    const spotifyToken = useContext(SpotifyTokenContext)
    const [title, setTitle] = useState("")
    const [genres, setGenres] = useState([])
    const [artistSeeds, setArtistSeeds] = useState([])
    const [trackSeeds, setTrackSeeds] = useState([])
    const {userId} = useContext(SessionContext)

    function createMixtape() {
        let seed = {
            artists: [],
            tracks: []
        }
        if (trackSeeds.length < 1 || artistSeeds.length < 1) {
            console.log(`https://api.spotify.com/v1/users/${userId.uid}/playlists`)
            fetch(`https://api.spotify.com/v1/users/${userId.uid}/playlists`, {
                method: 'POST',
                header: {
                    Authorization: `Bearer ${spotifyToken}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    client_id: "b0507091c8dc4c41a62222a147fa2273",
                    client_secret: "13b78a59450c45a19c18e1731c6eab6a",
                    name: title
                }
            })
                .then(plRes => plRes.json())
                .then(plJson => {
                    console.log(spotifyToken)
                    fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10&offset=0', {
                        headers: {
                            Authorization: `Bearer ${spotifyToken}`
                        }
                    })
                        .then(res => res.json())
                        .then(json => {
                            console.log(json)
                            if (trackSeeds.length < 1 || artistSeeds.length < 1) {
                                json.items.forEach((item, index) => index < 2 && seed.tracks.push(item.id))
                                json.items.forEach((item, index) => index < 2 && seed.artists.push(item.artists[0].id))
                            }

                            seed.artists = [...new Set(artistSeeds.map(artists => artists.id))]
                            seed.trackSeeds = [...new Set(trackSeeds.map(tracks => tracks.id))]
                            console.log(plJson)
                            // fb.firestore().collection('users').doc(userId.uid).collection('mixtapes').doc().set({
                            //     seeds: seed
                            // })

                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        }
    }

    return <div className="text-white px-8 w-full">
        <div className="text-left ">
            <p>{JSON.stringify(spotifyToken)}</p>
            <h1 className="text-4xl font-bold">New Mixtape</h1>
            <div className="mt-6 space-y-4 max-w-lg">
                <input value={title}
                       onChange={event => setTitle(event.target.value)}
                       className="p-4 text-xl w-full block rounded-lg border-2 border-white bg-transparent focus:outline-none"
                       placeholder="New Title *"/>
                <GenreSearchField setGenres={genre => setGenres(prevState => [...prevState, genre])}/>
                {genres.map(genre => <Chip label={genre}
                                           key={genre}
                                           onDelete={() => setGenres(prevState => prevState.filter(item => item !== genre))}/>)}
                <div className="pt-8">
                    <h2 className="text-2xl font-bold">Seed Artists and Tracks</h2>
                    <p className="opacity-75">We'll find songs similar to these artists and tracks.</p>
                </div>
                <ArtistSearchField setArtistSeeds={(artist) => setArtistSeeds(prevState => [...prevState, {
                    id: artist.id,
                    name: artist.name
                }])}/>
                <TrackSearchField setTrackSeeds={(track) => setTrackSeeds(prevState => [...prevState, {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name
                }])}/>
                <div className="flex justify-start">
                    {trackSeeds.map(track => <Chip label={track.name}
                                                   key={track.id}
                                                   onDelete={() => setTrackSeeds(prevState => prevState.filter(item => item.id !== track.id))}/>)}
                    {artistSeeds.map(artist => <Chip label={artist.name}
                                                     key={artist.id}
                                                     onDelete={() => setArtistSeeds(prevState => prevState.filter(item => item.id !== artist.id))}/>)}
                </div>
                <button
                    className={`p-3 bg-frosted rounded-lg font-medium ${(title.length < 1 || genres.length < 1) && "opacity-50"}`}
                    disabled={title.length < 1 || genres.length < 1}
                    onClick={createMixtape}>Create Mixtape
                </button>
            </div>
        </div>
    </div>
}

export default Mixtape
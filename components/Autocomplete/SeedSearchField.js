import {Listbox} from "@headlessui/react";
import {useContext, useEffect, useState} from "react";
import Fuse from "fuse.js";
import useSpotifyToken from "../../lib/useSpotifyToken";
import fb from "../../lib/firebase";
import SpotifyTokenContext from "../../lib/context/SpotifyTokenContext";

const people = [
    {id: 1, name: 'Durward Reynolds', unavailable: false},
    {id: 2, name: 'Kenton Towne', unavailable: false},
    {id: 3, name: 'Therese Wunsch', unavailable: false},
    {id: 4, name: 'Benedict Kessler', unavailable: true},
    {id: 5, name: 'Katelyn Rohan', unavailable: false},
]


const SeedSearchField = ({setArtistSeeds, setTrackSeeds}) => {
    const [selectedPerson, setSelectedPerson] = useState(people[0])
    const [isOpen, toggleOpen] = useState(false)
    const [value, setValue] = useState("")
    const [spotifyData, setSpotifyData] = useState({})
    const token = useContext(SpotifyTokenContext)


    useEffect(() => {
        if (value.length > 0) {
            console.log(value)
            fetch(`https://api.spotify.com/v1/search?q=${value}&type=track%2Cartist&limit=10`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then((json) => setSpotifyData([...json.tracks.items, ...json.artists.items]))
                .catch(error => console.log(error))
        }

    }, [value])

    function handleClick(item) {
        const isTrack = (item.artists !== undefined)
        if (isTrack) {
            setTrackSeeds(item)
        } else {
            setArtistSeeds(item)
        }
    }

    return <>
        <input required
               onChange={event => setValue(event.target.value)}
               value={value}
               onFocus={() => toggleOpen(true)}
               onBlur={() => setTimeout(() => toggleOpen(false), 250)}
               className="p-4 text-xl w-full relative block rounded-lg border-2 border-white bg-transparent focus:outline-none"
               placeholder="Artists and Tracks"/>
        {(isOpen && spotifyData.length > 0) && <ul
            style={{maxHeight: '16rem'}}
            className="sm:w-full absolute divide-y overflow-y-auto z-50 divide-gray-700 max-w-lg bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
            {spotifyData.map(item => <li key={item.id}>
                <button className="hover:bg-gray-800 text-xl text-white w-full text-left p-3" onClick={() => handleClick(item)}>
                    <h1>{item.name}</h1>
                    <h2 className="text-base opacity-75">{item.artists && item.artists[0].name}</h2>
                </button>
            </li>)}

        </ul>}

    </>
}

export default SeedSearchField
import {Listbox} from "@headlessui/react";
import {useEffect, useState} from "react";
import Fuse from "fuse.js";
import useSpotifyToken from "../../lib/useSpotifyToken";
import fb from "../../lib/firebase";

const people = [
    {id: 1, name: 'Durward Reynolds', unavailable: false},
    {id: 2, name: 'Kenton Towne', unavailable: false},
    {id: 3, name: 'Therese Wunsch', unavailable: false},
    {id: 4, name: 'Benedict Kessler', unavailable: true},
    {id: 5, name: 'Katelyn Rohan', unavailable: false},
]


const GenreSearchField = ({setGenres}) => {
    const [selectedPerson, setSelectedPerson] = useState(people[0])
    const [isOpen, toggleOpen] = useState(false)
    const [value, setValue] = useState("")
    const [results, setResults] = useState([])
    const data = {
        "genres": [
            "acoustic",
            "afrobeat",
            "alt-rock",
            "alternative",
            "ambient",
            "anime",
            "black-metal",
            "bluegrass",
            "blues",
            "bossanova",
            "brazil",
            "breakbeat",
            "british",
            "cantopop",
            "chicago-house",
            "children",
            "chill",
            "classical",
            "club",
            "comedy",
            "country",
            "dance",
            "dancehall",
            "death-metal",
            "deep-house",
            "detroit-techno",
            "disco",
            "disney",
            "drum-and-bass",
            "dub",
            "dubstep",
            "edm",
            "electro",
            "electronic",
            "emo",
            "folk",
            "forro",
            "french",
            "funk",
            "garage",
            "german",
            "gospel",
            "goth",
            "grindcore",
            "groove",
            "grunge",
            "guitar",
            "happy",
            "hard-rock",
            "hardcore",
            "hardstyle",
            "heavy-metal",
            "hip-hop",
            "holidays",
            "honky-tonk",
            "house",
            "idm",
            "indian",
            "indie",
            "indie-pop",
            "industrial",
            "iranian",
            "j-dance",
            "j-idol",
            "j-pop",
            "j-rock",
            "jazz",
            "k-pop",
            "kids",
            "latin",
            "latino",
            "malay",
            "mandopop",
            "metal",
            "metal-misc",
            "metalcore",
            "minimal-techno",
            "movies",
            "mpb",
            "new-age",
            "new-release",
            "opera",
            "pagode",
            "party",
            "philippines-opm",
            "piano",
            "pop",
            "pop-film",
            "post-dubstep",
            "power-pop",
            "progressive-house",
            "psych-rock",
            "punk",
            "punk-rock",
            "r-n-b",
            "rainy-day",
            "reggae",
            "reggaeton",
            "road-trip",
            "rock",
            "rock-n-roll",
            "rockabilly",
            "romance",
            "sad",
            "salsa",
            "samba",
            "sertanejo",
            "show-tunes",
            "singer-songwriter",
            "ska",
            "sleep",
            "songwriter",
            "soul",
            "soundtracks",
            "spanish",
            "study",
            "summer",
            "swedish",
            "synth-pop",
            "tango",
            "techno",
            "trance",
            "trip-hop",
            "turkish",
            "work-out",
            "world-music"
        ]
    }
    const fuse = new Fuse(data.genres, {threshold: 0.5})

    useEffect(() => {
        const res = fuse.search(value)
        setResults(res.slice(0, Math.min(10, res.length - 1)))
    }, [value])


    return <>
        <input required
               onChange={event => setValue(event.target.value)}
               value={value}
               onFocus={() => toggleOpen(true)}
               onBlur={() => setTimeout(()  => toggleOpen(false), 200)}
               className="p-4 text-xl w-full relative block rounded-lg border-2 border-white bg-transparent focus:outline-none"
               placeholder="Genres *"/>
        {(isOpen && results.length > 0) && <ul
            style={{maxHeight: '16rem'}}
            className="sm:w-full absolute divide-y overflow-y-auto z-50 divide-gray-700 max-w-lg bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
            {results.map(genre => <li key={genre.index}>
                <button className="hover:bg-gray-800 text-xl text-white w-full text-left p-3" onClick={() => {
                    setGenres(genre.item)
                    setValue("")
                }}>
                    {genre.item}
                </button>
            </li>)}


        </ul>}

    </>
}

export default GenreSearchField
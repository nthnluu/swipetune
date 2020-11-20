import { useState, useEffect } from 'react';
import fb from "./firebase";

function useSpotifyToken() {
    const [token, setToken] = useState("")
    const [error, setError] = useState(undefined);
    const [loading, toggleLoading] = useState(true);

    useEffect(() => {
        fb.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
            fetch('/api/get_spotify_token', {
                method: 'POST',
                body: JSON.stringify({
                    token: idToken
                })
            })
                .then(res => res.json())
                .then(json => {
                    setToken(json['access_token'])
                    toggleLoading(false)
                })
        }).catch(function(error) {
            // Handle error
            setError(error)
            toggleLoading(false)
        });

    }, []);

    return [token, loading, error];
}

export default useSpotifyToken
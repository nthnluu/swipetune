export default async (req, res) => {
    res.statusCode = 200
    const {code, error} = req.query

    let status;
    if (error) {
        // User declined auth request/an error occurred
        status = 'ERROR'
    } else {
        // User successfully authenticated
        status = 'SUCCESS'

        // Request access token with code
        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_SITE_URL + "/api/callback/")}&client_id=b0507091c8dc4c41a62222a147fa2273&client_secret=13b78a59450c45a19c18e1731c6eab6a`
        })
            .then((tokenData) => tokenData.json())
            .then(tokenJson => {
                // Successfully fetched token, fetch user profile
                fetch('https://api.spotify.com/v1/me', {
                    headers: {
                        Authorization: `Bearer ${tokenJson['access_token']}`
                    }
                })
                    .then(profileData => profileData.json())
                    .then(profileJson => {
                        // Profile successfully fetched; update user profile in Firestore
                        fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/user`, {
                            method: 'POST',
                            body: JSON.stringify({token: tokenJson, profile: profileJson})
                        })
                            .then((fbToken) => fbToken.json())
                            .then((fbTokenJson) => {
                                res.writeHead(301, {
                                    Location: `/login?token=${fbTokenJson['customToken']}`
                                });
                                res.end();

                                // res.json({
                                //     status: status,
                                //     firebaseToken: fbTokenJson['customToken']
                                // })
                            })
                    })
                    .catch((error) => {
                        console.log(error)
                        res.status(404).end()
                    })

            })
            .catch((error) => {
                console.log(error)
                res.status(404).end()
            })



    }


}

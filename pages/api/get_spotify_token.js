import fbAdmin from "../../lib/firebase-admin";

export default async (req, res) => {
    res.statusCode = 200
    if (req.method === 'POST') {
        const {token} = JSON.parse(req.body)

        return new Promise(resolve => fbAdmin.auth().verifyIdToken(token)
            .then(function (decodedToken) {
                let uid = decodedToken.uid;
                console.log(uid)
                fbAdmin.firestore().collection('users').doc(uid).get()
                    .then(doc => {
                        const userData = doc.data()
                        fetch('https://accounts.spotify.com/api/token', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/x-www-form-urlencoded',
                                Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_SECRET_KEY}`).toString('base64')}`
                            },
                            body: `grant_type=refresh_token&refresh_token=${userData['token']['refresh_token']}`
                        })
                            .then(res => res.json())
                            .then(json => {
                                res.status(200).json(json);
                                resolve()
                            })
                            .catch((error) => {
                                console.log(error)
                                res.statusCode = 400
                                return res.end()
                            })
                    })
            }).catch(function (error) {
                console.log(error)
                res.statusCode = 400
                return res.end()
            })
        )
    }
}

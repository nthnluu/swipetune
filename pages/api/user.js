import fbAdmin from "../../lib/firebase-admin";

export default async (req, res) => {
    if (req.method === 'POST') {
        const bodyData = JSON.parse(req.body)
        console.log(bodyData)
        fbAdmin.firestore()
            .collection('users')
            .doc(bodyData.profile['id'])
            .set(bodyData)
            .then((doc) => {
                fbAdmin.auth().createCustomToken(bodyData.profile['id'])
                    .then(function(customToken) {
                        res.json({customToken});
                    })
                    .catch(function(error) {
                        console.log('Error creating custom token:', error);
                        res.status(404).end()
                    });

            })
            .catch((error) => {
                res.json({error});
                res.status(404).end()
            });
    }
};
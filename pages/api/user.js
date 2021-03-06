import fbAdmin from "../../lib/firebase-admin";

export default async (req, res) => {
    if (req.method === 'POST') {
        const bodyData = JSON.parse(req.body)
        console.log(bodyData)
        return new Promise(resolve => fbAdmin.firestore()
            .collection('users')
            .doc(bodyData.profile['id'])
            .set(bodyData)
            .then((doc) => {
                console.log(doc.writeTime)
                fbAdmin.auth().createCustomToken(bodyData.profile['id'])
                    .then(function(customToken) {
                        console.log(customToken)
                        res.status(200).json({customToken});
                        resolve()
                    })
                    .catch(function(error) {
                        console.log('Error creating custom token:', error);
                        res.status(404).end()
                    });

            })
            .catch((error) => {
                res.json({error});
                res.status(404).end()
            }))

    }
};
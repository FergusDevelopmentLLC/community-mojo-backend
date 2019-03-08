import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase)

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld2 = functions.https.onRequest((request, response) => {
	response.send("Hello from Firebase!");
});

exports.modifyGroup = functions.firestore
	.document('groups/{groupId}')
	.onWrite((change, context) => {

		// Get an object with the current document value.
		// If the document does not exist, it has been deleted.
		const document = change.after!.exists ? change.after!.data() : null;

		// Get an object with the previous document value (for update or delete)
		const oldDocument = change.before!.data();

		console.log(oldDocument);

		console.log(document);

		//docuemnt deleted 
		if (!document && oldDocument) {
			
			console.log('the group was deleted xxx.');
			console.log(oldDocument);
			
			//delete all references to that group
			oldDocument.refs.forEach(docRef => {
				console.log(docRef);
				docRef.delete().then()
					.catch(error => {
						console.log(error);
						// handle any errors here
					});
			});

			return null;
		}

		//document updated
		document!.refs.forEach(docRef => {
			docRef.get().then(snapshot => {
				docRef.update(
					{
						city: document!.city,
						name: document!.name
					}
				).catch(error => {
					console.log(error);
					// handle any errors here
				});
			})
				.catch(error => {
					console.log(error);
					// handle any errors here
				});
		});

		return null;
	});
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase)

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

exports.modifyGroup = functions.firestore
	.document('groups/{groupId}')
	.onWrite((change, context) => {

		// Get an object with the current document value.
		// If the document does not exist, it has been deleted.
		const document = change.after!.exists ? change.after!.data() : null;

		// Get an object with the previous document value (for update or delete)
		const oldDocument = change.before!.data();

		//document deleted 
		if (!document && oldDocument) {

			//delete all references to that group
			oldDocument.refs.forEach(docRef => {
				console.log('deleted group...')
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
		if (document) {
			document.refs.forEach(docRef => {
				docRef.get().then(snapshot => {
					console.log('updated group...')
					console.log(docRef);
					docRef.update(
						{
							city: document.city,
							name: document.name
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
		}

		return null;
	});

exports.modifySkill = functions.firestore
	.document('skills/{skillId}')
	.onWrite((change, context) => {

		// Get an object with the current document value.
		// If the document does not exist, it has been deleted.
		const document = change.after!.exists ? change.after!.data() : null;

		// Get an object with the previous document value (for update or delete)
		const oldDocument = change.before!.data();

		//document deleted 
		if (!document && oldDocument) {

			//delete all references to that group
			oldDocument.refs.forEach(docRef => {
				console.log('deleted skill...')
				console.log(docRef);
				docRef.delete().then()
					.catch(error => {
						console.log(error);
						// handle any errors here
					});
			});

			return null;
		}
		return null;
	});

// exports.modifySkill = functions.firestore
// 	.document('skills/{skillId}')
// 	.onWrite((change, context) => {

// 		// Get an object with the current document value.
// 		// If the document does not exist, it has been deleted.
// 		const document = change.after!.exists ? change.after!.data() : null;

// 		// Get an object with the previous document value (for update or delete)
// 		const oldDocument = change.before!.data();

// 		//document deleted 
// 		if (!document && oldDocument) {

// 			//delete all references to that group
// 			oldDocument.refs.forEach(docRef => {
// 				console.log('deleted skill...')
// 				console.log(docRef);
// 				docRef.delete().then()
// 					.catch(error => {
// 						console.log(error);
// 						// handle any errors here
// 					});
// 			});

// 			return null;
// 		}

// 		//document updated
// 		if(document) {
// 			document.refs.forEach(docRef => {
// 				docRef.get().then(snapshot => {

// 					console.log('updated skill...')
// 					console.log(docRef);
// 					docRef.update(
// 						{
// 							name: document.name,
// 							points: document.points
// 						}
// 					).catch(error => {
// 						console.log(error);
// 						// handle any errors here
// 					});

// 					//get parent member of this skill
// 					console.log('parent?')

// 					console.log('here11');
// 					docRef.parent.get().then(function(querySnapshot) {
// 						console.log('here22');
// 						let tot = 0;
// 						querySnapshot.forEach(function(doc) {
// 							console.log('here33');
// 							// doc.data() is never undefined for query doc snapshots
// 							console.log(doc.id, " => ", doc.data());
// 							tot = tot + parseInt(doc.data().points);
// 						});
// 						console.log('total:' + tot);
// 						docRef.parent.parent.get().then(function(member) {
// 							console.log('here44');
// 							console.log(member.id);

// 							admin.firestore().collection('members').doc(member.id).update({
// 								points: tot
// 							})
// 							.catch(error => {
// 								console.log(error);
// 								// handle any errors here
// 							});

// 							console.log('here555');

// 							// admin.firestore().collection('members').doc(member.id).get().then(function(rootMember) {
// 							// 	console.log('here5555');
// 							// 	console.log('root_member');
// 							// 	console.log(rootMember);
// 							// })
// 							// .catch(error => {
// 							// 	console.log(error);
// 							// 	// handle any errors here
// 							// });
// 						})
// 						.catch(error => {
// 							console.log(error);
// 							// handle any errors here
// 						});
// 					})
// 					.catch(error => {
// 						console.log(error);
// 						// handle any errors here
// 					});

// 					//loop thru all their skills again accumulating the total
// 					//update the member's new total

// 				})
// 				.catch(error => {
// 					console.log(error);
// 				});
// 			});

// 			//TODO update total at member level and group levels
// 		}

// 		return null;
// 	});
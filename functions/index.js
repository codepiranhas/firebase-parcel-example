const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


/**
 * A hook that listens to deletion of user documents in firestore
 * and then deletes the corresponding user in firebase authentication. 
 */
exports.deleteUser = functions.firestore
    .document('users/{userID}')
    .onDelete((snap, context) => {
			// const deletedUser = snap.data();
		
			const deletedUserId = snap.id;

			console.log('Attempting to delete user: ', deletedUserId);

			admin.auth().deleteUser(deletedUserId)
			.then(function() {
				console.log('Successfully deleted user');
				return;
			})
			.catch(function(error) {
				console.log('Error deleting user:', error);
				return;
			});
    });

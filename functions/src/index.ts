
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const subscribeToTopic = functions.https.onCall(async data => {
    console.log("dktokenf",data.token);

    await admin.messaging().subscribeToTopic(data.token, data.topic);
   
    return `subscribed to ${data.topic}`;
  });
  
  export const unsubscribeFromTopic = functions.https.onCall(async data => {
    await admin.messaging().unsubscribeFromTopic(data.token, data.topic);
  
    return `unsubscribed from ${data.topic}`;
  });


  export const sendOnFirestoreCreate = functions.firestore
  .document('images/{imageId}')
  .onCreate(async snapshot => {
   console.log('snapshot', snapshot)
    //  const image : ImageData= JSON.parse(JSON.stringify(snapshot.data()));
    //  const imageUrl =  'data:image/png;base64,'+ image.imgUrl.toString();
      // const imageUrl= "https://angularfirebase.com/images/logo.png";
      // console.log('imageUrl', imageUrl)

    const notification: admin.messaging.Notification = {
      title: 'Person Detected!',
      body:'Take Actions!',
      // imageUrl: imageUrl
      //imageUrl: 'data:image/png;base64,'+ image.imgUrl.toString()
      
    };

    const payload: admin.messaging.Message = {
      notification,
      webpush: {
        notification: {
          vibrate: [200, 100, 200],
          icon: 'https://angularfirebase.com/images/logo.png',
        }
      },
      topic: 'images'
    };

    return admin.messaging().send(payload);
  });
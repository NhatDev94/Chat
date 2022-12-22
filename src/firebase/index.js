import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import moment from 'moment';

const firebaseConfig = {
  apiKey: 'AIzaSyAZ30JFIR2ks9OAUXlda4U7iWF-mSB6kHQ',
  authDomain: 'nailszone-dev.firebaseapp.com',
  projectId: 'nailszone-dev',
  storageBucket: 'nailszone-dev.appspot.com',
  messagingSenderId: '254865787662',
  appId: '1:254865787662:web:e61a5fbea46fa0569e655f',
  databaseURL: 'https://nailszone-dev-default-rtdb.asia-southeast1.firebasedatabase.app'
  // databaseURL: 'https://chatrealtime-d3edf-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const createComment = (eventId, comment) => {
  const now = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
  set(ref(db, `${eventId}/${now}`), {
    user_id: comment?.user_id,
    name: comment?.name,
    message: comment?.message,
    create_at: now,
  });
  /*
    comment: {
      message,
      name,
      created_at
    }
  */
};

export { db, createComment };

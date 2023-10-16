import {
    GoogleAuthProvider,
    signInWithPopup,
  } from 'firebase/auth';
  import { SET_USER,SET_LOADING_STATUS,GET_ARTICLES } from './actionType';
  import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
  } from 'firebase/storage';
  import { collection, addDoc, query, orderBy,getDocs } from 'firebase/firestore';
  import { Timestamp } from 'firebase/firestore';
  import { auth, db } from '../firebase'
  
   
  
  const provider = new GoogleAuthProvider();
  
  export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
  });
  
  export function signInAPI() {
    return (dispatch) => {
      signInWithPopup(auth, provider)
        .then((payload) => {
          console.log(payload);
          dispatch(setUser(payload.user));
        })
        .catch((error) => {
          console.error('Authentication Error:', error);
          alert(error.message);
        });
    }
  }
  
  export function getUserAuth() {
    return (dispatch) => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          dispatch(setUser(user));
        }
      });
    }
  }

  export const setLoading = (status)=>({
    type:SET_LOADING_STATUS,
    status:status,
  })



  export const getArticles = (payload)=>({
    type:GET_ARTICLES,
    payload:payload
  })
  


  export function signOutAPI() {
    return (dispatch) => {
      auth
        .signOut()
        .then(() => {
          dispatch(setUser(null));
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }
  
  export function postArticleAPI(payload) {
    return (dispatch) => {
        dispatch(setLoading(true))
      if (payload.image) {
        const storageRef = ref(getStorage(), `images/${payload.image.name}`);
  
        console.log('Storage Ref:', storageRef); // Add this line for debugging
  
        // Upload the image to Firebase Storage
        uploadBytes(storageRef, payload.image)
          .then((snapshot) => {
            console.log('Snapshot:', snapshot); // Add this line for debugging
  
            getDownloadURL(snapshot.ref)
              .then(async (downloadURL) => {
                try {
                  const postData = {
                    actor: {
                      description: payload.user.email,
                      title: payload.user.displayName,
                      date: Timestamp.now(),
                      image: payload.user.photoURL,
                    },
                    video: '', 
                    sharedImg: downloadURL,
                    comments: 0,
                    description: payload.description,
                  };
  
                  console.log('Post Data:', postData); 
  
          
                  await addDoc(collection(db, 'articles'), postData);
                  console.log('Article posted successfully.');
                  dispatch(getArticlesAPI());

                  dispatch(setLoading(false))
                } catch (error) {
                  console.error('Error writing to the database:', error);
                }
              })
              .catch((error) => {
                console.error('Error getting download URL:', error);
              });
          })
          .catch((error) => {
            console.error('Error uploading image to Firebase Storage:', error);
          });
      } else if (payload.video) {
        
        const postData = {
          actor: {
            description: payload.user.email,
            title: payload.user.displayName,
            date: Timestamp.now(),
            image: payload.user.photoURL,
          },
          video: payload.video, // Set the video as the YouTube link
          sharedImg: '', // Since it's a video, set sharedImg as an empty string
          comments: 0,
          description: payload.description,
        };
  
        // Write the data to the database
        addDoc(collection(db, 'articles'), postData)
          .then(() => {
            console.log('Article with video link posted successfully.');
            dispatch(getArticlesAPI());

            dispatch(setLoading(false))
          })
          .catch((error) => {
            console.error('Error posting article with video link:', error);
          });
      }
    };
  }
  


 
  export function getArticlesAPI() {
    return async (dispatch) => {
       
      try {
        dispatch(setLoading(true))
      
      
        // Reference to the 'articles' collection
        const articlesCollection = collection(db, 'articles');
  
        // Create a query to order documents by a field ('actor.date' in this case)
        const q = query(articlesCollection, orderBy('actor.date', 'desc'));
  
        // Execute the query to get the documents
        const querySnapshot = await getDocs(q);
  
        // Extract the data from the documents
        const articles = querySnapshot.docs.map((doc) => doc.data());

    

        dispatch(getArticles(articles))
        dispatch(setLoading(false))
   
        
  
        // // Dispatch the data to your Redux store or take further actions
        // dispatch({ type: 'GET_ARTICLES', payload: articles });
      } catch (error) {
        console.error('Error getting articles:', error);
      }
    };
  }
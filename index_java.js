const firebase = require('firebase')
const {DateTime} = require('luxon')

const shopAppJavaConfig = {
    apiKey: "AIzaSyCydnuausD32WIj1JYV1QGj3hK87wJiRoE",
    authDomain: "shop-app-java.firebaseapp.com",
    databaseURL: "https://shop-app-java-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "shop-app-java",
    storageBucket: "shop-app-java.appspot.com",
    messagingSenderId: "628383784398",
    appId: "1:628383784398:web:acab3f77d9983faf1a5f9f",
    measurementId: "G-M55Q5NXWKJ"
};

const collectionName = "Products"
firebase.initializeApp(shopAppJavaConfig)

let now = DateTime.local();

const loadData = () => {
    firebase.database().ref(collectionName).get()
        .then(
            result => Object.values(result.val())[0])
        .then(object =>
            Promise.all(new Array(100).fill(0).map(() => {
                now = now.plus({minutes: 1})
                return firebase.database().ref(collectionName).child(now.toFormat("LLL dd, yyyyhh:mm:ss a")).set(object)
            })))
        .then(() => console.log('done'))
        .catch(console.error)
}

const clearData = () => {
    firebase.database().ref(collectionName).get()
        .then(
            result => Object.entries(result.val())[0])
        .then(([key, object]) =>
            firebase.database().ref(collectionName).remove()
                .then(() => firebase.database().ref(collectionName).child(key).set(object))
        )
        .then(() => console.log('done'))
        .catch(console.error)
}

// loadData()

clearData()
const firebase = require('firebase')
const {v4} = require('uuid')

const shopAppConfig = {
    apiKey: "AIzaSyA_ujvmvuRcksEXLE5GIQzGfRJxD1aDunw",
    authDomain: "shop-app-38fbb.firebaseapp.com",
    databaseURL: "https://shop-app-38fbb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "shop-app-38fbb",
    storageBucket: "shop-app-38fbb.appspot.com",
    messagingSenderId: "755959854569",
    appId: "1:755959854569:web:149839ccdf9a5a05b14778",
    measurementId: "G-PKZMB0FKWT"
}

const collectionName = "products"
firebase.initializeApp(shopAppConfig)


const loadData = () => {
    firebase.database().ref(collectionName).get()
        .then(
            result => Object.values(result.val())[0])
        .then(object =>
            Promise.all(new Array(100).fill(0).map(() =>
                firebase.database().ref(collectionName).child(v4()).set(object)
        )))
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
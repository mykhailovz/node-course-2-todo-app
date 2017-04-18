const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Connected to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').find({
    //     // _id: "58f5b9273e69a93030faf919" // not work typ must be ObjectId not String
    //     _id: ObjectID('58f5bea564fcb6ba2097ee39')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find({}).count().then((count) => {
    //     console.log(`Todos count: ${count}` );
    //     // console.log(JSON.stringify(count, undefined, 2));
    // }, (err) => {
    //      console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({
        name: 'Andrew'
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    db.collection('Users').find({name: 'Andrew'}).toArray().then((docs) => {
        console.log('Length should be 3');
        console.log(docs.length);
    })

    db.close();
});
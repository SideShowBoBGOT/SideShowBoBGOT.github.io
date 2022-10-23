var data = {'id' : '1', 'name' : 'bla'};

// saveToIndexedDB('objectstoreName', data).then(function (response) {
//     console.log('data saved');
// }).catch(function (error) {
//     console.log(error.message);
// });

// deleteFromIndexedDB('objectstoreName', 'a');

// Load some data
// var id = '1';
//
// loadFromIndexedDB('objectstoreName', id ).then(function (reponse) {
//     data = reponse;
//     g = reponse;
//     console.log('data loaded OK');
//     console.log(g)
// }).catch(function (error) {
//     console.log(error.message);
// });

loadAllFromIndexedDB('objectstoreName').then(function (reponse) {
    data = reponse;
    g = reponse;
    console.log('data loaded OK');
    console.log(g)
}).catch(function (error) {
    console.log(error.message);
});

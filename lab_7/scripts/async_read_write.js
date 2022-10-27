async function loadFromIndexedDB(storeName, id){
    return new Promise(
        function(resolve, reject) {
            var dbRequest = indexedDB.open(storeName);

            dbRequest.onerror = function(event) {
                reject(Error("Error text"));
            };

            dbRequest.onupgradeneeded = function(event) {
                // Objectstore does not exist. Nothing to load
                event.target.transaction.abort();
                reject(Error('Not found'));
            };

            dbRequest.onsuccess = function(event) {
                var database      = event.target.result;
                var transaction   = database.transaction([storeName]);
                var objectStore   = transaction.objectStore(storeName);
                var objectRequest = objectStore.get(id);

                objectRequest.onerror = function(event) {
                    reject(Error('Error text'));
                };

                objectRequest.onsuccess = function(event) {
                    if (objectRequest.result) resolve(objectRequest.result);
                    else reject(Error('object not found'));
                };
            };
        }
    );
}

async function deleteFromIndexedDB(storeName, id){
    return new Promise(
        function(resolve, reject) {
            var dbRequest = indexedDB.open(storeName);

            dbRequest.onerror = function(event) {
                reject(Error("IndexedDB database error"));
            };

            dbRequest.onupgradeneeded = function(event) {
                var database    = event.target.result;
                var objectStore = database.createObjectStore(storeName, {keyPath: "id"});
            };

            dbRequest.onsuccess = function(event) {
                var database      = event.target.result;
                var transaction   = database.transaction([storeName], 'readwrite');
                var objectStore   = transaction.objectStore(storeName);
                var objectRequest = objectStore.delete(id); // Overwrite if exists

                objectRequest.onerror = function(event) {
                    reject(Error('Error text'));
                };

                objectRequest.onsuccess = function(event) {
                    resolve('Data saved OK');
                };
            };
        }
    );
}

async function loadAllFromIndexedDB(storeName) {
    return new Promise(
        function(resolve, reject) {
            var dbRequest = indexedDB.open(storeName);

            dbRequest.onerror = function(event) {
                reject(Error("Error text"));
            };

            dbRequest.onupgradeneeded = function(event) {
                // Objectstore does not exist. Nothing to load
                event.target.transaction.abort();
                reject(Error('Not found'));
            };

            dbRequest.onsuccess = function(event) {
                var database      = event.target.result;
                var transaction   = database.transaction([storeName]);
                var objectStore   = transaction.objectStore(storeName);
                var objectRequest = objectStore.getAll();

                objectRequest.onerror = function(event) {
                    reject(Error('Error text'));
                };

                objectRequest.onsuccess = function(event) {
                    if (objectRequest.result) resolve(objectRequest.result);
                    else reject(Error('object not found'));
                };
            };
        }
    );
}

async function saveToIndexedDB(storeName, object){
    return new Promise(
        function(resolve, reject) {
            if (object.id === undefined) reject(Error('object has no id.'));
            var dbRequest = indexedDB.open(storeName);

            dbRequest.onerror = function(event) {
                reject(Error("IndexedDB database error"));
            };

            dbRequest.onupgradeneeded = function(event) {
                var database    = event.target.result;
                var objectStore = database.createObjectStore(storeName, {keyPath: "id"});
            };

            dbRequest.onsuccess = function(event) {
                var database      = event.target.result;
                var transaction   = database.transaction([storeName], 'readwrite');
                var objectStore   = transaction.objectStore(storeName);
                var objectRequest = objectStore.put(object); // Overwrite if exists

                objectRequest.onerror = function(event) {
                    reject(Error('Error text'));
                };

                objectRequest.onsuccess = function(event) {
                    resolve('Data saved OK');
                };
            };
        }
    );
}
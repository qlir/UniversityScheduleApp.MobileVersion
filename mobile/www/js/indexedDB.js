// проверяем существования префикса.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// НЕ ИСПОЛЬЗУЙТЕ "var indexedDB = ..." вне функции.
// также могут отличаться и window.IDB* objects: Transaction, KeyRange и тд
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

function Indb(namedb, versiondb) {
    var stores = [],
        name = namedb,
        version = versiondb,
        db,
        ready;

    this.addStore = function (name, keyPath, attributes) {
        stores[name] = ({
            keyPath: keyPath,
            attributes: attributes
        });
    };

    this.drop = function () {
        indexedDB.deleteDatabase(name);
    };

    this.create = function (onsuccess, onerror) {
        var request = window.indexedDB.open(name, version);

        request.onerror = function (e) {
            gErr(e);
            if (onerror) {
                onerror();
            }
        };

        request.onsuccess = function(e) {
            db = request.result;
            log("idb.create" + db);
            if (onsuccess) onsuccess();
        };

        request.onupgradeneeded = function (event) {
            db = event.target.result;
            for (var storeName in stores) {
                objectStore = db.createObjectStore(storeName, { keyPath: stores[storeName].keyPath });
                for (var attr in stores[storeName].attributes) {
                    objectStore.createIndex(attr, attr, stores[storeName].attributes[attr]);
                }
            }
        };
    };

    this.addItemsToStore = function (storeName, items, options, response) {
        log('addItemsToStore:');
        log(items);
        var successErrorArray = [],
            objectStore = db.transaction([storeName], "readwrite").objectStore(storeName);
        for (var i in items) {
            var request = objectStore.add(items[i]);
            request.onerror = request.success = function (e) {
                log(e)
                successErrorArray.push(e);
                if (response && successErrorArray.length == items.length) {
                    response(successErrorArray);
                }
            };
        }
    };

    this.getItemByKey = function (storeName, key, onsuccess, onerror) {
        log("getItemByKey " + key);
        var request = db.transaction(storeName).objectStore(storeName).get(key);
        request.onsuccess = function (e) {
            if (onsuccess) {
                onsuccess(e.target.result);
            }
        };
        request.onerror = onerror;
    };

    this.getAllItems = function (storeName, onsuccess, onerror) {

        var trans = db.transaction(storeName);
        var store = trans.objectStore(storeName);
        var items = [];

        trans.oncomplete = function (evt) {
            if (onsuccess) onsuccess(items);
        };

        var cursorRequest = store.openCursor();

        cursorRequest.onerror = function (error) {
            //log(error);
            if (onerror) {
                onerror;
            }
        };

        cursorRequest.onsuccess = function (evt) {
            var cursor = evt.target.result;
            if (cursor) {
                items.push(cursor.value);
                cursor.continue();
            }
        };
    }
}
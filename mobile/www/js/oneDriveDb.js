(function () {
    var OneDriveDB = function (DB, tablename) {
        var db = DB,
            tableName = tablename,
            getObjectStore = function () {
                return  db.transaction([tableName], "readwrite").objectStore(tableName);
            },
            addItem = function (data, onsuccess, onerror) {
                readItem(data.id, function (fileData) {
                    if (fileData) {
                        replaceItem(data.id, data)
                    } else {
                        var transaction = db.transaction([tableName], "readwrite"),
                            objectStore = transaction.objectStore(tableName),
                            request = objectStore.add(data);
                        transaction.onerror = onerror;
                        request.onsuccess = onsuccess;
                        request.onerror = onerror;
                    }
                });
            },

            readItem = function (id, onsuccess) {
                getObjectStore().get(id).onsuccess = function (event) {
                    onsuccess(event.target.result);
                };
            },

            removeItem = function (id, onsuccess, onerror) {
                var request = getObjectStore()["delete"](id);
                /*request.onsuccess = onsuccess;
                 request.onerror = onerror;*/
            },

            replaceItem = function (id, newObj, onsuccess, onerror) {
                var request = getObjectStore()["delete"](id);
                request.onsuccess = function () {
                    addItem(newObj, onsuccess, onerror);
                };
                request.onerror = onerror;
            };

        return {
            addItem: addItem,
            readItem: readItem,
            removeItem: removeItem,
            replaceItem: replaceItem
        };
    };

    window.DbManager = window.DbManager || {
        createDB: function (nameDB, tableName, keyPath, parametersArray, onSuccess) {
            var idbRequest = indexedDB.open(nameDB, 1);
            idbRequest.onupgradeneeded =
                function (event) {
                    var db = event.target.result,
                        objectStore = db.createObjectStore(tableName, { keyPath: keyPath });
                    parametersArray.forEach(function (nameIndex) {
                        objectStore.createIndex(nameIndex, nameIndex, { unique: false });
                    });
                };
            idbRequest.onsuccess = function (event) {
                onSuccess(new OneDriveDB(event.target.result, tableName));
            }
        },

        deleteDB: function (nameDB) {
            indexedDB.deleteDatabase(nameDB);
        }
    };
}());


var pokemon = {
    "view": "pikachu",
    "energy": 100,
    "ready": true,
    "statistics": {
        "wins": 10,
        "losses": 2,
        "draw": 1,
        "fights": 13
    },
    "startElectricAttack": function (attackObject) {
        if (attackObject.injure && this.ready) {
            attackObject.injure('electric', 50);
        }
        this.energy -= 50;
    },
    "startFrontalAttack": function (attackObject) {
        if (attackObject.injure && this.ready) {
            attackObject.injure('physic', 10);
        }
        this.energy -= 10;
    },
    "injure": function (attackType, damage) {
        switch (attackType){
            case 'electric' :
                this.energy -= damage / 5;
                return;
                breack;
            case 'physic' :
                this.energy -= damage * 3;
                breack;
            case 'water' :
                this.energy -= damage / 2;
                breack;
            default :
                this.energy -= damage;
                break;
        }
    }
}
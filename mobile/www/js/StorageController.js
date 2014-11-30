function StorageController(ready) {
    var groupsStoreName = 'groups',
        schedulesStoreName = "schedules",
        scheduleAndDayStoreName = "scheduleAndDay",
        dbName = 'db',
        db;

    db = new Indb(dbName, 1);
     //db.drop();
    db.addStore(groupsStoreName, 'id', {
        isGroup: null,
        info: null
    });

    db.addStore(scheduleAndDayStoreName, 'id', {
        schedulesArray: null
    });

    db.addStore(schedulesStoreName, 'id', {
        lessons: null
    });

    this.getGroupsList = function (onsuccess, onerror) {
        db.getAllItems(groupsStoreName, onsuccess, onerror);
    };

    this.getSchedulesArrayForGroup = function (idGroup, onsuccess, onerror) {
        db.getItemByKey(scheduleAndDayStoreName, idGroup, function (result) {
            if (onsuccess) onsuccess(result.schedulesArray)
        }, onerror);
    };

    this.getSchedule = function (id, onsuccess, onerror) {
        db.getItemByKey(schedulesStoreName,
            id,
            function (result) {
                if (onsuccess) onsuccess(result.lessons);
            },
            onerror);
    };

    this.getLastGroup = function (onsuccess, onerror) {
        onsuccess({
            "id": "4/42-2014",
            "type": 'group',
            "info": {
                "level": "4",
                "number": "42",
                "name": "Информационные системы и технологии"
            }
        });
    };

    this.saveLastGroup = function (group) {
        console.log("save group" + group);
    };

    db.create(function () {
        if (ready) ready();
/*
        db.addItemsToStore(groupsStoreName, [
            {
                "id": "4/42-2014",
                "type": 'group',
                "info": {
                    "level": "4",
                    "number": "42",
                    "name": "Информационные системы и технологии"
                }
            },
            {
                "id": "4/42-2015",
                "type": 'group',
                "info": {
                    "level": "4",
                    "number": "43",
                    "name": "Информационные системы и технологии",
                    "facultet": "ИИИИ"
                }
            },
            {
                "id": "prepod-2014",
                "type": 'professor',
                "info": {
                    "firstName": "First",
                    "lastName": "Last",
                    "patronymic": "patronymic",
                    "kafedra": "KKK"
                }
            }
        ]);
        db.addItemsToStore(scheduleAndDayStoreName, [
            {
                "id": "4/42-2014",
                schedulesArray: {
                    '2014-10-11': 1,
                    '2014-10-12': 2,
                    '2014-10-13': 3
                }
            },
            {
                "id": "4/42-2015",
                schedulesArray: {
                    '2014-10-12': 4,
                    '2014-10-13': 5,
                    '2014-10-14': 6
                }
            },
            {
                "id": "prepod-2014",
                schedulesArray: {
                    '2014-10-20': 7,
                    '2014-10-23': 8
                }
            }
        ]);
        db.addItemsToStore(schedulesStoreName, [
            {
                "id": 1,
                "lessons": [
                    {
                        "startTime": "8:00",
                        "endTime": "9:35",
                        "room": "Г202",
                        "name": "Основы массопередачи",
                        "professor": null,
                        "type": "пр.з."
                    },
                    {
                        "startTime": "9:59",
                        "endTime": "11:25",
                        "room": "Г203",
                        "name": "Основы массопередачи",
                        "professor": "доц. Головушкин Б.А.",
                        "type": "лек."
                    }
                ]},
            {
                "id": 2,
                "lessons": [
                    {
                        "startTime": "8:00",
                        "endTime": "9:35",
                        "room": "A300",
                        "name": "БЖД",
                        "professor": null,
                        "type": "пр.з."
                    },
                    {
                        "startTime": "9:50",
                        "endTime": "11:25",
                        "room": "Г203",
                        "name": "Основы массопередачи",
                        "professor": "проф. Липин А.Г.",
                        "type": "лекция"
                    },
                    {
                        "startTime": "11:40",
                        "endTime": "13:15",
                        "room": null,
                        "name": "БЖД",
                        "professor": null,
                        "type": "лаб"
                    }
                ]},
            {
                "id": 3,
                "lessons": [
                    {
                        "startTime": "8:00",
                        "endTime": "9:35",
                        "room": "Г202",
                        "lessonName": "Основы массопередачи",
                        "professor": null,
                        "type": "пр.з."
                    },
                    {
                        "startTime": "9:59",
                        "endTime": "11:25",
                        "root": "Г203",
                        "lessonName": "Основы массопередачи",
                        "professor": "доц. Головушкин Б.А.",
                        "type": "лек."
                    }
                ]
            },
            {
                "id": 4,
                "lessons": [
                    {
                        "startTime": "8:00",
                        "endTime": "9:35",
                        "room": "A300",
                        "name": "БЖД",
                        "professor": null,
                        "type": "пр.з."
                    },
                    {
                        "startTime": "9:50",
                        "endTime": "11:25",
                        "room": "Г203",
                        "name": "Основы масsdsdgсопередачи",
                        "professor": "проф. Липин А.Г.",
                        "type": "лекция"
                    },
                    {
                        "startTime": "11:40",
                        "endTime": "13:15",
                        "room": null,
                        "name": "БЖД",
                        "professor": null,
                        "type": "лаб"
                    }
                ]
            },
            {
                "id": 5,
                "lessons": [
                    {
                        "startTime": "8:00",
                        "endTime": "9:35",
                        "room": "A300",
                        "name": "БЖД",
                        "professor": null,
                        "type": "пр.з."
                    },
                    {
                        "startTime": "9:50",
                        "endTime": "11:25",
                        "room": "Г203",
                        "name": "Основы массопередачи",
                        "professor": "проф. Липин А.Г.",
                        "type": "лекция"
                    },
                    {
                        "startTime": "11:40",
                        "endTime": "13:15",
                        "room": null,
                        "name": "БЖД",
                        "professor": null,
                        "type": "лаб"
                    },
                    {
                        "startTime": "11:40",
                        "endTime": "13:15",
                        "room": null,
                        "name": "БЖД",
                        "professor": null,
                        "type": "лаб"
                    }
                ]}         ,
            {
                "id": 6,
                "lessons": [
                    {
                        "startTime": "8:00",
                        "endTime": "9:35",
                        "room": "A300",
                        "name": "БЖД",
                        "professor": null,
                        "type": "пр.з."
                    },
                    {
                        "startTime": "9:50",
                        "endTime": "11:25",
                        "room": "Г203",
                        "name": "Основы ",
                        "professor": "проф. Липин А.Г.",
                        "type": "лекция"
                    },
                    {
                        "startTime": "11:40",
                        "endTime": "13:15",
                        "room": null,
                        "name": "БЖД",
                        "professor": null,
                        "type": "лаб"
                    }
                ]
            },
            {
                "id": 7,
                "lessons": [
                    {
                        "startTime": "8:00",
                        "endTime": "9:35",
                        "room": "A300",
                        "name": "БЖД",
                        "professor": null,
                        "type": "пр.з."
                    },
                    {
                        "startTime": "9:50",
                        "endTime": "11:25",
                        "room": "Г203",
                        "name": "Основы массопередачи",
                        "professor": "проф. Липин А.Г.",
                        "type": "лекция"
                    },
                    {
                        "startTime": "11:40",
                        "endTime": "13:15",
                        "room": null,
                        "name": "БЖД",
                        "professor": null,
                        "type": "лаб"
                    }
                ]},
            {
                "id": 8,
                "lessons": [
                    {
                        "startTime": "8:00",
                        "endTime": "9:35",
                        "room": "A300",
                        "name": "БЖД",
                        "professor": null,
                        "type": "пр.з."
                    },
                    {
                        "startTime": "9:50",
                        "endTime": "11:25",
                        "room": "Г203",
                        "name": "Основы массопередачи",
                        "professor": "проф. Липин А.Г.",
                        "type": "лекция"
                    },
                    {
                        "startTime": "11:40",
                        "endTime": "13:15",
                        "room": null,
                        "name": "суперосновы",
                        "professor": null,
                        "type": "лаб"
                    },
                    {
                        "startTime": "13:30",
                        "endTime": "15:05",
                        "room": null,
                        "name": "суперосновы",
                        "professor": null,
                        "type": "лаб"
                    }
                ]}
        ]);*/
    });
}

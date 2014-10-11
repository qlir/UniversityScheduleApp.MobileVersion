function StorageController(ready) {
    var groupsListStoreName = 'scheduleList',
        schedulesStoreName = "schedules",
        dbName = 'db',
        db;

    db = new Indb(dbName, 1);
    //db.drop();
    db.addStore(groupsListStoreName, 'id', {
        isGroup: null,
        info: null
    });

    db.addStore(schedulesStoreName, 'id', {
        lessons: null
    });

    this.getGroupsList = function (onsuccess, onerror) {
        db.getAllItems()
    };

    this.getScheduleForGroup = function (idGroup, onsuccess, onerror) {
        db.getItemByKey(schedulesStoreName,idGroup,onsuccess,onerror);
    };

    this.getLastGroup = function (onsuccess, onerror) {
        onsuccess({
            "id": "4/42-2014",
            "isGroup": true,
            "info": {
                "level": "4",
                "number": "42",
                "name": "Информационные системы и технологии"
            }
        });
    };

    this.saveLastGroup = function (group) {
        console.log('group saved:');
        console.log(group);
    };

    db.create(function () {
        if(ready) ready();
        /*db.addItemsToStore(groupsListStoreName, [
            {
                "id": "4/42-2014",
                "isGroup": true,
                "info": {
                    "level": "4",
                    "number": "42",
                    "name": "Информационные системы и технологии"
                }
            },
            {
                "id": "4/42-2015",
                "isGroup": true,
                "info": {
                    "level": "4",
                    "number": "43",
                    "name": "Информационные системы и технологии",
                    "facultet": "ИИИИ"
                }
            },
            {
                "id": "prepod-2014",
                "isGroup": false,
                "info": {
                    "firstName": "First",
                    "lastName": "Last",
                    "patronymic": "patronymic",
                    "kafedra": "KKK"
                }
            }
        ]);
        db.addItemsToStore(schedulesStoreName, [
            {
                "id": "4/42-2014",
                "lessons": [
                    [
                        {
                            "startTime": "8:00",
                            "endTime": "9:35",
                            "root": "Г202",
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
                    ],
                    [
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
                    ],
                    [
                        {
                            "startTime": "8:00",
                            "endTime": "9:35",
                            "root": "Г202",
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
                    ],
                    [
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
                    ]
                ]
            },
            {
                "id": "4/42-2015",
                "lessons": [null, [
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
                ], [
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
                ]]
            },
            {
                "id": "prepod-2014",
                "lessons": [
                    [
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
                    ],
                    [
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
                    ]
                ]
            }
        ])*/
    });
}

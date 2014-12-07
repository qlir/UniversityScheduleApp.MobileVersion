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
            if (!result) return onsuccess();
            result.schedulesArray.forEach(function (item) {
                item.startDate = new Date(item.startDate);
                item.endDate = new Date(item.endDate);
            });
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
        onsuccess();
    };

    this.saveLastGroup = function (group) {
        console.log("save group" + group);
    };

    this.addSchedules = function (schedules, onsuccess, onerror) {
        db.addItemsToStore(schedulesStoreName, schedules, onsuccess, onerror);
    };

    this.addSchedulesInfo = function (info, onsuccess, onerror) {
        db.addItemsToStore(scheduleAndDayStoreName, [info], onsuccess, onerror);
    };

    this.addGroupListItem = function (group, onsuccess, onerror) {
        db.addItemsToStore(groupsStoreName, [group], onsuccess, onerror);
    };

    db.create(function () {
        if (ready) ready();

        /* db.addItemsToStore(groupsStoreName, [
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
         "name": "информационные системы и технологии",
         "facultet": "�?�?�?�?"
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
         schedulesArray: [
         {
         lessonsID: 4,
         "startDate": "2014-12-1",
         "endDate": "2015-1-1",
         "period": 7
         },
         {
         lessonsID: 5,
         "startDate": "2014-12-2",
         "endDate": "2015-1-1",
         "period": 7
         },
         {
         lessonsID: 6,
         "startDate": "2014-12-3",
         "endDate": "2015-1-1",
         "period": 14
         }
         ]
         },
         {
         "id": "4/42-2015",
         schedulesArray: [
         {
         lessonsID: 1,
         "startDate": "2014-12-1",
         "endDate": "2015-1-1",
         "period": 7
         },
         {
         lessonsID: 2,
         "startDate": "2014-12-2",
         "endDate": "2015-1-1",
         "period": 7
         },
         {
         lessonsID: 3,
         "startDate": "2014-12-3",
         "endDate": "2015-1-1",
         "period": 14
         }
         ]
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
         ]},
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

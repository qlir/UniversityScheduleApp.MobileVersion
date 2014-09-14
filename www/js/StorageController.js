function StorageController() {
    var groupListUrl = "LocalStorage/GroupList.json",
        scheduleStorageUrl = "LocalStorage/";

    this.getGroupsList = function (onsuccess, onerror) {
        /*$.get(groupListUrl,function (response) {
            onsuccess(response);
        }).fail(function (e) {
                onerror(e);
            });*/
        onsuccess(
            [
            {
                "id": "ScheduleGroup-4-42",
                "level": "4",
                "number": "42",
                "name": "Информационные системы и технологии"
            },
            {
                "id": "4/12351",
                "name": "12351 Информационные системы и технологии"
            },
            {
                "id": "4/1352351",
                "name": "1352351Информационные системы и технологии"
            },
            {
                "id": "4/12521",
                "name": "12521Информационные системы и технологии",
                "number":"22",
                "level":"2"
            },
            {
                "id": "4/123515",
                "name": "Информационные системы и технологии"
            },
            {
                "id": "4/123511",
                "name": "123511Информационные системы и технологии"
            },
            {
                "id": "4/2315",
                "name": "2315Информационные системы и технологии"
            },
            {
                "id": "4/156234",
                "name": "156234Информационные системы и технологии"
            }
            ]
        );
    };

    this.getScheduleOfGroupByDay = function (idGroup, date, onsuccess, onerror) {
        /*$.get(this.generateUrlByGroupId(idGroup),function (response) {
         onsuccess(response);
         }).fail(function (e) {
         onerror(e);
         });
         */
        onsuccess(
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
        );
    };

    this.getLastGroup = function (onsuccess, onerror) {
        onsuccess({
            "id": "4/42-2014",
            "level": "4",
            "number": "42",
            "name": "Информационные системы и технологии"
        });
    };

    this.saveLastGroup = function (group) {
        console.log('group saved:');
        console.log(group);
    };
}

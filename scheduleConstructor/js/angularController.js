function AngularController($scope) {
    var scope = $scope,
        app = new AppController(),

        init = function () { };

    init();
    scope.weekArray = ["1","2"];
    scope.selectWeek = scope.weekArray[0];
    scope.onChangeSelectWeek = function(w) {
        scope.selectWeek = w;
    };
    scope.sortArray = ["Факультеты","Курсы","Группы"];
    scope.selectSort = scope.sortArray[0];
    scope.onChangeSelectSort = function(sort) {
        scope.selectSort = sort
    };
    scope.courseArray = ["1","2","3","4","5"];
    scope.selectCourse = scope.courseArray[0];
    scope.onChangeSelectCourse = function(c) {
        scope.selectCourse = c;
    };
    scope.facultyArray = ["ХТиК","ИУФИС","НХиТ","ОХиТ","Гуманитарный","Фундаментальной и прикладной химии","Заочного обучения"];
    scope.selectFaculty = scope.facultyArray[0];
    scope.onChangeSelectFaculty = function(f) {
        scope.selectFaculty = f;
    };
    scope.groupArray = ["42"];
    scope.selectGroup = scope.groupArray[0];
    scope.onChangeSelectGroup = function(g) {
        scope.selectGroup = g;
    };
    scope.specialityArray = ["Информационные системы и технологии","Автоматизация технологических процессов и производств","Основные процессы химических производств и химическая кибернетика","Технологическое оборудование химических и нефтехимических производств"];
    scope.selectSpeciality = scope.specialityArray[0];
    scope.onChangeSelectSpeciality = function(s) {
        scope.selectSpeciality = s;
    }
    scope.timeBeginArray = ["8:00", "9:50", "11:40", "13:30", "15:20", "17:10"];
    scope.timeEndArray = ["9:35", "11:25", "13:15", "15:05", "16:55", "18:45"];
    scope.selectBeginTime = scope.timeBeginArray[0];
    scope.selectEndTime = scope.timeEndArray[0];
    scope.onChangeSelectTime1 = function(t1) {
        scope.selectBeginTime = t1;
    };
    scope.onChangeSelectTime2 = function(t2) {
        scope.selectEndTime = t2;
    };
    scope.disciplineArray = ["Управление персоналом"];
    scope.selectDiscipline = scope.disciplineArray[0];
    scope.onChangeSelectDiscipline = function(dis) {
        scope.selectDiscipline = dis;
    };
    scope.teacherArray = ["Жарницкая Н.Ф.","Бобков С.П.","Таланова В.А."];
    scope.selectTeacher = scope.teacherArray[0];
    scope.onChangeSelectTeacher = function(teac) {
        scope.selectTeacher = teac;
    };
    scope.typeArray = ["ПЗ","Лекция","Лаб."];
    scope.selectType = scope.typeArray[0];
    scope.onChangeSelectType = function(typ) {
        scope.selectType = typ;
    };
    scope.auditoryArray = ["Г205","А104","В101","Б203"];
    scope.selectAuditory = scope.auditoryArray[0];
    scope.onChangeSelectAuditory = function(aud) {
        scope.selectAuditory = aud;
    };
    scope.schedule = {
        monday1: [
          {
                begin_time:"9:50" ,
                end_time:"11:25",
                discipline: "Управление персоналом",
                auditory:"A104",
                teacher: "Жарницкая Н.Ф.",
                type:"Лекция"
            },
            {
                begin_time:"11:40" ,
                end_time:"13:15",
                discipline: "Управление персоналом",
                auditory:"A104",
                teacher: "Жарницкая Н.Ф.",
                type:"ПЗ"
            }
        ],
        monday2: [
            {
                begin_time:"8:00" ,
                end_time:"9:35",
                discipline: "Професс.иностр.язык",
                auditory:"К408",
                teacher: "Костина Е.В.",
                type:"ПЗ"
            },
            {
            begin_time:"9:50" ,
            end_time:"11:25",
            discipline: "Управление персоналом",
            auditory:"A104",
            teacher: "Жарницкая Н.Ф.",
            type:"Лекция"
        },
            {
                begin_time:"11:40" ,
                end_time:"13:15",
                discipline: "Управление персоналом",
                auditory:"A104",
                teacher: "Жарницкая Н.Ф.",
                type:"ПЗ"
            }],
        tuesday1: [
            {
            begin_time:"8:00" ,
            end_time:"9:35",
            discipline: "Техн.-эконом. анализ  ",
            auditory:"А104",
            teacher: "Белоконская Е.Г.",
            type:"Лекция"
        },
            {
                begin_time:"9:50" ,
                end_time:"11:25",
                discipline: "Техн.-эконом. анализ  ",
                auditory:"А17",
                teacher: "Белоконская Е.Г.",
                type:"ПЗ"
            }
        ],
        tuesday2: [
            {
                begin_time:"8:00" ,
                end_time:"9:35",
                discipline: "Техн.-эконом. анализ  ",
                auditory:"А104",
                teacher: "Белоконская Е.Г.",
                type:"Лекция"
            },
            {
                begin_time:"9:50" ,
                end_time:"11:25",
                discipline: "Техн.-эконом. анализ  ",
                auditory:"А17",
                teacher: "Белоконская Е.Г.",
                type:"ПЗ"
            }],
        wednesday1: [
            {
            begin_time:"8:00" ,
            end_time:"9:35",
            discipline: "Информ. технологии на предприятии",
            auditory:"ДК9",
            teacher: "Галиаскаров Э.Г.",
            type:"Лекиця"
        },
            {
                begin_time:"8:00" ,
                end_time:"9:35",
                discipline: "Информ. технологии на предприятии",
                auditory:"ДК13",
                teacher: "Галиаскаров Э.Г.",
                type:"Лаб."
            }
        ],
        wednesday2: [
            {
                begin_time:"8:00" ,
                end_time:"9:35",
                discipline: "Информ. технологии на предприятии",
                auditory:"ДК9",
                teacher: "Галиаскаров Э.Г.",
                type:"Лекиця"
            },
            {
                begin_time:"9:50" ,
                end_time:"11:25",
                discipline: "Информ. технологии на предприятии",
                auditory:"ДК13",
                teacher: "Галиаскаров Э.Г.",
                type:"Лаб."
            }
        ],
        thursday1: [

        {
            begin_time:"8:00" ,
            end_time:"9:35",
            discipline: "Маркетинг информационных услуг",
            auditory:"ДК",
            teacher: "Власов А.П.",
            type:"Лекция"
        },
            {
                begin_time:"9:50" ,
                end_time:"11:25",
                discipline: "Информ. технологии на предприятии",
                auditory:"ДК13",
                teacher: "Галиаскаров Э.Г.",
                type:"Лаб."
            }
        ],
        thursday2: [
            {
                begin_time:"8:00" ,
                end_time:"9:35",
                discipline: "Маркетинг информационных услуг",
                auditory:"ДК",
                teacher: "Власов А.П.",
                type:"Лекция"
            },
            {
                begin_time:"9:50" ,
                end_time:"11:25",
                discipline: "Информ. технологии на предприятии",
                auditory:"ДК13",
                teacher: "Галиаскаров Э.Г.",
                type:"Лаб."
            }
        ],
        friday1: [
            {
            begin_time:"8:00" ,
            end_time:"9:35",
            discipline: "Мировые  информационные ресурсы",
            auditory:"ДК13",
            teacher: "Власов А.П.",
            type:"Лекция"
        },
            {
                begin_time:"9:50" ,
                end_time:"11:25",
                discipline: "Мировые  информационные ресурсы",
                auditory:"ДК13",
                teacher: "Власов А.П.",
                type:"Лаб."
            }],
        friday2: [
            {
                begin_time:"8:00" ,
                end_time:"9:35",
                discipline: "Професс.иностр.язык",
                auditory:"К408",
                teacher: "Костина Е.В.",
                type:"ПЗ"
            },{
            begin_time:"9:50" ,
            end_time:"11:25",
            discipline: "Мировые  информационные ресурсы",
            auditory:"ДК13",
            teacher: "Власов А.П.",
            type:"Лаб."
        }
        ],
        saturday1: [
            /*{
            begin_time:"8:00" ,
            end_time:"9:35",
            discipline: "КИС",
            auditory:"Г205",
            teacher: "Власов А.П.",
            type:"ПЗ"
        }*/
        ],
        saturday2: [
        /*{
            begin_time:"8:00" ,
            end_time:"9:35",
            discipline: "КИС",
            auditory:"Г205",
            teacher: "Власов А.П.",
            type:"ПЗ"
        }*/
        ],
        sunday1: [
        /*{
            record: "Выходной"
        }*/
        ],
        sunday2: [
        /*{
            record:"Выходной"
        }*/
        ]
    }
    ;
}
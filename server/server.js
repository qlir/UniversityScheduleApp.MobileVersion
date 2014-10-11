var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bodyParser = require('body-parser'),
    serveStatic = require('serve-static'),
    cookieParser = require('cookie-parser'),
/*
 Server schemes part:
 - markSchema. Used for store marks
 - userSchema. Used for store users
 - ricSchema. Used for store ric servers params
 - oewebSchema. Used for store params
 */
    groupSchema = new Schema({
        "id": Number,
        "level": Number,
        "number": Number,
        "name": String
    }),
    scheduleOfGroupSchema = new Schema({
        "groupId": Number,
        "scheduleId": Number,
        "date": String
    }),

    scheduleSchema = new Schema({
        "id": Number,
        "lessonsData": Array
    }),
//Server schemes part:

/*
 Server models part
 - Mark. Used for manipulate marks
 - User. Used for manipulate users
 - RIC.  Used for manipulate ric servers
 */
    group = mongoose.model('Mark', groupSchema),
    scheduleOfGroup = mongoose.model('User', scheduleOfGroupSchema),
    schedule = mongoose.model('RIC', scheduleSchema);
//Server models part

/*
 Use part of OEWeb.
 Included cookie and body parsers.

app.use(serveStatic('./', {
    'index': ['test', 'test.html', 'test/']
}));
app.use(cookieParser());
app.use(bodyParser({limit: '50mb'}));*/
//Use part of OEWeb.

/*
 POST server methods
 - marks. Used for create new marks
 - ric. Used for create new rics
 - tiles. Used for create new tiles

app.post('/group', function (request, response) {
    var rb = request.body;
    Mark.findOne({"mark": rb.mark}, function (e, m) {
        if (!m) {
            var mark = new Mark({
                "format": rb.format,
                "mark": rb.mark,
                "name": rb.name,
                "period": rb.period,
                "type": rb.type
            });
            mark.save(function (e, m) {
                response.send('OK!');
                response.end();
            })
        } else {
            console.log(m);
            response.send('Mark "' + rb.mark + '" already exists!');
            response.end();
        }
    });
});

app.post('/ric', function (request, response) {
    var rb = request.body;
    RIC.findOne({"id": rb.id}, function (e, r) {
        if (!r) {
            var ric = new RIC({
                "id": rb.id,
                "host": rb.host,
                "name": rb.name,
                "port": rb.port
            });
            ric.save(function (e, m) {
                response.send('OK!');
                response.end();
            })
        } else {
            console.log(r);
            response.send('RIC "' + rb.id + '" already exists!');
            response.end();
        }
    });
});

app.post('/user', function (request, response) {
    var rb = request.body;
    User.findOne({"mail": rb.mail}, function (e, u) {
        if (!u) {
            var user = new User({
                "mail": rb.mail,
                "leader": '',
                "tiles": [],
                "contacts": [],
                "palette": {},
                "ricList": {}
            });
            user.save(function (e, m) {
                response.send('OK!');
                response.end();
            })
        } else {
            console.log(u);
            response.send('User "' + rb.mail + '" already exists!');
            response.end();
        }
    });
});
//POST server methods

/*
 GET server methods
 - marks. Used for read marks
 - ric. Used for read rics
 - tiles. Used for read tiles
 */
app.get('/schedule', function (request, response) {
    Mark.findOne({"mark": request.query.mark}, function (e, m) {
        if (e) return console.error(e);
        if (m) {
            console.log(m);
            response.send(m);
            response.end();
        } else {
            response.send('Empty');
            response.end();
        }
    });
});

app.get('/ric', function (request, response) {
    RIC.findOne({"id": request.query.id}, function (e, r) {
        if (e) return console.error(e);
        if (r) {
            console.log(r);
            response.send(r);
            response.end();
        } else {
            response.send('Empty');
            response.end();
        }
    });
});

app.get('/user', function (request, response) {
    User.findOne({"mail": request.query.mail}, function (e, u) {
        if (e) return console.error(e);
        if (u) {
            console.log(u);
            response.send(u);
            response.end();
        } else {
            response.send('Empty');
            response.end();
        }
    });
});
//GET server methods

/*
 PUT server methods
 - mark. Used for update mark
 - ric. Used for update ric
 - user. Used for update user

app.put('/mark', function (request, response) {
    var rb = request.body, opt = {};
    if (rb.format) {
        opt.format = rb.format
    }
    if (rb.mark) {
        opt.mark = rb.mark
    }
    if (rb.name) {
        opt.name = rb.name
    }
    if (rb.period) {
        opt.period = rb.period
    }
    if (rb.type) {
        opt.format = rb.type
    }
    Mark.findOneAndUpdate({"mark": request.query.mark}, opt, {}, function (e, m) {
        if (e) return console.error(e);
        console.log(m);
        response.send('OK!');
        response.end();
    });
});

app.put('/ric', function (request, response) {
    var rb = request.body, opt = {};
    if (rb.id) {
        opt.id = rb.id
    }
    if (rb.host) {
        opt.host = rb.host
    }
    if (rb.port) {
        opt.port = rb.port
    }
    if (rb.name) {
        opt.name = rb.name
    }
    RIC.findOneAndUpdate({"id": request.query.id}, opt, {}, function (e, r) {
        if (e) return console.error(e);
        console.log(r);
        response.send('OK!');
        response.end();
    });
});

app.put('/user', function (request, response) {
    var rb = request.body, opt = {};
    if (rb.mail) {
        opt.mail = rb.mail
    }
    if (rb.leader) {
        opt.leader = rb.leader
    }
    if (rb.tiles) {
        opt.tiles = rb.tiles
    }
    if (rb.contacts) {
        opt.contacts = rb.contacts
    }
    if (rb.palette) {
        opt.palette = rb.palette
    }
    User.findOneAndUpdate({"mail": request.query.mail}, opt, {}, function (e, u) {
        if (e) return console.error(e);
        console.log(u);
        response.send('OK!');
        response.end();
    });
});
//PUT server methods

/*
 DELETE server methods
 - mark. Used for delete mark
 - ric. Used for delete ric
 - user. Used for delete user

app.delete('/mark', function (request, response) {
    Mark.findOneAndRemove({"mark": request.query.mark}, {}, function (e, m) {
        if (e) return console.error(e);
        console.log(m);
        response.send('OK!');
        response.end();
    });
});

app.delete('/ric', function (request, response) {
    RIC.findOneAndRemove({"id": request.query.id}, {}, function (e, r) {
        if (e) return console.error(e);
        console.log(r);
        response.send('OK!');
        response.end();
    });
});

app.delete('/user', function (request, response) {
    User.findOneAndRemove({"mail": request.query.mail}, {}, function (e, u) {
        if (e) return console.error(e);
        console.log(u);
        response.send('OK!');
        response.end();
    });
});
//DELETE server methods

app.del('/user', function (request, response) {
    console.log('oooooookkkkaaaaaaayyy!');
});

/*
 Server listener
 */
(function () {
    console.dir(process.argv);
    mongoose.connect('mongodb://localhost:' + (process.argv[3] ? parseInt(process.argv[3].split('=')[1]) : 27017) + '/mongoosedb');
    app.listen((process.argv[2] ? parseInt(process.argv[2].split('=')[1]) : 8080), function () {
        console.log('OEWeb server start.\r\n');
    });
})();
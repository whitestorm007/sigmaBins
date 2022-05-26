const express = require('express');
const db = require('mongodb').MongoClient;
const app = express()
var path = require('path')

var bodyParser = require('body-parser');
var post = require('./modules/fun');

const port = process.env.PORT || 5000
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var DB_url = "<your mongodb url>";

let _id_counter = 0



app.get("/", (req, res) => {
    res.render("index")
})
app.get("/api", (req, res) => {
    res.send("this is api key generate")
});
app.get("/docs", (req, res) => {
    res.send("this is api Docs")
});

app.get("/v", (req, res) => {

})
app.get("/view/:id", (req, res) => {

    let wrong_passsword = {
        code: 404,
        err: "wrong Password"
    }

    db.connect(DB_url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sigmaBins");
        let q = { id: req.params.id }
        dbo.collection("data").findOne(q, function(err, data) {
            if (err) throw err;
            //  post.validIt(data, req.body, res)

            if (data !== null) {
                if (post.validPostTime(data)) {
                    if (data.isPasswordProtected === false) {
                        res.render("view", { data })
                    } else if (body.password !== undefined && body.password === data.password) {
                        res.render("view", { data })
                    } else if (body.password !== undefined && body.password !== data.password) {
                        res.json({
                            code: 404,
                            err: "wrong Password"
                        })
                    } else if (body.password === undefined) {
                        res.send(`please enter password`)
                    } else {
                        res.send("something want wrong ")
                    }
                } else {
                    res.send({ code: 402, err: "Post Expired" })
                }
            } else {
                res.json({ code: 408, err: "No Post Found" })
            }
            checkForBurn(data)
            db.close();
        });
    });

});


app.post("/save", (req, res) => {
    function id() {
        return '_' + (_id_counter++).toString(36) + '_' + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(36)
    }

    let ids = id()
    let title = req.body.title
    let Expiration = req.body.Expiration
    let Exposure = req.body.Exposure
    let password = req.body.pass
    let datas = req.body.data
    password = password.trim()
    let isPasswordProtected = password.length === 0 ? false : true



    console.log(Exposure)
    let data = {
        id: ids,
        title: title,
        isPasswordProtected: isPasswordProtected,
        password: password,
        createdAt: new Date(),
        expireAt: post.ExpireAt(Expiration),
        Expiration: Expiration,
        Exposure: Exposure,
        data: datas,
    }

    db.connect(DB_url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sigmaBins");

        dbo.collection("data").insertOne(data, function(err, data) {
            if (err) throw err;
            console.log("1 document inserted");
            res.redirect(`/view/${ids}`)
            db.close();
        });
    });

})


// apis 

app.post("/view", (req, res) => {

    let wrong_password = {
        code: 404,
        err: "wrong Password"
    }
    db.connect(DB_url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sigmaBins");
        let q = { id: req.body.id }
        dbo.collection("data").findOne(q, function(err, data) {
            if (err) throw err;
            post.validIt(data, req.body, res)
            checkForBurn(data)
            db.close();
        });
    });


})

function checkForBurn(data) {
    if (!post.validPostTime(data)) {

    }
}
app.post("/searchPast", (req, res) => {

    // get post by title
    console.log(req.body.title)
    console.log(req.body.token)


})
app.post("/getView", (req, res) => {

    // get view  of past
    console.log(req.body.title)
    console.log(req.body.token)


})
app.listen(port, () => {
    console.log(`server is running on port : http://localhost:${port}`)
})

 function Dates(Expiration) {


     if (Expiration === "never") {
         return "never"
     }

     if (Expiration === "Burn after read") {
         return "1"
     }
     if (Expiration === "10 Minutes") {
         var nextHour = Date.now() + 1000 * 60 * 10;
         return new Date(nextHour)
     }
     if (Expiration === "1 Hour") {
         var nextHour = Date.now() + 1000 * 60 * 60;
         return new Date(nextHour)
     }
     if (Expiration === "1 Day") {
         let Day = 1;
         let now = new Date();
         now.setDate(now.getDate() + Day);
         return now
     }
     if (Expiration === "1 Week") {

         let numWeeks = 1;
         let now = new Date();
         now.setDate(now.getDate() + numWeeks * 7);
         return now
     }
     if (Expiration === "2 Weeks") {

         let numWeeks = 2;
         let now = new Date();
         now.setDate(now.getDate() + numWeeks * 7);
         return now


     }
     if (Expiration === "6 Months") {
         var today = new Date();
         var addMonth = new Date(new Date(today).setMonth(today.getMonth() + 6));
         return addMonth
     }
     if (Expiration === "1 Year") {
         const aYearFromNow = new Date();
         aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);
         return aYearFromNow
     }

 }

 function validPostTime(data) {
     let ca = data.createdAt
     let ea = data.expireAt

     if (data.Expiration === "never") {
         return true
     } else if (data.Expiration === "Burn after read") {
         return true
     } else if (Date.parse(ca) < Date.parse(ea)) {
         return true
     } else {
         return false
     }

 }

 function validView(data, body, res) {
     if (data !== null) {
         if (validPostTime(data)) {
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
 }


 module.exports.validIt = validView;
 module.exports.validPostTime = validPostTime;
 module.exports.ExpireAt = Dates;
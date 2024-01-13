const express = require("express")
const router = express.Router()


const db = require("../data/db")



router.use("/patientpage", async function(req, res){
  
    try{
        const [patients,] = await db.execute("select * from patient_details")
        res.render("patientpage", {
            list: patients
        })
    }
    catch(err){
        console.log(err);
    }
})



module.exports = router
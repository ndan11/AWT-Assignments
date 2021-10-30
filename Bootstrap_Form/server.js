const express = require('express')
const fs = require('fs')

const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended : false}))

const validateForm = (body) => {
    const errors = {}
    if(!body.mobile.match(/^[6-9]\d{9}$/)){
        errors.mobile = "Invalid Mobile Number"
    }
    if((Date.now() - new Date(body.dob)) < 0){
        errors.date = "Invalid Date of Birth"
    }
    return errors
}

const getProfile = (errors) => {
    let file = fs.readFileSync(__dirname + '/public/profile.html','utf-8')
        .replace('{%NAME_ERROR%}',errors && errors.name ? errors.name : "")
        .replace('{%DATE_ERROR%}',errors && errors.date ? errors.date : "")
        .replace('{%MOBILE_ERROR%}',errors && errors.mobile ? errors.mobile : "")
    return file
}

const getTable = (details) => {
    let file = fs.readFileSync(__dirname + '/public/table.html','utf-8')
        .replace('{%NAME%}',details.name)
        .replace('{%EMAIL%}',details.email)
        .replace('{%MOBILE%}',details.mobile)
        .replace('{%DOB%}',details.dob)
        .replace('{%GENDER%}',details.gender)
        .replace('{%ADDRESS%}',details.address)
        .replace('{%INSTITUTE%}',details.institute)
        .replace('{%DEPARTMENT%}',details.department)
        .replace('{%SEMESTER%}',details.semester)
    return file
}

app.get('/',(req,res) => {
    res.send(getProfile())
})
.post('/',(req,res) => {
    let errors = validateForm(req.body)
    if(Object.keys(errors).length > 0){
        res.send(getProfile(errors))
    }else{
        console.log(req.body)
        res.send(getTable(req.body))
    }
})

app.listen(4000,() => {
    console.log(`Server started at http://localhost:4000`)
   console.log("Bootstrap Form By Nandan")
})
const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { User } = require('./models/User')

mongoose.connect('mongodb+srv://moon:moon89@nodenreact-yyvvm.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// application/json
app.use(bodyParser.json())

app.get('/',(req,res) => res.send('Hello World'))

app.post('/register', (req,res) => {
    // 회원가입할때 필요한 정보들을 Client에서 가져오면
    // 그것들을 데이터베이스에 넣어준다.

    const user = new User(req.body)

    user.save((err,doc) => {
        if(err) return res.json({
            success:false,err
        })
        return res.status(200).json({
            success:true
        })
    })
})




app.listen(port, () => console.log('app start on port 5000!'))
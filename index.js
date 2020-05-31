const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { User } = require('./models/User')
const cookieParser = require('cookie-parser')

const config = require('./config/key')

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// application/json
app.use(bodyParser.json())
app.use(cookieParser())

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

app.post('/login',(req,res) => {
    // 요청된 이메일을 데이터베이스에서 찾는다.
    User.findOne({email : req.body.email}, (err,user) => {
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "해당하는 이메일이 없습니다."
            })
        }
        // 요청한 이메일이 있다면 비밀번호를 확인
        user.comparePassword(req.body.password, (err,isMatch) => {
            if(!isMatch)
            return res.json({
                loginSuccess: false,
                message: "비밀번호가 틀렸습니다."
            })
        })

        // 비밀번호까지 같다면 Token 생성
        user.generateToken((err,user) => {
            if(err) return res.status(400).send(err)

            // 토큰을 저장한다. 어디에? 쿠키(cookie-parser), 로컬
            res.cookie("x_auth", user.token)
            .status(200)
            .json({loginSuccess: true, userId: user._id})
        })
    })
})



app.listen(port, () => console.log('app start on port 5000!'))
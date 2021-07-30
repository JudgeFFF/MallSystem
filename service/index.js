const Koa = require('koa')
const app = new Koa()

// const mongoose = require('mongoose')
// const { connect, initSchemas } = require('./database/init.js')

const cors = require('koa2-cors')
app.use(cors())

const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

const Router = require('koa-router')
let router = new Router();

let user = require('./appApi/user.js')
router.use('/user', user.routes())
let goods = require('./appApi/goods.js')
router.use('/goods',goods.routes())
let category = require('./appApi/category.js')
router.use('/category',category.routes())
let categorySub = require('./appApi/categorySub.js')
router.use('/categorySub',categorySub.routes())

app.use(router.routes())
app.use(router.allowedMethods())


app.listen(3000, () => {
    console.log('[Server] starting at port 3000')
})

// 立即执行函数
// ; (async () => {
//     await connect()
//     initSchemas()
//     const User = mongoose.model('User')
//     let oneUser = new User({ userName: 'JudgeF', password: '123456' })

//     oneUser.save().then(() => {
//         console.log('插入成功')

//     })
//     let users = await User.find({}).exec()

//     console.log('------------------')
//     console.log(users)
//     console.log('------------------')
// })()


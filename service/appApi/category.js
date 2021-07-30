const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')
const fs = require('fs')
const { connect, initSchemas } = require('../database/init')

router.get('/insertAllCategory', async (ctx) => {
    await connect()
    initSchemas()
    fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const Category = mongoose.model('Category')
        data.RECORDS.map((value, index) => {
            console.log(value)
            let newCategory = new Category(value)
            newCategory.save().then(() => {
                saveCount++
                console.log('成功' + saveCount)
            }).catch(error => {
                console.log('失败：' + error)
            })
        })
    })
    ctx.body = "开始导入数据"
})

module.exports = router;
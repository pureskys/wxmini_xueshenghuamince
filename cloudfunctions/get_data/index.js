// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
    var class1 = event.class1
    return await db.collection(class1).get()
    .then(res=>{
        return res
    })

   
}
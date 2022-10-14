// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
    var pipei_root = event.pipei_root
    var mubiao = ""
    var mubiao_xiugaimima = event.mubiao_xiugaimima
    var username = event.username
    var change_passwoed = event.change_passwoed
    var class1 = event.class1
    // 学生登录数据库判断
    if (event.pipeibanji == "1b") {
        mubiao = "21Chemistry_class_II"
        return await db.collection(mubiao).where({
                username: username
            }).get()
            .then(res => {
                return res
            })
    }
    if (event.pipeibanji == "1a") {
        mubiao = "21Chemistry_class_I"
        return await db.collection(mubiao).where({
                username: username
            }).get()
            .then(res => {
                return res
            })
    }
    if (event.pipeibanji == "2a") {
        mubiao = "22Chemistry_class_I"
        return await db.collection(mubiao).where({
                username: username
            }).get()
            .then(res => {
                return res
            })
    }
    if (event.pipeibanji == "2b") {
        mubiao = "22Chemistry_class_II"
        return await db.collection(mubiao).where({
                username: username
            }).get()
            .then(res => {
                return res
            })
    }
    // 学生修改密码
    if (mubiao_xiugaimima == true) {
        return await db.collection(class1).where({
            username: username
        }).update({
            data: {
                password: change_passwoed
            }
        }).then(res => {
            return res
        })
    }
    // 教师登录
    if (pipei_root == true) {
        root = "Root"
        return await db.collection(root).where({
                username: username
            }).get()
            .then(res => {
                return res
            })
    }



}
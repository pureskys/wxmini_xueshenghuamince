// pages/xiugai_gerenxinxi/xiugai_gerenxinxi.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cunzai: "",
        banji: "",
        zhuangtai: false,
        radio: '1',
        scr: "https://7375-sun-3g6gwmbw83fc31a4-1309504880.tcb.qcloud.la/image/cut.jpg",
        name: "",
        age: "",
        username: "",
        password: "",
        gender: "男",
        tele: "",
        qq: "",
        weixin: "",
        gerenjianjie: "",
        class1: "",
        option1: [{
                text: '21级',
                value: 1
            },
            {
                text: '22级',
                value: 2
            },
        ],
        value1: 2,
        option2: [{
                text: '化学一班',
                value: 'a'
            },
            {
                text: '化学二班',
                value: 'b'
            },

        ],
        value2: 'b'
    },
    username(res) {
        this.setData({
            username: res.detail
        })
    },
    password(res) {
        this.setData({
            password: res.detail
        })
    },
    name(res) {
        this.setData({
            name: res.detail
        })
    },
    age(res) {
        this.setData({
            age: res.detail
        })
    },
    tele(res) {
        this.setData({
            tele: res.detail
        })
    },
    qq(res) {
        this.setData({
            qq: res.detail
        })
    },
    weixin(res) {
        this.setData({
            weixin: res.detail
        })
    },
    gerenjianjie(res) {
        this.setData({
            gerenjianjie: res.detail
        })
    },
    // 年级选择
    nianji(res) {
        this.setData({
            value1: res.detail
        })
    },
    // 班级选择
    banji(res) {
        this.setData({
            value2: res.detail
        })
    },
    // 判断男女
    onChange(event) {
        this.setData({
            radio: event.detail,
        });
        if (event.detail == 1) {
            this.setData({
                gender: "男"
            })
        }
        if (event.detail == 2) {
            this.setData({
                gender: "女"
            })
        }
        console.log(this.data.gender)

    },
    // 选择图片
    xiugai_image() {
        wx.chooseMedia({
                count: 1,
                mediaType: ['image', 'image'],
                sourceType: ['album', 'camera'],
            })
            .then(res => {
                wx.showToast({
                    title: '加载中',
                    icon: 'loading',
                    duration: 1500
                })
                console.log(res.tempFiles[0].tempFilePath)
                this.setData({
                    scr: res.tempFiles[0].tempFilePath
                })
            }).catch(err => {
                // buxie
            })


    },
    // 确认注册按钮
    zhuce() {
        if (this.data.username.length > 0 && this.data.password.length > 0 && this.data.name.length > 0 && this.data.age.length > 0 && this.data.tele.length > 0 && this.data.gerenjianjie.length > 0) {
            let banji = this.data.value1 + this.data.value2
            if (banji == "1a") {
                this.setData({
                    class1: "21Chemistry_class_I"
                })
            }
            if (banji == "1b") {
                this.setData({
                    class1: "21Chemistry_class_II"
                })
            }
            if (banji == "2a") {
                this.setData({
                    class1: "22Chemistry_class_I"
                })
            }
            if (banji == "2b") {
                this.setData({
                    class1: "22Chemistry_class_II"
                })
            }
            this.setData({
                zhuangtai: true,
            })
            wx.cloud.database().collection(this.data.class1).where({
                    username: this.data.username
                }).get()
                .then(res => {
                    this.setData({
                        cunzai: res.data[0].username
                    })
                    console.log("存在判断", res.data[0].username)
                    console.log("来喽", this.data.cunzai, this.data.username)
                    if (this.data.cunzai == this.data.username) {
                        wx.showToast({
                            title: '该学号已注册',
                            icon: "error"
                        })
                        this.setData({
                            zhuangtai: false,
                        })
                    }
                    if (this.data.cunzai !== this.data.username) {
                        this.get_fangfa()
                    }
                }).catch(err => {
                    console.log("没有学号")
                    this.get_fangfa()
                })
        } else {
            wx.showToast({
                title: '请检查必填',
                icon: 'none',
                duration: 2500
            })
        }

    },
    // 提交方法
    get_fangfa() {
        let extname = this.data.scr.split(".").pop()
        let cloudPath = this.data.class1 + "/" + this.data.name + "." + extname
        wx.cloud.uploadFile({
                cloudPath: cloudPath,
                filePath: this.data.scr
            })
            .then(res => {
                wx.showToast({
                    title: '加载中',
                    icon: 'loading',
                    duration: 1500
                })
                wx.cloud.getTempFileURL({
                    fileList: [res.fileID],
                }).then(res1 => {
                    console.log("获取的图片直练", res1.fileList[0].tempFileURL)
                    this.setData({
                        scr: res1.fileList[0].tempFileURL
                    })
                    this.getdata()


                })

            })
            .catch(err => {
                this.getdata()
            })

    },
    // 提交信息
    getdata() {
        wx.cloud.database().collection(this.data.class1).add({
                data: {
                    user: {
                        age: this.data.age,
                        gender: this.data.gender,
                        name: this.data.name,
                        avatar: this.data.scr,
                        qq: this.data.qq,
                        tele: this.data.tele,
                        weixin: this.data.weixin
                    },
                    gerenjianjie: this.data.gerenjianjie,
                    username: this.data.username,
                    password: this.data.password,
                    class: this.data.class1
                }
            })

            .then(res => {
                wx.clearStorage()
                console.log("成功提交", res)
                wx.setStorageSync('data_base', false)
                wx.showToast({
                    title: '注册成功',
                    icon: "success",
                    duration: 2000
                })
                setTimeout(function () {
                    wx.reLaunch({
                        url: '../xuesheng/xuesheng',
                    })
                }, 2000)
            })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})
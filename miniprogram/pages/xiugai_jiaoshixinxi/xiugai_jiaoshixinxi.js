// pages/xiugai_gerenxinxi/xiugai_gerenxinxi.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        zhuangtai: false,
        radio: '1',
        data_base: "",
        scr: "",
        name: "",
        age: "",
        username: "",
        gender: "",
        tele: "",
        qq: "",
        weixin: "",
        jiyu: "",
        class1: "",
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
    jiyu(res) {
        this.setData({
            jiyu: res.detail
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
    // 确认修改个人信息按钮
    xiugai_gerenxinxi() {
        wx.clearStorageSync()
        this.setData({
            zhuangtai: true
        })
        let extname = this.data.scr.split(".").pop()
        let cloudPath = "教师照片" + "/" + this.data.name + new Date().getTime() + "." + extname
        wx.cloud.uploadFile({
                cloudPath: cloudPath,
                filePath: this.data.scr
            })
            .then(res => {
                wx.cloud.getTempFileURL({
                    fileList: [res.fileID],
                }).then(res1 => {
                    console.log("获取的图片直练", res1.fileList[0].tempFileURL)
                    this.setData({
                        scr: res1.fileList[0].tempFileURL
                    })
                    setTimeout(function () {
                        wx.showToast({
                            title: '加载中',
                            icon: 'loading',
                            duration: 1500
                        })
                    }, 1500)
                    this.getdata()


                })

            })
            .catch(err => {
                this.getdata()
            })

    },
    // 提交信息
    getdata() {
        wx.clearStorageSync()
        wx.cloud.database().collection("Root").where({
                username: this.data.username
            })
            .update({
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
                    jiyu: this.data.jiyu
                }

            })
            .then(res => {
                console.log("成功提交", res)
                wx.showToast({
                  title: '修改成功',
                  icon:"success",
                  duration:1500
                })
                setTimeout(function () {
                    wx.reLaunch({
                        url: '../jiaoshi/jiaoshi',
                    })
                }, 1500)

            })


    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        let data_base1 = wx.getStorageSync("data_base1")
        this.setData({
            class1: data_base1.class,
            scr: data_base1.user.avatar,
            name: data_base1.user.name,
            age: data_base1.user.age,
            username: data_base1.username,
            gender: data_base1.user.gender,
            tele: data_base1.user.tele,
            qq: data_base1.user.qq,
            weixin: data_base1.user.weixin,
            jiyu: data_base1.jiyu,
        })
        if(data_base1.user.gender=="男"){
            this.setData({
                radio:"1"
            })
        }
        else if (data_base1.user.gender=="女"){
            this.setData({
                radio:"2"
            })
        }
        console.log("缓存", data_base1)
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
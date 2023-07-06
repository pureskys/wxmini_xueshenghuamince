Page({

    /**
     * 页面的初始数据
     */
    data: {
        data_base: "",
        data_base1: "",
        net_username1: "",
        net_password1: "",
        net_username: "",
        net_password: "",
        laoshi_username: "",
        laoshi_password: "",
        xuesheng_username: "",
        xuesheng_password: ""
    },
    // 骨架屏加载状态
    jiazai() {
        this.setData({
            loading: false
        })
    },
    // 学生登录按钮
    xuesheng() {
        if (!this.data.data_base) {
            wx.navigateTo({
                url: '/pages/xuesheng/xuesheng',
            })
        } else {
            wx.cloud.database().collection(this.data.data_base.class)
                .where({
                    username: this.data.xuesheng_username
                })
                .get()
                .then(res => {
                    this.setData({
                        net_password: res.data[0].password
                    })
                    if (this.data.net_password == this.data.xuesheng_password) {
                        wx.navigateTo({
                            url: '../xuesheng_base/xuesheng_base',
                        })
                    } else {
                        wx.clearStorageSync()
                        wx.showToast({
                            title: '请重新登录',
                            icon: "error",
                            duration: 500
                        })
                        setTimeout(function () {
                            wx.navigateTo({
                                url: '../xuesheng/xuesheng',
                            })
                        }, 500)
                    }
                }).catch(err => {
                    wx.clearStorageSync()
                    wx.showToast({
                        title: '服务出错',
                        icon: "error",
                        duration: 500
                    })
                    setTimeout(function () {
                        wx.navigateTo({
                            url: '../xuesheng/xuesheng',
                        })
                    }, 500)
                })



        }
    },






    // 教师登录按钮
    jiaoshi() {
        if (!this.data.data_base1) {
            wx.navigateTo({
                url: '../jiaoshi/jiaoshi',
            })
        } else {
            wx.cloud.database().collection("Root")
                .where({
                    username: this.data.jiaoshi_username
                })
                .get()
                .then(res => {
                    this.setData({
                        net_password1: res.data[0].password
                    })
                    if (this.data.net_password1 == this.data.jiaoshi_password) {
                        wx.navigateTo({
                            url: '../jiaoshi_base/jiaoshi_base',
                        })
                    } else {
                        wx.clearStorageSync()
                        wx.showToast({
                            title: '请重新登录',
                            icon: "error",
                            duration: 500
                        })
                        setTimeout(function () {
                            wx.navigateTo({
                                url: '../jiaoshi/jiaoshi',
                            })
                        }, 500)
                    }
                }).catch(err => {
                    wx.clearStorageSync()
                    wx.showToast({
                        title: '服务出错',
                        icon: "error",
                        duration: 500
                    })
                    setTimeout(function () {
                        wx.navigateTo({
                            url: '../jiaoshi/jiaoshi',
                        })
                    }, 500)
                })



        }

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let data_base = wx.getStorageSync("data_base")
        console.log("学生缓存", data_base)
        this.setData({
            data_base: data_base,
            xuesheng_username: data_base.username,
            xuesheng_password: data_base.password
        })
        let data_base1 = wx.getStorageSync("data_base1")
        console.log("教师缓存", data_base)
        this.setData({
            data_base1: data_base1,
            jiaoshi_username: data_base1.username,
            jiaoshi_password: data_base1.password
        })
        // console.log("测试数据：",this.data.data_base1.user.name)
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
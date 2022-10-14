// pages/Change_password/Change_password.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        data_base1: "",
        username: "",
        change_passwoed: "",
        class1: "",
        mubiao_xiugaimima: true,
        yanjin1: "closed-eye",
        yanjin2: "closed-eye",
        password_leixing1: true,
        password_leixing2: true,
        net_password: "",
        zhuangtai: false

    },
    yanjin1() {
        if (this.data.password_leixing1) {
            this.setData({
                yanjin1: "eye-o",
                password_leixing1: false
            })
        } else {
            this.setData({
                yanjin1: "closed-eye",
                password_leixing1: true
            })
        }
    },
    yanjin2() {
        if (this.data.password_leixing2) {
            this.setData({
                yanjin2: "eye-o",
                password_leixing2: false
            })
        } else {
            this.setData({
                yanjin2: "closed-eye",
                password_leixing2: true
            })
        }
    },
    // 旧密码密码框文本获取
    password_old(res) {
        this.setData({
            passwoed_old: res.detail
        })
        console.log("旧密码", res.detail)
    },
    // 新密码文本框获取
    password_new(res) {
        this.setData({
            change_passwoed: res.detail
        })
        console.log("新密码", res.detail)
    },
    // 确认修改密码按钮点击事件
    change_passwoed(res) {
        if (this.data.change_passwoed.length > 4) {
            this.setData({
                zhuangtai: true
            })
            wx.cloud.database().collection("Root")
                .where({
                    username: this.data.username
                })
                .get()
                .then(res => {
                    this.setData({
                        net_password: res.data[0].password
                    })
                    if (this.data.passwoed_old == this.data.net_password) {
                        wx.cloud.database().collection('Root').where({
                                username: this.data.username
                            }).update({
                                data: {
                                    password: this.data.change_passwoed
                                }
                            })
                            .then(res => {
                                this.setData({
                                    zhuangtai: false
                                })
                                wx.clearStorageSync()
                                wx.showToast({
                                        title: '修改成功',
                                        icon: 'success',
                                        duration: 1500
                                    }),
                                    setTimeout(function () {
                                        wx.reLaunch({
                                            url: '../jiaoshi/jiaoshi',
                                        })

                                    }, 1500)

                            })

                    } else {
                        this.setData({
                            zhuangtai: false
                        })
                        wx.showToast({
                            title: '旧密码错误',
                            icon: 'none',
                            duration: 2500
                        })
                    }
                    console.log(this.data.net_password)
                })
                .catch(err => {
                    wx.showToast({
                        title: '验证系统出错',
                        icon: 'none',
                        duration: 2500
                    })
                    this.setData({
                        zhuangtai: false
                    })
                    console.log("戳无数据",err)
                })

        } else {
            this.setData({
                zhuangtai: false
            })
            wx.showToast({
                title: '新密码过短',
                icon: 'none',
                duration: 2500
            })
        }
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let data_base1 = wx.getStorageSync("data_base1")
        this.setData({
            username:data_base1.username
        })
    },

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
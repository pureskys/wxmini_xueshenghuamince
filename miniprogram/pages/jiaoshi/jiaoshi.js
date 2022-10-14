// pages/jiaoshi/jiaoshi.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        base_username: "",
        base_password: "",
        pipei_root: true,
        yanjin: "closed-eye",
        username: "",
        password: "",
        password_leixing: true,
        yanzheng: ""

    },
    // 注册事件
    zhuce() {
        wx.navigateTo({
            url: '../jiaoshi_zhuce/jiaoshi_zhuce',
        })
    },
    // 登录
    login() {
        wx.showToast({
            title: '验证中',
            icon: "loading",
            duration: 3000
        })
        wx.cloud.callFunction({
                name: "login",
                data: {
                    pipei_root: this.data.pipei_root,
                    username: this.data.username,
                    password: this.data.password
                }
            })
            .then(res => {
                console.log(res.result.data[0])
                this.setData({
                    base_username: res.result.data[0].username,
                    base_password: res.result.data[0].password,
                    yanzheng: res.result.data[0].yanzheng
                })
                console.log("账号密码", this.data.base_username, this.data.base_password, this.data.username, this.data.password)
                if (this.data.yanzheng == true) {
                    if (this.data.base_username == this.data.username && this.data.base_password == this.data.password) {
                        console.log("成功")
                        var model1 = JSON.stringify(res.result.data[0]);
                        wx.redirectTo({
                            url: '/pages/jiaoshi_base/jiaoshi_base?data1=' + model1
                        })
                    } else {
                        wx.showToast({
                            title: '账号或密码错误',
                            icon: 'error',
                            duration: 1500
                        })
                    }
                }
                else if (this.data.yanzheng==false){
                    wx.showToast({
                        title: '请等待管理员验证',
                        icon:"none",
                        duration: 1500
                    })
                }

            })
            .catch(err => {
                wx.showToast({
                    title: '账号或密码错误',
                    icon: 'error',
                    duration: 1500
                })
            })



    },
    // 用户名提示
    wenhao() {
        wx.showToast({
            title: '用户名就是电话号码啦',
            icon: 'none',
            duration: 2500
        })
    },
    // 判断眼睛状态
    yanjin() {
        if (this.data.password_leixing) {
            this.setData({
                yanjin: "eye-o",
                password_leixing: false
            })
        } else {
            this.setData({
                yanjin: "closed-eye",
                password_leixing: true
            })
        }
    },
    // 获取用户名
    username(res) {
        this.setData({
            username: res.detail
        })
    },
    // 获取密码
    password(res) {
        this.setData({
            password: res.detail
        })
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
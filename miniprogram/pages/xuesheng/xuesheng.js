// pages/jiaoshi/jiaoshi.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        base_username: "",
        base_password: "",
        pipeibanji: "",
        yanjin: "closed-eye",
        username: "214072144",
        password: "214072144",
        password_leixing: true,
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
            }
        ],
        value2: 'b'
    },
    // 注册
    zhuce() {
        wx.navigateTo({
            url: '../zhuce/zhuce',
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
    // 登录
    login() {
        this.setData({
            pipeibanji: this.data.value1 + this.data.value2
        })
        wx.cloud.callFunction({
                name: "login",
                data: {
                    pipeibanji: this.data.pipeibanji,
                    username: this.data.username,
                    password: this.data.password
                }
            })
            .then(res => {
                console.log(res.result)
                this.setData({
                    base_username: res.result.data[0].username,
                    base_password: res.result.data[0].password
                })
                console.log("账号密码", this.data.base_username, this.data.base_password, this.data.username, this.data.password)
                if (this.data.base_username == this.data.username && this.data.base_password == this.data.password) {
                    console.log("成功")
                    var model = JSON.stringify(res.result.data[0]);
                    wx.redirectTo({
                        url: '/pages/xuesheng_base/xuesheng_base?data=' + model
                    })
                } else {
                    wx.showToast({
                        title: '账号或密码错误',
                        icon: 'error',
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
            title: '用户名就是学号啦',
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
        wx.setStorageSync("data_base", false)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.setStorageSync("data_base", false)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wx.setStorageSync("data_base", false)
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
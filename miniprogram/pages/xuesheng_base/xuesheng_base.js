Page({

    /**
     * 页面的初始数据
     */
    data: {
        data_base: "",
        scr: "",
        name: "",
        age: "",
        username: "",
        gender: "",
        tele: "",
        qq: "",
        weixin: "",
        gerenjianjie: "",
        class: "",
        show: false
    },
    // 查看管理员信息
    guanliyuanxinxi(){
        wx.navigateTo({
            url: '../all_chakan/all_chakan',
        })

    },
    // 跳转修改个人信息
    gerenxinxi() {
        wx.navigateTo({
            url: '../xiugai_gerenxinxi/xiugai_gerenxinxi',
        })
    },
    // 跳转修改密码
    Change_password() {
        wx.navigateTo({
            url: '../Change_password/Change_password?username=' + this.data.username,
        })


    },
    // 退出登录
    tuichu_login() {
        wx.setStorageSync("data_base", false)
        setTimeout(function () {
            wx.reLaunch({
                url: '../index/index',
            })
        }, 600)



    },
    // 展示右边弹出框
    showPopup() {
        this.setData({
            show: true
        });
    },
    // 隐藏右边弹出框
    onClose() {
        this.setData({
            show: false
        });
    },


    // 照片跳转到大图片
    tupian_tiaozhuan() {
        wx.previewImage({
            current: this.data.scr, // 当前显示图片的 http 链接
            urls: [this.data.scr] // 需要预览的图片 http 链接列表
          })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let data_base = wx.getStorageSync("data_base")
        console.log("data", this.data.data_base)
        if (!data_base) {
            var data_xuesheng = JSON.parse(options.data)
            this.setData({
                data_base: data_xuesheng
            })
            wx.setStorageSync("data_base", data_xuesheng)
            wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 1500
            })
            this.onLoad()
        } else {
            console.log("缓存", data_base),
                this.setData({
                    scr: data_base.user.avatar,
                    name: data_base.user.name,
                    age: data_base.user.age,
                    username: data_base.username,
                    gender: data_base.user.gender,
                    tele: data_base.user.tele,
                    qq: data_base.user.qq,
                    weixin: data_base.user.weixin,
                    gerenjianjie: data_base.gerenjianjie,
                    class: data_base.class

                })
        }
        console.log("tupian1", this.data.scr)

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
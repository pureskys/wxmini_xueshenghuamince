// pages/jiaoshi_xiangxixinxi/jiaoshi_xiangxixinxi.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        data_base1: "",
        scr:"",
        name: "",
        gender: "",
        age: "保密",
        tele: "",
        qq: "",
        weixin: "",
        jiyu: "目标的坚定是性格中最必要的力量源泉之一，也是成功的武器之一。"
    },
     // 跳转修改个人信息
     gerenxinxi() {
        wx.navigateTo({
            url: '../xiugai_jiaoshixinxi/xiugai_jiaoshixinxi',
        })
    },
    // 跳转修改密码
    Change_password() {
        wx.navigateTo({
          url: '../Change_jiaoshimima/Change_jiaoshimima',
        })

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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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
        let data_base1 = wx.getStorageSync("data_base1")
        console.log("教师缓存", data_base1)
        this.setData({
            scr:data_base1.user.avatar,
            name:data_base1.user.name,
            gender: data_base1.user.gender,
            age: data_base1.user.age,
            tele: data_base1.user.tele,
            qq: data_base1.user.qq,
            weixin: data_base1.user.weixin,
            jiyu: data_base1.jiyu
        })
    },
     // 照片跳转到大图片
     tupian_tiaozhuan() {
        wx.previewImage({
            current: this.data.scr, // 当前显示图片的 http 链接
            urls: [this.data.scr] // 需要预览的图片 http 链接列表
          })
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
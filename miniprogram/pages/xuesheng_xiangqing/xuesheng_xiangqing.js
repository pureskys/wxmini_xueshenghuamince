// pages/xuesheng_xiangqing/xuesheng_xiangqing.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        class: "",
        id: "",

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
    onLoad(options) {
        let data_xiangqing = JSON.parse(options.data)
        console.log('转换后', data_xiangqing)
        this.setData({
            class: data_xiangqing.class,
            id: data_xiangqing.id
        })
        wx.cloud.database().collection(this.data.class)
            .where({
                _id: this.data.id
            })
            .get()
            .then(res => {
                console.log("获取的学生数据", res.data[0])
                let data_base = res.data[0]
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
                    class:data_base.class

                })
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
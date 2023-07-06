// pages/all_chakan/all_chakan.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        data_base: "",
        class: "",
        guanliyuan_base: ""
    },
    // 详情页面
    xiangqing(e){
        console.log("学生查看教师传出的数据", e.currentTarget.dataset)
        let xiangqing_data = JSON.stringify(e.currentTarget.dataset)
        wx.navigateTo({
            url: '../xuesheng_chakanjiaoshi/xuesheng_chakanjiaoshi?data=' + xiangqing_data,
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

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        let data_base = wx.getStorageSync("data_base")
        this.setData({
            class: data_base.class
        })
        console.log("班级", this.data.class)
        wx.cloud.database().collection("Root")
            .where({
                my_class: this.data.class,
                yanzheng:true
            })
            .get()
            .then(res=>{
                this.setData({
                    guanliyuan_base:res.data
                })
                console.log("获取的管理员数据：",this.data.guanliyuan_base)
            })
            .catch(err=>{
                wx.showToast({
                  title: '获取数据失败',
                })
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
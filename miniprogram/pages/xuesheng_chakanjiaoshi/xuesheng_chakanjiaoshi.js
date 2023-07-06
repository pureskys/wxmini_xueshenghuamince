// pages/xuesheng_chakanjiaoshi/xuesheng_chakanjiaoshi.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        class: "",
        scr:"",
        name: "",
        gender: "",
        age: "保密",
        tele: "",
        qq: "",
        weixin: "",
        jiyu: "目标的坚定是性格中最必要的力量源泉之一，也是成功的武器之一。"
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
        this.setData({
            id: data_xiangqing.id
        })
        wx.cloud.database().collection("Root")
        .where({
            _id: this.data.id
        })
        .get()
        .then(res=>{
            let res1 = res.data[0]
            if (res1.yanzheng==true){
                this.setData({
                    scr:res1.user.avatar,
                    name:res1.user.name,
                    gender: res1.user.gender,
                    age: res1.user.age,
                    tele: res1.user.tele,
                    qq: res1.user.qq,
                    weixin: res1.user.weixin,
                    jiyu: res1.jiyu
                })
            }
            else{
                wx.showToast({
                  title: '等待管理员验证',
                  icon:"none",
                  duration:1500
                })
            }
            
            
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
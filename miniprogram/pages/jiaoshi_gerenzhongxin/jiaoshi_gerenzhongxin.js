// pages/jiaoshi_gerenzhongxin/jiaoshi_gerenzhongxin.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 1,
        touxiang: "https://7375-sun-3g6gwmbw83fc31a4-1309504880.tcb.qcloud.la/ico/%E6%9C%AA%E7%99%BB%E5%BD%95%E5%A4%B4%E8%B1%A1.png",
        nicheng: "请先登录q(≧▽≦q)",
        gerenqianming: "个性签名",
        user: "",
        value: 30.363,
        gradientColor: {
            '0%': '#fa709a',
            '100%': '#fee140',
        },
        data_base1: "",
        my_class: "",
        xuesheng_data: "",
        shezhiderenshu: "",
        zhi: "",
        show: false,
        show1: false,
        chushizhi:""
    },
    // 查看个人信息事件
    gerenxinxi(){
        wx.navigateTo({
          url: '../jiaoshi_xiangxixinxi/jiaoshi_xiangxixinxi',
        })
    },
    // 退出登录的弹窗操作
    tuichudenglu_chengong() {
        wx.clearStorageSync()
        wx.reLaunch({
          url: '../index/index',
        })
      },
      onClose1() {
        this.setData({ show: false });
      },
    // 退出登录
    tuichudenglu(){
        this.setData({
            show1:true
        })
    },
    
    // 编辑人数的步进器
    onChange_bianjirenshu(event) {
        console.log(event.detail)
        this.setData({
            shezhiderenshu:event.detail
        })
        wx.setStorageSync('shezhiderenshu', this.data.shezhiderenshu)
        this.onShow()
    },
    // 打开底部弹出层
    bianji_renshu() {
        this.setData({
            chushizhi:this.data.shezhiderenshu,
            show: true
        });
    },
    // 关闭底部弹出层事件
    onClose() {
        this.setData({
            show: false
        });
    },
    // 微信授权登录
    login() {
        wx.getUserProfile({
            desc: '授权以获取头像与用户名',
            success: res1 => {
                console.log("完整用户信息", res1)
                let user = res1.userInfo
                wx.setStorageSync('key', user)
                console.log("简化版用户信息", user)
                this.onLoad()
            }

        })
    },
    // 底部导航功能
    onChange(event) {
        // event.detail 的值为当前选中项的索引
        this.setData({
            active: event.detail
        });
        if (this.data.active == 0) {
            wx.redirectTo({
                url: '../jiaoshi_base/jiaoshi_base',
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let user = wx.getStorageSync('key')
        let shezhiderenshu = wx.getStorageSync('shezhiderenshu')
        console.log("缓存", user)
        this.setData({
            user: user,
        })
        let data_base1 = wx.getStorageSync("data_base1")
        this.setData({
            my_class: data_base1.my_class
        })
        if(!shezhiderenshu){
            this.setData({
                shezhiderenshu:43
            })
        }
        else{
            this.setData({
                shezhiderenshu:shezhiderenshu
            })
        }
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
        wx.cloud.callFunction({
            name: "get_data",
            data: {
                class1: this.data.my_class
            }
        }).then(res => {
            console.log("云端便利", res.result.data)
            this.setData({
                xuesheng_data: res.result.data
            })
            this.setData({
                renshu: this.data.xuesheng_data.length
            })
            console.log("学生人数", this.data.renshu)
            console.log(this.data.renshu, this.data.shezhiderenshu)
            var shuahaodezhi = this.data.renshu / this.data.shezhiderenshu * 100
            this.setData({
                value: shuahaodezhi,
                zhi: this.data.renshu + "/" + this.data.shezhiderenshu
            })

            console.log("环形显示器值", this.data.value)
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
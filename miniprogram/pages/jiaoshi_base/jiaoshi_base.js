// pages/jiaoshi_base/jiaoshi_base.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        data_base1: "",
        my_class: "",
        xuesheng_data: "",
        loading: true,
        imageURL: "",
        active: 0,
        sousuo: "",
        tishi: "请输入学号",
        sousuo_qiehuan: "smile-o",
        sousuo_leixin: "xuehao"
    },
    // 页面刷新
    shuaxin(){
          // 学生信息加载
          wx.cloud.callFunction({
            name:"get_data",
            data:{
                class1:this.data.my_class
            }
        }).then(res=>{
            console.log("云端便利",res.result.data)
            this.setData({
                xuesheng_data: res.result.data
            })
            this.setData({
                sousuo:""
            })
            wx.stopPullDownRefresh()
            wx.showToast({
              title: '刷新成功',
              icon:"none",
              duration:1000
            })
        })
    },
    // 搜索右侧图标切换
    qiehuan() {
        if (this.data.sousuo_qiehuan == "smile-o") {
            console.log('切换为点赞')
            this.setData({
                sousuo_qiehuan: "thumb-circle-o",
                tishi: "请输入姓名",
                sousuo_leixin: "xingming"
            })
        } else {
            console.log("切换为笑脸")
            this.setData({
                sousuo_qiehuan: "smile-o",
                tishi: "请输入学号",
                sousuo_leixin: "xuehao"
            })
        }

    },
    // 搜索事件的确认搜索
    onSearch1() {
        if (this.data.sousuo_leixin == "xuehao") {
            wx.cloud.database().collection(this.data.my_class)
                .where({
                    username: wx.cloud.database().RegExp({
                        //从搜索栏中获取的值作为规则进行匹配。
                        regexp: this.data.sousuo,
                        options: 'i',
                    })
                })
                .get()
                .then(res => {
                    console.log("成功", res.data)
                    if (!res.data[0]) {
                        wx.showToast({
                            title: '未找到该学生',
                            icon: 'none',
                            duration: 2500
                        })
                    } else {
                        this.setData({
                            xuesheng_data: res.data
                        })
                    }

                })
                .catch(err => {
                    console.log("失败", err)
                })
        }
        if (this.data.sousuo_leixin == "xingming") {
            wx.cloud.database().collection(this.data.my_class)
                .where({
                    user: {
                        name: wx.cloud.database().RegExp({
                            //从搜索栏中获取的值作为规则进行匹配。
                            regexp: this.data.sousuo,
                            options: 'i',
                        })
                    }

                })
                .get()
                .then(res => {
                    if (!res.data[0]) {
                        wx.showToast({
                            title: '未找到该学生',
                            icon: 'none',
                            duration: 2500
                        })
                    } else {
                        this.setData({
                            xuesheng_data: res.data
                        })
                    }
                })
                .catch(err => {
                    console.log("失败", err)
                })
        }


    },
    // 搜索事件的传入数值
    onChange1(e) {
        this.setData({
            sousuo: e.detail,
        });
        console.log("搜索传入的", e.detail)
    },
    // 骨架屏状态
    jiazai() {
        this.setData({
            loading: false
        })
    },
    // 详情事件
    xiangqing(e) {
        console.log("传出的数据", e.currentTarget.dataset)
        let xiangqing_data = JSON.stringify(e.currentTarget.dataset)
        wx.navigateTo({
            url: '../xuesheng_xiangqing/xuesheng_xiangqing?data=' + xiangqing_data,
        })
    },
    // 底部导航切换数据
    onChange(event) {
        this.setData({
            active: event.detail
        });
        if (this.data.active == 1) {
            wx.redirectTo({
                url: '../jiaoshi_gerenzhongxin/jiaoshi_gerenzhongxin',
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 登录判断
        let data_base1 = wx.getStorageSync("data_base1")
        console.log("data", this.data.data_base1)
        if (!data_base1) {
            var data_jiaoshi = JSON.parse(options.data1)
            this.setData({
                data_base1: data_jiaoshi,
                my_class:data_base1.my_class
            })
            wx.setStorageSync("data_base1", data_jiaoshi)
            wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 1500
            })
            this.onLoad()
        } else {
            console.log("教师缓存", data_base1),
                this.setData({
                    my_class: data_base1.my_class
                })
                // 学生信息加载
                wx.cloud.callFunction({
                    name:"get_data",
                    data:{
                        class1:this.data.my_class
                    }
                }).then(res=>{
                    console.log("云端便利",res.result.data)
                    this.setData({
                        xuesheng_data: res.result.data
                    })
                })
        }
        console.log("教师班级：", this.data.my_class)
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
        this.shuaxin()
       
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log("触底了")
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
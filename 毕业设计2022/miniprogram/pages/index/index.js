// pages/index/index.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[],
    fenlei:[],
    product:[],
    search:[],

  },
    // 分类跳转事件
    fenlei:function(e){
      console.log(e)
    },
    // 搜索事件
    search:function(e){
      let that = this
      db.collection('chanping').where({
        name:e.detail.value
      }).get({
        success:function(res){
          that.setData({
            search:res.data
          })
          console.log('搜索成功成功',that.data.search)
          if(that.data.search == ""){
            wx.showToast({
              title: '未找到商品',
              icon:"none"
            })
          }
        },
        fail:function(res){
          console.log('搜索失败',res)
        },
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    db.collection('swiper').get({
      success:function(res){
        console.log('轮播图获取成功',res)
        that.setData({
          banner:res.data
        })
      },
      fail:function(res){
        console.log('轮播图获取失败',res)
      }
    })
    db.collection('fenlei').get({
      success:function(res){
        console.log('分类图获取成功',res)
        that.setData({
          fenlei:res.data
        })
      },
      fail:function(res){
        console.log('分类图获取失败',res)
      }
    })
    db.collection('chanping').get({
      success:function(res){
        console.log('商品获取成功',res)
        that.setData({
          product:res.data
        })
      },
      fail:function(res){
        console.log('商品获取失败',res)
      },
    })
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
    let that = this
    wx.showLoading({
      title: '刷新中！',
      duration: 1000
    })
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
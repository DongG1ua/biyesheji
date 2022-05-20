// pages/shouye/shouye.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shangping:[],
    money:0,
    product_now:[],
    product_id:[],
    delet_id:[]
  },
  // 支付事件
  pay:function(e){
    let that = this
    db.collection('gouwuche').where({
      product_checked:"true"
    }).get({
      success:function(res){
        console.log('获取商品成功',res)
        if(res.data.length == 0){
          wx.showToast({
            title: '你还未选择商品',
            icon:"none"
          })
        }else{
          wx.redirectTo({
            url: '../zhifu/zhifu'
          })
        }
      },fail:function(res){
        console.log('获取商品失败',res)
      }
    })
  },

  // 计算金额
  get_money_sum() {
    let that = this
    let money_sum = 0
    for(var x = 0;x<that.data.shangping.length;x++){
      if(that.data.shangping[x].product_checked == "true"){
        money_sum=money_sum+(that.data.shangping[x].chanpingnum*that.data.shangping[x].chanpingprice)
      }
    }
    that.setData({
      money:money_sum
    })
  },
    // 选择事件
    xuanze:function(e){
      let that = this
      console.log(e)
      that.setData({
        delet_id:that.data.delet_id.concat(e.detail.value[0])
      })
      if(e.detail.value.length !== 0){
        db.collection('gouwuche').doc(e.target.dataset.id).update({
          data:{
            product_checked:"true"
          },success:function(res){
            that.onLoad()
          }
        })
      }else{
        db.collection('gouwuche').doc(e.target.dataset.id).update({
          data:{
            product_checked:""
          },success:function(){
            that.onLoad()
          }
        })
      }
    },
  // 商品删除
  delete:function(){
    let that = this
    wx.cloud.callFunction({
      name:"shanchu",
      success:function(res){
        console.log('删除商品成功',res)
        that.onLoad()
      },fail:function(res){
        console.log('删除商品失败',res)
      }
    })
  },

  // 商品数量加事件
  product_jia:function(e){
    let that = this
    console.log(e)
    db.collection('gouwuche').doc(e.target.dataset.id).update({
      data: {
        chanpingnum: _.inc(1)
      }, success:function(res){
        console.log('商品数量加一',res)
        that.onLoad()
      },fail:function(res){
        console.log('获取商品价格失败',res)
      }
    })
  },
  // 商品数量减事件
  product_jian:function(e){
    let that = this
    console.log(e)
    if(e.target.dataset.product_num<2){
      wx.showToast({
        title:'就剩下一个了别减了',
        icon:"none"
      })
    }else{
      db.collection('gouwuche').doc(e.target.dataset.id).update({
      data: {
        chanpingnum: _.inc(-1)
      }, success:function(res){
        console.log('商品数量加一',res)
        that.onLoad()
      },fail:function(res){
        console.log('获取商品价格失败',res)
      }
    })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    db.collection('gouwuche').get({
      success:function(res){
        console.log('获取购物车商品成功',res)
        that.setData({
          shangping:res.data,
        })
        that.get_money_sum()
      },fail:function(res){
        console.log('获取购物车商品失败',res)
      }
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
    let that = this
    db.collection('gouwuche').get({
      success:function(res){
        console.log('获取购物车商品成功',res)
        that.setData({
          shangping:res.data,
        })
        that.get_money_sum()
      },fail:function(res){
        console.log('获取购物车商品失败',res)
      }
    })
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
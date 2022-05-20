// pages/xiangqing/xiangqing.js
const db = wx.cloud.database()
const _ =db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chanpingsrc:'',
    chanpingname:'',
    chanpingprice:'',
    chanpingdetail:'',
    chanpingxqsrc:'',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log('产品的id已经获取到了',options.id)
    db.collection('chanping').doc(options.id).get({
      success:function(res){
        console.log('商品详细信息获取成功',res)
        that.setData({
          chanpingsrc:res.data.src,
          chanpingname:res.data.name,
          chanpingnum:res.data.num,
          chanpingprice:res.data.price,
          chanpingdetail:res.data.detail,
          chanpingxqsrc:res.data.xqsrc,
          id:res.data._id
        })
      },fail:function(res){
        console.log('商品详细信息获取失败',res)
      }
    })
  },

    // this.setData({
    //   chanpingid:options.chanpingid
    // })
    // db.collection("chanping").doc(this.data.chanpingid).get().then(res=>{
    //   this.setData({
    //     chanpingsrc:res.data.src,
    //     chanpingname:res.data.name,
    //     chanpingprice:res.data.price,
    //     chanpingdetail:res.data.detail,
    //     chanpingxqsrc:res.data.xqsrc,
    //     chanpingid:res.data._id
    //   })
    // })
    // 加入购物车
  into_gouwuche:function(){
    let that = this
    db.collection('gouwuche').where({
      chanpingid: that.data.id
    }).get({
      success:function(res){
        console.log(res)
        if(res.data == ""){
          db.collection('gouwuche').add({
            data:{
            chanpingname:that.data.chanpingname,
            chanpingsrc:that.data.chanpingsrc,
            chanpingprice:that.data.chanpingprice,
            chanpingnum:1,
            // 新增代码
            product_checked:""    
            },success:function(res){
              console.log('商品加入购物车成功',res)
              wx.showToast({
                title: '加入成功',
              })
            },fail:function(res){
              console.log('商品加入购物车失败',res)
            }
          })
        }else{
          wx.showToast({
            title: '已有这个商品',
            icon:'none'
          })
        }
      },fail:function(res){
        console.log(res)
      }
    })
  },
   // 立即购买
   buy:function(){
    let that = this
    db.collection('gouwuche').where({
      chanpingid: that.data.id
    }).get({
      success:function(res){
        console.log(res)
        if(res.data == ""){
          db.collection('gouwuche').add({
            data:{
              chanpingname:that.data.chanpingname,
              chanpingsrc:that.data.chanpingsrc,
              chanpingprice:that.data.chanpingprice,
              chanpingnum:1,
              chanpingid:that.data.id,
            // 新增代码
            product_checked:"" 
            },success:function(res){
              console.log('商品加入购物车成功',res)
              wx.switchTab({
                url: '../gouwuche/gouwuche',
              })
            },fail:function(res){
              console.log('商品加入购物车失败',res)
            }
          })
        }else{
          wx.switchTab({
            url: '../gouwuche/gouwuche',
          })
        }
      },fail:function(res){
        console.log(res)
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
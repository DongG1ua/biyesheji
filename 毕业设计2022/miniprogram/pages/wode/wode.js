const app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo:'',
  },
  cc:function(){
    
  },

  onLoad: function() {
    let user=wx.getStorageSync('user')
     this.setData({
       userInfo:user
     })
    
  },
  login(){
    
    console.log('点击事件执行了')
    wx.getUserProfile({
      desc: '必须授权才能使用',
      success:res=>{
        let user=res.userInfo
        wx.setStorageSync('user', user)
  console.log('成功',res)
  this.setData({
    userInfo:user
  })
  },
      fall:res=>{
        console.log('失败',res)
      }
    })
  
  },
  nologin(){
   this.setData({
     userInfo:''
   })
   wx.setStorageSync('user', null)
  },
  address:function(e){
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.address']) {
          wx.authorize({
            scope: 'scope.address',
            success () {
              wx.chooseAddress({
                success (res) {
                  console.log(res)
                }
              })
            }
          })
        }else{
          wx.authorize({
            scope: 'scope.address',
            success () {
              wx.chooseAddress({
                success (res) {
                  console.log(res)
                }
              })
            }
          })
        }
      }
    })
  }
  

  
})
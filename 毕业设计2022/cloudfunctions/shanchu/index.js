// 使用了 async await 语法
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'cloud1-3gyea2zq9b726e94'
})


const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const ap = cloud.getWXContext()
  try {
    return await db.collection('gouwuche').where({
      _openid:ap.OPENID,
      product_checked: "true"
    }).remove()
  } catch(e) {
    console.error(e)
  }
}
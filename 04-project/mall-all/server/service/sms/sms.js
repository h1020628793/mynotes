const {getRandomStr} = require('../../util/random.js')
const SMSClient = require('@alicloud/sms-sdk')
const {
	accessKeyId,     
	secretAccessKey,
} = require("../../config/index.js")
//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey})

//发送短信
function _sendSms(phone,TemplateCode){
	let promise = new Promise((resolve,reject)=>{
		let smsCode = getRandomStr(6,1)
		smsClient.sendSMS({
		    PhoneNumbers: phone,
		    SignName: '跨猪网',
		    TemplateCode: TemplateCode,
		    TemplateParam: '{"code":"'+smsCode+'"}'
		}).then(function (res) {
		    let {Code}=res
		    if (Code === 'OK') {
		        //处理返回参数
		        resolve(smsCode)
		    }
		}, function (err) {
		    reject(err)
		})
	})

	return promise	
}
//发送注册验证码短信
function sendRegisterSms(phone){
	return _sendSms(phone,'SMS_123736391')
}
//发送登陆证码短信
function sendLoginSms(phone){
	return _sendSms(phone,'SMS_123736391')
}
//发送找回密码短信
function sendFindPasswordSms(phone){
	return _sendSms(phone,'SMS_123736392')
}

//测试用接口
function _sendTestSms(phone){
	return new Promise((resolve)=>{
		resolve('111111')
	})
}
/*
exports.sendRegisterSms =  sendRegisterSms
exports.sendLoginSms =  sendLoginSms
exports.sendFindPasswordSms = sendFindPasswordSms 
*/
exports.sendRegisterSms =  process.env.NODE_ENV === 'production' ? sendRegisterSms : _sendTestSms
exports.sendLoginSms = process.env.NODE_ENV === 'production' ? sendLoginSms : _sendTestSms
exports.sendFindPasswordSms = process.env.NODE_ENV === 'production' ? sendFindPasswordSms : _sendTestSms 

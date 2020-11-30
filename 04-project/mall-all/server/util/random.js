function getRandomNum(min,max){
	return Math.round(min + (max-min)*Math.random());
}

function getRandomStr(len,type){
	let base = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

	switch(type){
		//纯数字
		case 1:
			base = base.substring(0,10);
			break;
		//小写字母			
		case 2:
			base = base.substring(10,36);
			break;
		//大写字母	
		case 3:
			base = base.substring(36,62);
			break;
		//大小写字母
		case 4:
			base = base.substring(10,62);
			break;
		default:
			break;
	}

	let str = "";
	while(len--){
		str += base[getRandomNum(0,base.length-1)];
	}
	return str;
}
getRandomStr.num = 1;
getRandomStr.lower = 2;
getRandomStr.upper = 3;
getRandomStr.alpha = 4;

exports.getRandomNum = getRandomNum; 
exports.getRandomStr = getRandomStr; 
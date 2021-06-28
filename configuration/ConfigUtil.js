
let extend = require('util')._extend;
module.exports =
{
	copyArrayOfObjects: function(objects){
		let retValidValue = objects.slice();
		if(retValidValue){
			for(let i in retValidValue){
				retValidValue[i] = extend({}, retValidValue[i]);
			}
		}
		return retValidValue;
	}
}

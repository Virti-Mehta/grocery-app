const {_} = require("lodash");
// const momentTimezone = require("moment-timezone");

module.exports = () => {
	/**
    * Set response delay before create or remove action call
    * delayTime in milliseconds
    */
	send_response_after_delay = async function (res, delayTime = 1000) {
		return await new Promise(resolve => setTimeout(() => {
			resolve(res);
		}, delayTime));
	};

	/** 
    * Encrypt/ Decrypt Base64 to String
    */
	base64Conversion = function (convertString, action = "decrypt") {
		if(action == "encrypt") {
			return Buffer.from(convertString).toString("base64");
		} else {
			return Buffer.from(convertString, "base64").toString();
		}
	};
};
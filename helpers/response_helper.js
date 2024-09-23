"use strict";

const _ = require("lodash");

class ResponseHelper {
	static responseSuccess(respObj = {}, data = []) {
		return {
			status: true,
			code: respObj.Code,
			message: respObj.Message,
			data: data
		};
	}

	static responseError(respObj, error = null, data = undefined) {
		let response = {
			status: false,
			code: respObj.Code,
			message: respObj.Message
		};

		if (!_.isUndefined(respObj.ErrorCode) && !_.isEmpty(respObj.ErrorCode)) {
			response["ErrorCode"] = respObj.ErrorCode;
		}

		if (!_.isUndefined(data)) {
			response["data"] = data;
		}

		if (_.isNull(error)) {
			error = {};
		}

		return response;
	}

	static validationError (type, field, message, data) {
		let response = {
			status: false,
			message: "Parameters validation error",
			type: "VALIDATION_ERROR",
			data: [
            {
					type: type,
					field: field,
               message: message,
				}
			]
		};
		if(!_.isEmpty(data)) {
			response.data = data;
		}
		return response;
	}

	/* Set Error Logs */
	static writeErrorLogs (ctx, err) {
		let ErrorDomain = {
			"environment": process.env.ENVIRONMENT,
			"domain": ctx.meta.domain,
			"industry": ctx.meta.industry,
			"platform": ctx.meta.platform,
			"version": ctx.meta.version,
			"request_method": ctx.meta.request_method,
			"store_id": ctx.meta.store_id,
			"user": !_.isUndefined(ctx.meta.user) ? ctx.meta.user.id : "-",
			"error_name": err.name,
			"error": err
		};
		console.log("ERROR@POS:\n", ErrorDomain);
	}
}

module.exports = ResponseHelper;
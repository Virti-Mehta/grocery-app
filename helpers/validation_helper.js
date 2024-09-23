"use strict";

const _ = require("lodash");

class ValidationHelper {
	static createRule (create_rules, required = []) {
		let updated_validation_rules = this.iterationCopy(create_rules);

		for (let [key] of Object.keys(create_rules)) {
			if(
				(_.indexOf(required, key) < 0 &&
					!_.has(updated_validation_rules[key], "optional")) ||
				(_.has(updated_validation_rules[key],"optional") &&
					!updated_validation_rules[key]["optional"])
			) {
				updated_validation_rules[key]["optional"] = true;
			}
		}

		return updated_validation_rules;
	}

	static isObject (obj) {
		let type = typeof obj;
		return type === "function" || (type === "object" && !!obj);
	}

	static iterationCopy (src) {
		let target = {};

		for (let prop in src) {
			if(src.hasOwnProperty(prop)) {
				if(Array.isArray(src[prop])) {
					target[prop] = [...src[prop]];
				} else if(this.isObject(src[prop]) && prop != "pattern") {
					target[prop] = this.iterationCopy(src[prop]);
				} else {
					target[prop] = src[prop];
				}
			}
		}

		return target;
	}
}

module.exports = ValidationHelper;
"use strict";

const Services = require("../constants/services.constants");

module.exports = class ApiHelper {

	static ServiceVersion(service, version) {

		return `${Services[service]["versions"][version].prefix}.${Services[service].name}`;
	}
};	
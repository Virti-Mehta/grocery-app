"use strict";

const Service = require("moleculer").Service;
const { _ } = require("lodash");
// const axios = require("axios");
// const Sequelize = require("sequelize");
// const DBconfig = require("../../constants/DBconfig.constants");
// const fs = require("fs");
// const path = require("path");
require("./base.helper")();

class BaseService extends Service {
	constructor(broker) {
		super(broker);
		this.parseServiceSchema({
			name: "baseService",
			methods: {
				async getDomainInfoObj(domain) {
					let objDomainInfo = {};
					if (domain) {
						let domainFromMapping = await this.getDomainMappingObj(domain);
						if(!_.isEmpty(domainFromMapping)) {
							domain = domainFromMapping;
						}

						if(!_.isUndefined(this.broker.options.domainInfo)) {
							objDomainInfo = this.broker.options.domainInfo[domain];
						}

						if(typeof objDomainInfo == "undefined" || objDomainInfo == null) {
							objDomainInfo = {};
						}
					} else {
						if(!_.isUndefined(this.broker.options.domainInfo)) {
							objDomainInfo = this.broker.options.domainInfo;
						}

						if(typeof objDomainInfo == "undefined" || objDomainInfo == null) {
							objDomainInfo = {};
						}
					}
					return objDomainInfo;
				}, 

				setDomainInfoObj (domain, domainInfo) {
					if(!_.isUndefined(this.broker.options.domainInfo)) {
						this.broker.options.domainInfo = {
							...this.broker.options.domainInfo,
							[domain]: domainInfo
						};
					} else {
						this.broker.options.domainInfo = {
							[domain]: domainInfo
						};
					}
					return domainInfo;
				},

				async clearDomainInfoObj (domain = null) {
					if(_.isEmpty(domain) && !_.isUndefined(this.broker.options.domainInfo)) {
						this.broker.options.domainInfo = {};
					} else {
						delete this.broker.options.domainInfo[domain];
					}
				},

				async getDomainConnectionInfoObj (domain) {
					let objConnectionInfo = {};
					if(domain) {
						let domainFromMapping = await this.getDomainMappingObj(domain);
						if(!_.isEmpty(domainFromMapping)) {
							domain = domainFromMapping;
						}

						if(!_.isUndefined(this.broker.options.connectionInfo)) {
							objConnectionInfo = this.broker.options.connectionInfo[domain];
						}
					} else {
						if(!_.isUndefined(this.broker.options.connectionInfo)) {
							objConnectionInfo = this.broker.options.connectionInfo;
						}
					}

					return objConnectionInfo;
				},

				setDomainConnectionInfoObj (domain, domainConnectionInfo) {
					if(!_.isUndefined(this.broker.options.domainConnectionInfo)) {
						this.broker.options.connectionInfo = {
							...this.broker.options.connectionInfo,
							[domain]: domainConnectionInfo
						};
					} else {
						this.broker.options.connectionInfo = {
							[domain]: domainConnectionInfo
						};
					}
					return domainConnectionInfo;
				},

				async clearDomainConnectionInfoObj (domain = null) {
					if(_.isEmpty(domain) &&!_.isUndefined(this.broker.options.connectionInfo)) {
						this.broker.options.connectionInfo = {};
					} else {
						delete this.broker.options.connectionInfo[domain];
					}
				},

				async getDomainMappingObj (shortname) {
					let objDomainMappingInfo = {};
					if(this.broker.cacher) {
						objDomainMappingInfo = await this.broker.cacher.get(`DOMAIN_MAPPING: {${shortname}}`);
					} else {
						if(!_.isUndefined(this.broker.options.domainMappingInfo)) {
							objDomainMappingInfo = this.broker.options.domainMappingInfo[shortname];
						}
					}
					if(typeof objDomainMappingInfo == "undefined" || objDomainMappingInfo == null) {
						objDomainMappingInfo = "";
					} 
					return objDomainMappingInfo;
				},

				async setDomainMappingInfoObj (shortname, domain) {
					if (this.broker.cacher) {
						await this.broker.cacher.set(`DOMAIN-MAPPING:{${shortname}}`, domain);
					} else {
						if (!_.isUndefined(this.broker.options.domainMappingInfo)) {
							this.broker.options.domainMappingInfo = {
								...this.broker.options.domainMappingInfo,
								[shortname]: domain
							};
						} else {
							this.broker.options.domainMappingInfo = {
								[shortname]: domain
							};
						}
					}
					return domain;
				},

				async clearDomainMappingInfoObj(shortname = null) {
					// console.log("Inside clearDomainMappingInfoObj shortname-", shortname);
					if (_.isEmpty(shortname)) {
						if (this.broker.cacher) {
							await this.broker.cacher.clean("**DOMAIN-MAPPING:{**}");
						} else {
							if (!_.isUndefined(this.broker.options.domainMappingInfo)) {
								this.broker.options.domainMappingInfo = {};
							}
						}
					} else {
						if (this.broker.cacher) {
							await this.broker.cacher.clean(`**DOMAIN-MAPPING:{${shortname}}`);
						} else {
							if (!_.isUndefined(this.broker.options.domainMappingInfo)) {
								delete this.broker.options.domainMappingInfo[shortname];
							}
						}
					}
				},
			}
		});
	}
}

module.exports = BaseService; 
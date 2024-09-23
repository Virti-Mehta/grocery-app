"use strict";

const _ = require("lodash");
const Error = require("moleculer-web").Errors;
const {MoleculerClientError, MoleculerValidationError} = require("moleculer").Errors;
const ApiGateway = require("moleculer-web");
const BaseService = require("../base/base.service");


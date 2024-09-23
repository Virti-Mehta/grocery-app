const {
	MoleculerClientError,
	ServiceNotFoundError,
} = require("moleculer").Errors;

// node modules
const _ = require("lodash");
const Bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const passport = require('passport');
const https = require('https');
// Helpers

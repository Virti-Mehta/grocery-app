"use strict";

const Jwt = require("jsonwebtoken");

class TokenHelper {
	constructor(tokenType) {
		this.token_type = tokenType;
	}

	/**
	 * Verify a user by using the provided token and secret key
	 * 
	 * @param {Object} token
	 * @param {Object} secret_key
	 */
	static verifyToken(token, secret_key) {
		return Jwt.verify(token, secret_key);
	}

	/**
    * Generate a JWT token for a user with the provided payload and secret key
    * 
    * @param {Object} payload
    * @param {Object} secret_key
	 */
	static generateJWT(payload, secret_key, expireDuration) {
		return Jwt.sign(
			payload, 
			secret_key, 
			{expiresIn: expireDuration * 60}
		);
	}
}

module.exports = TokenHelper;
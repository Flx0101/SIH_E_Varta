'use strict';
const router = require('express').Router();
const db = require('../db');
const crypto = require('crypto');

// Iterate through the routes object and mount the routes
let _registerRoutes = (routes, method) => {
    for (let key in routes) {
        if (typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array)) {
            _registerRoutes(routes[key], key);
        } else {
            // Register the routes
            if (method === 'get') {
                router.get(key, routes[key]);
            } else if (method === 'post') {
                router.post(key, routes[key]);
            } else {
                router.use(routes[key]);
            }
        }
    }

}

let route = routes => {
    _registerRoutes(routes);
    return router;
}


// A function that generates a unique roomID
let randomHex = () => {
    return crypto.randomBytes(24).toString('hex');
}

// Find a chatroom with a given ID

module.exports = {
    route,
    randomHex
}
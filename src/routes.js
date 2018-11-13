var Joi = require("joi");

homeHandler = require("./handlers/home.js");
withdrawHandler = require("./handlers/withdraw.js");

if (process.env.NODE_ENV !== "production") {
  //For development only routes.
}

//We should add a base url to url to these -- something like oururl.com/api/v1/
var routes = [
  {
    method: "GET",
    path: "/",
    handler: homeHandler
  },
  {
    method: "POST",
    path: "/withdraw",
    handler: withdrawHandler,
    config: {
      plugins: {
        "hapi-rate-limit": {
          enabled: true
        }
      },
      validate: {
        payload: {
          address: Joi.string().required(),
          amount: Joi.number().required()
        }
      }
    }
  },
  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: ".",
        redirectToSlash: true,
        index: true
      }
    }
  }
];

//Add our development only routes here.
if (process.env.NODE_ENV !== "production") {
  //Dev only routes go here.
  //Disable in development
  routes[1].config.plugins["hapi-rate-limit"].enabled = false;
}

module.exports = routes;

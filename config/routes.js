/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'POST /signup':             'entrance/signup',
  'POST /login':              'entrance/login',

  'PUT /user/:id':            'user/update-profile',
  'PUT /update-password':     'user/update-password',
  
};

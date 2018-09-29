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
  'POST /all-users':          'user/get-all-users',

  'POST /address':            'address/new-address',
  'POST /address/:id':        'address/get-address',
  'POST /user-addresses':     'address/get-all-user-address',
  'POST /all-address':        'address/get-all-address',
  'PUT /address/:id':         'address/update-address',
  'DELETE /address/:id':      'address/delete-address',
  
};

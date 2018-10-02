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

  'POST /signup':                     'entrance/signup',
  'POST /login':                      'entrance/login',
  'PUT /password-recovery':           'entrance/password-recovery',
  'PUT /update-password-recovery':    'entrance/update-password-recovery',

  'POST /all-users':                  'user/get-all-users', // 2. 4.
  'PUT /user/:id':                    'user/update-profile', // 1. 2.
  'PUT /update-password/:id':         'user/update-password', // 1. 2.
  'PUT /update-user-status/:id':      'user/update-user-status', // 2. 3.

  'POST /address':                    'address/new-address', // 2.
  'POST /address/:id':                'address/get-address', //  2. 3.
  'POST /user-address/:id':           'address/get-all-user-address', // 2.
  'POST /all-address':                'address/get-all-address', // 2. 4.
  'PUT /address/:id':                 'address/update-address', // 1. 2.
  'DELETE /address/:id':              'address/delete-address', // 1. 2.

  'POST /appointment':                'appointment/new-appointment',
  'POST /appointment/:id':            'appointment/get-appointment',
  'POST /user-appointment/:id':       'appointment/get-all-user-appointment',
  'POST /all-appointments':           'appointment/get-all-appointment',
  'PUT /appointment/:id':             'appointment/update-appointment',
  'DELETE /appointment/:id':          'appointment/delete-appointment',
  
};

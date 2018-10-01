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

  'POST /all-users':                  'user/get-all-users',
  'PUT /user/:id':                    'user/update-profile', // 
  'PUT /update-password/:id':         'user/update-password', // 
  'PUT /update-user-state/:id':       'user/update-user-state',

  'POST /address':                    'address/new-address',
  'POST /address/:id':                'address/get-address',
  'POST /user-address/:id':           'address/get-all-user-address',
  'POST /all-address':                'address/get-all-address',
  'PUT /address/:id':                 'address/update-address',
  'DELETE /address/:id':              'address/delete-address',

  'POST /appointment':                'appointment/new-appointment',
  'POST /appointment/:id':            'appointment/get-appointment',
  'POST /user-appointment/:id':       'appointment/get-all-user-appointment',
  'POST /all-appointments':           'appointment/get-all-appointment',
  'PUT /appointment/:id':             'appointment/update-appointment',
  'DELETE /appointment/:id':          'appointment/delete-appointment',
  
};

/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    emailAddress: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200
    },

    password: {
      type: 'string',
      required: true,
      protect: true
    },

    name: {
      type: 'string',
      required: true,
      maxLength: 120
    },

    lastName: {
      type: 'string',
      required: true,
      maxLength: 120
    },

    phone: {
      type: 'string',
      required: true,
      maxLength: 120
    },

    profilePicture: {
      type: 'string',
      defaultsTo: 'default-avatar.png',
      maxLength: 120
    },

    userStatus: {
      type: 'string',
      isIn: ['unconfirmed', 'active', 'suspended'],
      defaultsTo: 'unconfirmed'
    },

    passwordResetToken: {
      type: 'string',
    },

    passwordResetTokenExpiresAt: {
      type: 'number'
    },

    emailProofToken: {
      type: 'string',
    },

    emailProofTokenExpiresAt: {
      type: 'number'
    },

    emailStatus: {
      type: 'boolean',
      defaultsTo: false
    },

    tosAcceptedByIp: {
      type: 'string',
      description: 'The IP (ipv4) address of the request that accepted the terms of service.',
      extendedDescription: 'Useful for certain types of businesses and regulatory requirements (KYC, etc.)',
      moreInfoUrl: 'https://en.wikipedia.org/wiki/Know_your_customer'
    },

    lastSeenAt: {
      type: 'number'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    addresses: {
      collection: 'address',
      via: 'owner'
    },

    visitor: {
      collection:'visitor',
      via: 'user'
    },

    doctor: {
      collection:'doctor',
      via: 'user'
    }

  },

};


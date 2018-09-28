/**
 * Appointment.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    status: {
      type: 'string',
      isIn: ['pending', 'in progress', 'completed', 'confirmed', 'canceled', 'rejected'],
      defaultsTo: 'pending',
      extendedDescription:
        ` Pending: solicitud enviada al sistema.
          In progress: solicitud aceptada por el medico.
          Completed: solicitud confirmada por el visitador.
          Confirmed: solicitud confirmada por el medico.
          Cancelada: solicitud cancelada por cualquiera de las partes.
          Rejected: solicitud rechazada por el medico, para ser reasignada.`
    },

    type: {
      type: 'string',
      isIn: ['visit', 'chat', 'video call']
    },

    date: {
      type: 'string',
      columnType: 'datetime'
    },

    time: {
      type: 'number'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    visitor: {
      model: 'visitor'
    },

    doctor: {
      model: 'doctor'
    }

  },

};


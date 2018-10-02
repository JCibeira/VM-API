module.exports = {

	friendlyName: 'Get All Appointments',

	description: 'Return all the existing appointments',

	inputs: {
		apiToken: {
			type: 'string'
		}
	}, 

	exits: {
		unauthorized: {
			statusCode: 403,
			description: 'No tiene permiso para acceder a esta función.'
		}
	},

	fn: async (inputs, exits) => {
		let appointments = await Appointment.find();

		return exits.success(appointments);
	}
}
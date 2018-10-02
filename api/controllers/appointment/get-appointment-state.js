module.exports = {

	friendlyName: 'Get Appointment State',

	description: 'Return an appointment\'s state with a given id',

	inputs: {
		id: {
			type: 'number'
		},

		apiToken: {
			type: 'string'
		}
	}, 

	exits: {
		noAppointmentFound: {
			responseType: 'notFound',
            description: 'Could not find that appointment, sorry!'
		}
	},

	fn: async (inputs, exits) => {
		let appointment = await Appointment.findOne({
			id: inputs.id
		});

		if(!appointment) throw 'noAppointmentFound';

		return exits.success(appointment.status);
	}
}
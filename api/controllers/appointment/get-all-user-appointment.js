module.exports = {

	friendlyName: 'Get User\'s Appointments',

	description: 'Return an user\'s appointments',

	inputs: {
		user: {
			type: 'number', 
			required: true
		},

		apiToken: {
			type: 'string'
		}
	}, 

	exits: {
		noUserFound: {
			responseType: 'notFound',
            description: 'Could not find that user, sorry!'
		},

		notRightUser: {
			responseType: 'badRequest',
			description: 'No se pueden ubicar citas para el usuario indicado.'
		}
	},

	fn: async (inputs, exits) => {
		// Find the user with the given ID
		let user = await User.findOne({
			id: inputs.user
		});

		// If there's no user, 
		if(!user) throw 'noUserFound';

		// Find all the appointments of the user
		let appointments; 
		if(user.type === 'visitor'){
			// If the user is a visitor
			appointments = await Appointment.find({
				visitor: user.id
			});
		} else if(user.type === 'doctor') {
			// If the user is a doctor
			appointments = await Appointment.find({
				doctor: user.id
			});
		} else {
			// If the user is non a doctor nor a visitor
			throw 'noUserFound';
		}

		return exits.success(appointments);
	}
}
module.exports = {

	friendlyName: 'Create Appointment',

	description: 'Create a new appointment sended by an visitor-user',

	inputs: {
		visitor: {
			type: 'number'
		},

		doctor: {
			type: 'number'
		},

		type: {
			type: 'string'
		}, 

		date: {
			type: 'string'
		},

		time: {
			type: 'number'
		},

		apiToken: {
			type: 'string'
		}
	}, 

	exits: {
		invalid: {
			responseType: 'badRequest',
			description: 'Los parámetros proporcionados son inválidos.'
		},

		internalError: {
			statusCode: 500,
			description: 'Ocurrió un error al intentar agregar la cita'
		}
	},

	fn: async (inputs, exits) => {

		// If one parameter is missing
		if(typeof(inputs.visitor) === 'undefined' || typeof(inputs.doctor) === 'undefined'){
			throw 'invalid';
		}

		// Validate both foreign keys to exist and be correct
		let foreignKeys = await sails.helpers.appointmentForeignKeysVerify.with({
			visitor: inputs.visitor,
			doctor: inputs.doctor
		});

		if(foreignKeys.condition){	
			// If they're ok
			let appointment = await Appointment.create(Object.assign({
				visitor: inputs.visitor,
				doctor: inputs.doctor,
				status: 'pending',
				type: inputs.type,
				date: inputs.date,
				time: inputs.time
			}))
			.intercept({name: 'UsageError'}, 'invalid')
			.fetch();

			return exits.success(appointment);
		} else {
			// If they're not ok or an error ocurred
			if(foreignKeys.error){
				throw 'internalError';
			}

			throw 'invalid';
		}
	}
}
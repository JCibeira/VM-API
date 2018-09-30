module.exports = {

    friendlyName: 'Create address',
  
    description: 'Create new address for the logged-in user.',
  
    inputs: {

        userId: {
            type: 'number'
        },

        description: {
            type: 'string'
        },
      
        latitude: {
            type: 'string'
        },
    
        longitude: {
            type: 'string'
        },
      
        apiToken: {
            type: 'string'
        }
  
    },

    exits: {
  
        invalid: {
            responseType: 'badRequest',
            description: 'Los parámetros proporcionados son inválidos.'
        }

    },
  
  
    fn: async function (inputs, exits) {
        
        await Address.create(Object.assign({
            description: inputs.description,
            latitude: inputs.latitude,
            longitude: inputs.longitude,
            owner: inputs.userId
        }))
        .intercept({name: 'UsageError'}, 'invalid')
        .fetch();

        return exits.success();
  
    }
  
  
  };
  
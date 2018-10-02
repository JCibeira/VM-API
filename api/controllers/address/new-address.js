module.exports = {

    friendlyName: 'Create address',
  
    description: 'Create new address for the logged-in user.',
  
    inputs: {

        id: {
            type: 'number',
            required: true
        },

        description: {
            type: 'string',
            required: true
        },
      
        latitude: {
            type: 'string',
            required: true
        },
    
        longitude: {
            type: 'string',
            required: true
        },
      
        apiToken: {
            type: 'string',
            required: true
        }
  
    },

    exits: {
        
        success: {
            responseType: 'created',
            description: 'Dirección creada correctamente.',
        },

        invalid: {
            responseType: 'bad-combo',
            description: 'Los parámetros proporcionados son inválidos.'
        },

        invalidToken: {
            responseType: 'expired'
        }

    },
  
  
    fn: async function (inputs, exits) {
        
        var apiTokenVerify;
        
        apiTokenVerify = await sails.helpers.apiTokenVerify.with({
            id: inputs.id,
            apiToken: inputs.apiToken
        });

        if(apiTokenVerify.condition) {

            await Address.create(Object.assign({
                description: inputs.description,
                latitude: inputs.latitude,
                longitude: inputs.longitude,
                owner: inputs.id
            }))
            .intercept({name: 'UsageError'}, 'invalid')
            .fetch();

            return exits.success();

        }

        throw 'invalidToken';

    }
  
  
  };
  
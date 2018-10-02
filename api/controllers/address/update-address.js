module.exports = {

    friendlyName: 'Update address',
  
    description: 'Update specific address for the logged-in user.',
  
    inputs: {

        id: {
            type: 'number',
            required: true
        },

        userId: {
            type: 'number',
            required: true
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
            type: 'string',
            required: true
        }
  
    },
    
    exits: {
        
        success: {
            responseType: 'success',
            description: 'Dirección editada correctamente.',
        },

        invalidToken: {
            responseType: 'expired'
        }

    },
  
    fn: async function (inputs, exits) {
        
        var apiTokenVerify, valuesToSet;
        
        apiTokenVerify = await sails.helpers.apiTokenVerify.with({
            id: inputs.userId,
            apiToken: inputs.apiToken
        });

        if(apiTokenVerify.condition) {

            valuesToSet = {
                description: inputs.description,
                latitude: inputs.latitude,
                longitude: inputs.longitude
            };

            await Address.update({id: inputs.id }).set(valuesToSet);

            return exits.success();

        }

        throw 'invalidToken';
  
    }
  
  
  };
  
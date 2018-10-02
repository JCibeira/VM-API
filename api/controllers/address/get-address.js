module.exports = {

    friendlyName: 'Get address',
  
    description: 'Get a specific address for the logged-in user.',
  
    inputs: {
        
        id: {
            type: 'number',
            required: true
        },

        userId: {
            type: 'number',
            required: true
        },

        apiToken: {
            type: 'string',
            required: true
        }
  
    },

    exits: {

        noAddressFound: {
            responseType: 'not-found',
            description: 'No se pudo encontrar la dirección.'
        },

        invalidToken: {
            responseType: 'expired'
        }
    
    },
    

    fn: async function (inputs, exits) {
        
        var apiTokenVerify, address;
        
        apiTokenVerify = await sails.helpers.apiTokenVerify.with({
            id: inputs.userId,
            apiToken: inputs.apiToken
        });

        if(apiTokenVerify.condition) {

            //
            address = await Address.findOne({ id: inputs.id, owner: inputs.userId });

            if (!address) throw 'noAddressFound';
            
            return exits.success(address);

        }

        throw 'invalidToken';
  
    }
  
  };
  
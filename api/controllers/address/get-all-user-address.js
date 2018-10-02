module.exports = {

    friendlyName: 'Get address',
  
    description: 'Get all address for the logged-in user.',
  
    inputs: {
        
        id: {
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
            responseType: 'notFound',
            description: 'Could not find the address, sorry.'
        },

        invalidToken: {
            responseType: 'expired'
        }
    
    },
    

    fn: async function (inputs, exits) {
        
        var apiTokenVerify, addresses;

        apiTokenVerify = await sails.helpers.apiTokenVerify.with({
            id: inputs.id,
            apiToken: inputs.apiToken
        });

        if(apiTokenVerify.condition) {

            addresses = await Address.find({ owner: inputs.id });

            if (!addresses) throw 'noAddressFound';
            
            return exits.success(addresses);

        }

        throw 'invalidToken';
  
    }
  
  };
  
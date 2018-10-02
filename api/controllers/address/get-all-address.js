module.exports = {

    friendlyName: 'Get all address',
  
    description: 'Get all address.',
  
    inputs: {
        
        id: {
            type: 'number',
            required: true
        },

        isAdmin: {
            type: 'boolean',
            required: true
        },
        
        apiToken: {
            type: 'string',
            required: true
        }
  
    },

    exits: {
        
        unauthorizedUser: {
            responseType: 'unauthorized',
            description: 'No estas autorizado para realizar esta acción.'
        },

        noAddressFound: {
            responseType: 'not-found',
            description: 'No se pudieron encontrar las direcciones.'
        },

        invalidToken: {
            responseType: 'expired'
        }
    
    },
    

    fn: async function (inputs, exits) {
        
        var adminUserVerify, apiTokenVerify, addresses;
        
        if (inputs.isAdmin) {
            
            adminUserVerify = await sails.helpers.adminUserVerify.with({ id: inputs.id });
            
            if(adminUserVerify.condition) {

                apiTokenVerify = await sails.helpers.apiTokenVerify.with({
                    id: inputs.id,
                    apiToken: inputs.apiToken
                });

                if(apiTokenVerify.condition) {

                    addresses = await Address.find();

                    if (!addresses) throw 'noAddressFound';
                    
                    return exits.success(addresses);

                }

                throw 'invalidToken';

            }

            throw 'unauthorizedUser';

        }

        throw 'unauthorizedUser';
        
    }
  
  };
  
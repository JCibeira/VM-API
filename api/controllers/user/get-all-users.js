module.exports = {

    friendlyName: 'Get all users',
  
    description: 'Get all users.',
  
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

        noUsersFound: {
            responseType: 'not-found',
            description: 'No se pudieron encontrar los usuarios.'
        },

        invalidToken: {
            responseType: 'expired'
        }
    
    },
    
    fn: async function (inputs, exits) {
        
        var adminUserVerify, apiTokenVerify, users;
       
        if (inputs.isAdmin) {
            
            adminUserVerify = await sails.helpers.adminUserVerify.with({ id: inputs.id });
            
            if(adminUserVerify.condition) {

                apiTokenVerify = await sails.helpers.apiTokenVerify.with({
                    id: inputs.id,
                    apiToken: inputs.apiToken
                });
        
                if(apiTokenVerify.condition) {
                    
                    users = await User.find();

                    if (!users) throw 'noUsersFound';
                    
                    return exits.success(users);
                }

                throw 'invalidToken';

            }
            
            throw 'unauthorizedUser';

        }

        throw 'unauthorizedUser';
        
    }
  
  };
  
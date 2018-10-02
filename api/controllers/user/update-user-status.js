module.exports = {

    friendlyName: 'Update User State',
    
    description: 'Update the user state for the logged-in user.',
  
    inputs: {
        
        id: {
            type: 'number',
            required: true
        },

        status: {
            type: 'string',
            required: true
        },

        apiToken: {
            type: 'string',
            required: true
        }
  
    },
  
    exits: {
        
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

            await User.update({id: inputs.id }).set({ userStatus: inputs.status });
            return exits.success();
        }
        
        throw 'invalidToken';
  
    }
  
  
  };
  
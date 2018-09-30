module.exports = {

    friendlyName: 'Update User State',
    
    description: 'Update the user state for the logged-in user.',
  
    inputs: {
        
        id: {
            type: 'number'
        },

        status: {
            type: 'string'
        },

        apiToken: {
            type: 'string'
        }
  
    },
  
    exits: {
  
        badCombo: {
            statusCode: 401,
            description: 'Los datos proporcionados son erróneos.'
        }
  
    },
  
  
    fn: async function (inputs, exits) {
        
        var apiTokenCheck;
        
        apiTokenCheck = await sails.helpers.apiTokenCheck.with({
            id: inputs.id,
            apiToken: inputs.apiToken
        });

        if(apiTokenCheck.condition) {

            await User.update({id: inputs.id }).set({ userStatus: inputs.status });
            return exits.success();
        }
        
        throw 'badCombo';
  
    }
  
  
  };
  
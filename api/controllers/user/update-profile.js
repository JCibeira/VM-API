module.exports = {

    friendlyName: 'Update profile',
  
    description: 'Update the profile for the logged-in user.',
  
    inputs: {

        id: {
            type: 'number'
        },

        name: {
            type: 'string'
        },

        lastName: {
            type: 'string'
        },

        phone: {
            type: 'string'
        },

        profilePicture: {
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
        
        var apiTokenCheck, valuesToSet;
        
        apiTokenCheck = await sails.helpers.apiTokenCheck.with({
            id: inputs.id,
            apiToken: inputs.apiToken
        });

        if(apiTokenCheck.condition) {

            valuesToSet = {
                name: inputs.name,
                lastName: inputs.lastName,
                phone: inputs.phone,
                profilePicture: inputs.profilePicture
            };

            await User.update({id: inputs.id }).set(valuesToSet);

            return exits.success();
        }
        
        throw 'badCombo';
  
    }
  
  
  };
  
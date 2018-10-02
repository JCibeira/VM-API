module.exports = {

    friendlyName: 'Update profile',
  
    description: 'Update the profile for the logged-in user.',
  
    inputs: {

        id: {
            type: 'number',
            required: true
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
            type: 'string',
            required: true
        }
  
    },
    
    exits: {
        
        success: {
            description: 'Se actualizaron los datos correctamente.',
        },

        invalidToken: {
            responseType: 'expired'
        }
        
    },
  
  
    fn: async function (inputs, exits) {
        
        var apiTokenVerify, valuesToSet;
        
        apiTokenVerify = await sails.helpers.apiTokenVerify.with({
            id: inputs.id,
            apiToken: inputs.apiToken
        });

        if(apiTokenVerify.condition) {

            valuesToSet = {
                name: inputs.name,
                lastName: inputs.lastName,
                phone: inputs.phone,
                profilePicture: inputs.profilePicture
            };

            await User.update({id: inputs.id }).set(valuesToSet);

            return exits.success();
        }
        
        throw 'invalidToken';
  
    }
  
  
  };
  
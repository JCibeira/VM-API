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

        token: {
            type: 'string'
        }
  
    },
  
  
    fn: async function (inputs, exits) {
        
        var valuesToSet = {
            name: inputs.name,
            lastName: inputs.lastName,
            phone: inputs.phone,
            profilePicture: inputs.profilePicture,
        };

        await User.update({id: inputs.id }).set(valuesToSet);

        return exits.success();
  
    }
  
  
  };
  
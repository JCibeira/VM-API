module.exports = {

    friendlyName: 'Update password',
  
    description: 'Update the password for the logged-in user.',
  
    inputs: {

        id: {
            type: 'number'
        },

        password: {
            description: 'The new, unencrypted password.',
            example: 'abc123v2',
            required: true
        },

        token: {
            type: 'string'
        }
  
    },
  
  
    fn: async function (inputs, exits) {
        
        var hashed = await sails.helpers.passwords.hashPassword(inputs.password);

        await User.update({ id: inputs.id })
        .set({
            password: hashed
        });

        return exits.success();

    }
  
  
  };
  
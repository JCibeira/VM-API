module.exports = {

    friendlyName: 'Update password',
  
    description: 'Update the password for the logged-in user.',
  
    inputs: {

        id: {
            type: 'number'
        },

        oldPassword: {
            description: 'The old, unencrypted password.',
            example: 'abc123v2',
            required: true
        },

        newPassword: {
            description: 'The new, unencrypted password.',
            example: 'abc123v2',
            required: true
        },

        apiToken: {
            type: 'string'
        }
  
    },
    
    exits: {
  
        success: {
            description: 'Se ha cambiado la contraseña correctamente.',
        },
  
        badCombo: {
            statusCode: 401,
            description: 'La contraseña proporcionada es errónea.'
        }
  
    },
  
    fn: async function (inputs, exits) {
        
        var apiTokenCheck, userRecord, newHashed;
        
        apiTokenCheck = await sails.helpers.apiTokenCheck.with({
            id: inputs.id,
            apiToken: inputs.apiToken
        });

        if(apiTokenCheck.condition) {
            
            userRecord = await User.findOne({
                id: inputs.id
            });
      
            if(!userRecord) throw 'badCombo';
    
            await sails.helpers.passwords.checkPassword(inputs.oldPassword, userRecord.password)
            .intercept('incorrect', 'badCombo');
    
            newHashed = await sails.helpers.passwords.hashPassword(inputs.newPassword);
    
            await User.update({ id: inputs.id })
            .set({
                password: newHashed
            });
    
            return exits.success();
            
        }
        
        throw 'badCombo';

    }
  
  
  };
  
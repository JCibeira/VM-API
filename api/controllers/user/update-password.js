module.exports = {

    friendlyName: 'Update password',
  
    description: 'Update the password for the logged-in user.',
  
    inputs: {

        id: {
            type: 'number',
            required: true
        },

        oldPassword: {
            type: 'string',
            required: true
        },

        newPassword: {
            type: 'string',
            required: true
        },

        apiToken: {
            type: 'string',
            required: true
        }
  
    },
    
    exits: {
  
        success: {
            description: 'Se ha cambiado la contraseña correctamente.',
        },
  
        badCombo: {
            responseType: 'bad-combo',
            description: 'La contraseña proporcionada es errónea.'
        },

        invalidToken: {
            responseType: 'expired'
        }
  
    },
  
    fn: async function (inputs, exits) {
        
        var apiTokenVerify, userRecord, newHashed;
        
        apiTokenVerify = await sails.helpers.apiTokenVerify.with({
            id: inputs.id,
            apiToken: inputs.apiToken
        });

        if(apiTokenVerify.condition) {
            
            userRecord = await User.findOne({
                id: inputs.id
            });
      
            if(!userRecord) throw 'badCombo';
    
            await sails.helpers.passwords.checkPassword(inputs.oldPassword, userRecord.password)
            .intercept('incorrect', 'badCombo');
    
            newHashed = await sails.helpers.passwords.hashPassword(inputs.newPassword);

            await User.update({ id: inputs.id }).set({ password: newHashed });
    
            return exits.success();
            
        }
        
        throw 'invalidToken';

    }
  
  
  };
  
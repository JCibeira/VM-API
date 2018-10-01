module.exports = {

    friendlyName: 'Update password Recovery',
    
    description: 'Finish the password recovery flow by setting the new password, based on the authenticity of their token.',
  
    inputs: {
        
        emailAddress: {
            type: 'string',
            required: true
        },

        password: {
            type: 'string',
            description: 'The new, unencrypted password.',
            required: true
        },
  
        token: {
            type: 'string',
            description: 'The password token that was generated.',
            required: true
        }
  
    },
  
    exits: {
  
        invalidToken: {
            responseType: 'expired'
        }
  
    },
  
  
    fn: async function (inputs, exits) {
        
        var userRecord, hashed;

        if(!inputs.token) throw 'invalidToken';
  
        userRecord = await User.findOne({ emailAddress: inputs.emailAddress, passwordResetToken: inputs.token });
  
        if (!userRecord || userRecord.passwordResetTokenExpiresAt <= Date.now())
            throw 'invalidToken';
  
        hashed = await sails.helpers.passwords.hashPassword(inputs.password);
  
        await User.update({ id: userRecord.id }).set({
            password: hashed,
            passwordResetToken: '',
            passwordResetTokenExpiresAt: 0
        });
  
        return exits.success();

    }
  
  };
  
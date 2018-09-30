module.exports = {

    friendlyName: 'Password recovery',
  
    description: 'Password recovery notification to the user with the specified email address.',
  
    inputs: {
  
        emailAddress: {
            description: 'The email address of the alleged user who wants to recover their password.',
            type: 'string',
            required: true
        }
  
    },
  
    exits: {
  
        success: {
            description: 'La dirección de correo electrónico podría haber coincidido con un usuario en la base de datos.  (Si es así, se envió un correo electrónico de recuperación)'
        },
  
    },
  
  
    fn: async function (inputs, exits) {
  
        var userRecord, token;

        userRecord = await User.findOne({ emailAddress: inputs.emailAddress });
        
        if (!userRecord) return exits.success();
     
        token = await sails.helpers.strings.random('url-friendly');
  
        await User.update({ id: userRecord.id }).set({
            passwordResetToken: token,
            passwordResetTokenExpiresAt: Date.now() + sails.config.custom.passwordResetTokenTTL,
        });
  
        return exits.success();
  
    }
  
  
  };
  
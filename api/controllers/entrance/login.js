module.exports = {

    friendlyName: 'Login',
  
    description: 'Log in using the provided email and password combination.',
  
    inputs: {
  
        emailAddress: {
            type: 'string',
            required: true
        },
  
        password: {
            type: 'string',
            required: true
        },
  
        rememberMe: {
            description: 'Whether to extend the lifetime of the user\'s session.',
            type: 'boolean'
        }
  
    },
  
  
    exits: {
  
        success: {
            description: 'El usuario solicitante ha iniciado sesión correctamente.',
        },
  
        badCombo: {
            statusCode: 401,
            description: 'La combinación de correo electrónico y contraseña proporcionada no coincide con ningún usuario en la base de datos.'
      }
  
    },
  
  
    fn: async function (inputs, exits) {
        
        var userRecord
        
        userRecord = await User.findOne({
            emailAddress: inputs.emailAddress.toLowerCase(),
        });
  
        if(!userRecord) throw 'badCombo';

        await sails.helpers.passwords.checkPassword(inputs.password, userRecord.password)
        .intercept('incorrect', 'badCombo');

        if (inputs.rememberMe) {
            if (this.req.isSocket) {
                sails.log.warn(
                    'Received `rememberMe: true` from a virtual request, but it was ignored\n'+
                    'because a browser\'s session cookie cannot be reset over sockets.\n'+
                    'Please use a traditional HTTP request instead.'
                );
            } else {
                this.req.session.cookie.maxAge = sails.config.custom.rememberMeCookieMaxAge;
            }
        }

        this.req.session.userId = userRecord.id;

        console.log(this.req.session);
  
        return exits.success();
  
    }
  
  };
  
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
            type: 'boolean',
            required: true
        }
  
    },
  
  
    exits: {
        
        invalid: {
            responseType: 'badRequest',
            description: 'Los parámetros proporcionados son inválidos.'
        },
  
        badCombo: {
            statusCode: 401,
            description: 'La combinación de correo electrónico y contraseña proporcionada no coincide con ningún usuario en la base de datos.'
        }
  
    },
  
  
    fn: async function (inputs, exits) {
        
        var userRecord, response, apiToken, cookieAge;
        
        userRecord = await User.findOne({
            emailAddress: inputs.emailAddress.toLowerCase()
        });
  
        if(!userRecord) throw 'badCombo';

        await sails.helpers.passwords.checkPassword(inputs.password, userRecord.password)
        .intercept('incorrect', 'badCombo');

        if (inputs.rememberMe)
            cookieAge = sails.config.custom.rememberMeCookieMaxAge;
        else
            cookieAge = sails.config.custom.rememberMeCookieMinAge;

        apiToken = await sails.helpers.strings.random();

        await Sessions.create(Object.assign({
            token: apiToken,
            user: userRecord.id,
            expires: Date.now() + cookieAge
        }))
        .intercept({name: 'UsageError'}, 'invalid');

        response = {
            id: userRecord.id,
            emailAddress: userRecord.emailAddress,
            name: userRecord.name,
            lastName: userRecord.lastName,
            phone: userRecord.phone,
            profilePicture: userRecord.profilePicture,
            apiToken: apiToken
        };

        return exits.success(response);
  
    }
  
  };
  
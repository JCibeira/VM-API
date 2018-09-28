module.exports = {

    friendlyName: 'Signup',
  
    description: 'Sign up for a new user account.',
  
    inputs: {
  
        emailAddress: {
            type: 'string',
            required: true,
            unique: true,
            isEmail: true,
            maxLength: 200
        },
    
        password: {
            type: 'string',
            required: true,
            protect: true
        },
    
        name: {
            type: 'string',
            required: true,
            maxLength: 120
        },
    
        lastName: {
            type: 'string',
            required: true,
            maxLength: 120
        },
    
        phone: {
            type: 'string',
            required: true,
            maxLength: 120
        },

        profile_picture: {
            type: 'string',
            maxLength: 120
        }
  
    },
  
    exits: {
  
        invalid: {
            responseType: 'badRequest',
            description: 'El nombre, apellido, teléfono, email y/o contraseña proporcionados son inválidos.',
        },

        emailAlreadyInUse: {
            statusCode: 409,
            description: 'El email propocionado ya esta registrado.',
        }

    },
  
  
    fn: async function (inputs, exits) {
        var newEmailAddress, newPassword, hashToVerify, newUserRecord;

        newEmailAddress = inputs.emailAddress.toLowerCase();
        newPassword = await sails.helpers.passwords.hashPassword(inputs.password);
        hashToVerify = await sails.helpers.strings.random('url-friendly');

        inputs.profile_picture;
  
        newUserRecord = await User.create(Object.assign({
            emailAddress: newEmailAddress,
            password: newPassword,
            name: inputs.name,
            lastName: inputs.lastName,
            phone: inputs.phone,
            tosAcceptedByIp: this.req.ip
        }, sails.config.custom.verifyEmailAddresses? {
            emailProofToken: hashToVerify,
            emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL,
            emailStatus: false
        }:{}))
      .intercept('E_UNIQUE', 'emailAlreadyInUse')
      .intercept({name: 'UsageError'}, 'invalid')
      .fetch();
  
      return exits.success();
  
    }
  
  };
  
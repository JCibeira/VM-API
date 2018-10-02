module.exports = {

    friendlyName: 'Delete address',
  
    description: 'Delete specific address for the logged-in user.',
  
    inputs: {

        id: {
            type: 'number',
            required: true
        },

        userId: {
            type: 'number',
            required: true
        },
      
        apiToken: {
            type: 'string',
            required: true
        }
  
    },
    
    exits: {
        
        success: {
            responseType: 'success',
            description: 'Dirección borrada correctamente.',
        },

        invalidToken: {
            responseType: 'expired'
        }

    },
  
  
    fn: async function (inputs, exits) {
        
        var apiTokenVerify;
        
        apiTokenVerify = await sails.helpers.apiTokenVerify.with({
            id: inputs.userId,
            apiToken: inputs.apiToken
        });

        if(apiTokenVerify.condition) {

            await Address.destroy({ id: inputs.id, owner: inputs.userId }).fetch();

            return exits.success();

        }

        throw 'invalidToken';
  
    }
  
  
  };
  
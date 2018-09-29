module.exports = {

    friendlyName: 'Get address',
  
    description: 'Get all address for the logged-in user.',
  
    inputs: {
        
        userId: {
            type: 'number'
        },

        apiToken: {
            type: 'string'
        }
  
    },

    exits: {

        noAddressFound: {
            statusCode: 404,
            description: 'Could not find the address, sorry.'
        }
    
    },
    

    fn: async function (inputs, exits) {
        
        var addresses = await Address.find({ owner: inputs.userId });

        if (!addresses) throw 'noAddressFound';
          
        return exits.success(addresses);
  
    }
  
  };
  
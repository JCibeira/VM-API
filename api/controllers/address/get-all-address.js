module.exports = {

    friendlyName: 'Get all address',
  
    description: 'Get all address.',
  
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
            responseType: 'notFound',
            description: 'Could not find address, sorry.'
        }
    
    },
    

    fn: async function (inputs, exits) {
        
        var addresses = await Address.find();

        if (!addresses) throw 'noAddressFound';
          
        return exits.success(addresses);
  
    }
  
  };
  
module.exports = {

    friendlyName: 'Get address',
  
    description: 'Get all address for the logged-in user.',
  
    inputs: {
        
        id: {
            type: 'number'
        },

        apiToken: {
            type: 'string'
        }
  
    },

    exits: {

        noAddressFound: {
            responseType: 'notFound',
            description: 'Could not find the address, sorry.'
        }
    
    },
    

    fn: async function (inputs, exits) {
        
        var addresses = await Address.find({ owner: inputs.id });

        if (!addresses) throw 'noAddressFound';
          
        return exits.success(addresses);
  
    }
  
  };
  
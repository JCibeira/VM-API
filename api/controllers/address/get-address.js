module.exports = {

    friendlyName: 'Get address',
  
    description: 'Get a specific address for the logged-in user.',
  
    inputs: {
        
        id: {
            type: 'number'
        },

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
            description: 'Could not find the address, sorry.'
        }
    
    },
    

    fn: async function (inputs, exits) {
        
        var address = await Address.findOne({
            id: inputs.id
        });

        if (!address) throw 'noAddressFound';
          
        return exits.success(address);
  
    }
  
  };
  
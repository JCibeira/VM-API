module.exports = {

    friendlyName: 'Update address',
  
    description: 'Update specific address for the logged-in user.',
  
    inputs: {

        id: {
            type: 'number'
        },

        userId: {
            type: 'number'
        },

        description: {
            type: 'string'
        },
      
        latitude: {
            type: 'string'
        },
    
        longitude: {
            type: 'string'
        },
      
        apiToken: {
            type: 'string'
        }
  
    },
  
  
    fn: async function (inputs, exits) {
        
        var valuesToSet = {
            description: inputs.description,
            latitude: inputs.latitude,
            longitude: inputs.longitude
        };

        await Address.update({id: inputs.id }).set(valuesToSet);

        return exits.success();
  
    }
  
  
  };
  
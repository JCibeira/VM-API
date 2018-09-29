module.exports = {

    friendlyName: 'Get all users',
  
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

        nousersFound: {
            statusCode: 404,
            description: 'Could not find the users, sorry.'
        }
    
    },
    

    fn: async function (inputs, exits) {
        
        var users = await User.find();

        if (!users) throw 'nousersFound';
          
        return exits.success(users);
  
    }
  
  };
  
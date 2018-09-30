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

        noUsersFound: {
            responseType: 'notFound',
            description: 'Could not find the users, sorry.'
        }
    
    },
    

    fn: async function (inputs, exits) {
        
        var users = await User.find();

        if (!users) throw 'noUsersFound';
          
        return exits.success(users);
  
    }
  
  };
  
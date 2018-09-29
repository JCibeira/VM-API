module.exports = {

    friendlyName: 'Delete address',
  
    description: 'Delete specific address for the logged-in user.',
  
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
  
  
    fn: async function (inputs, exits) {

        var deleteAddress = await Address.destroy({id: inputs.id}).fetch();

        /*if (deleteAddress.length === 0) sails.log('No book found with id.');
        else sails.log('Deleted book with id', deleteAddress[0]);*/

        return exits.success();
  
    }
  
  
  };
  
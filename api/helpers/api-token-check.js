module.exports = {

    friendlyName: 'Api token check',

    description: 'Check the Api token',

    inputs: {
      
        id: {
            type: 'number'
        },

        apiToken: {
            type: 'string'
        }
      
    },

    fn: async function (inputs, exits) {
      
        var sessionRecord = await Sessions.findOne({
            user: inputs.id,
            token: inputs.apiToken
        });

        if(!sessionRecord) return exits.success({ condition: false });

        if(Date.now() > sessionRecord.expires) {
            await Sessions.destroy({id: sessionRecord.id});
            return exits.success({ condition: false });
        }
    
        return exits.success({ condition: true });

    }

};


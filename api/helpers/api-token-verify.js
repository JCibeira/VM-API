module.exports = {

    friendlyName: 'Api token Verify',

    description: 'Verify the Api token.',

    inputs: {
      
        id: {
            type: 'number',
            required: true
        },

        apiToken: {
            type: 'string',
            required: true
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


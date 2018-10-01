module.exports = {

    friendlyName: 'Admin user Verify',

    description: 'Verify if the user is Admin',

    inputs: {
        
        id: {
            type: 'number',
            required: true
        },

    },

    fn: async function (inputs, exits) {

        var admin = await User.findOne({
            id: inputs.id,
            isAdmin: true
        });

        if(!admin) return exits.success({ condition: false });

        return exits.success({ condition: false });

    }


};


module.exports = {

    friendlyName: 'Appointment Foreign Keys Verify',

    description: 'Check if the given foreign keys are correct',

    inputs: {
      
        visitor: {
            type: 'number',
            required: true
        },

        doctor: {
            type: 'number',
            required: true
        },

        apiToken: {
            type: 'string',
            //required: true
        }
      
    },

    fn: async (inputs, exits) => {
        if(inputs.doctor === inputs.visitor || isNaN(inputs.doctor)
          || isNaN(inputs.visitor) || inputs.doctor < 0 || inputs.visitor < 0){
            return exits.success({ condition: false });
        } else {
            let queries = [];

            // Search for the doctor
            queries.push( 
                User.findOne({
                    id: inputs.doctor,
                    type: 'doctor'
                })
            ); 

            // Search for the visitor
            queries.push( 
                User.findOne({
                    id: inputs.visitor,
                    type: 'visitor'
                })
            ); 

            // Wait for both queries to end
            Promise.all(queries).then((users)=>{
                // If both queries ran without trouble there is the doctor in 
                // users[0] and the visitor in users[1]
                if(users[0] && users[1]){
                    // If both users were found
                    return exits.success({ condition: true });
                } else {
                    // If any of them does not exist
                    return exits.success({ condition: false });
                }
            }).catch((err)=>{
                // If there was an error while making one of the queries
                console.log(err);
                return exits.success({ error: err });
            });
        }
    }

};


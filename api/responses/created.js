/**
 * created.js
**/

module.exports = function created() {

    var res, result;
    
    res = this.res;

    result = {
        status: 201,
        message: 'El recurso se ha creado de anera correcta.'
    };
  
    return res.status(201).json(result);
};

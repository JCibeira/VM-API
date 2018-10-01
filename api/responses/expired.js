/**
 * expired.js
**/

module.exports = function expired() {

    var res, result;
    
    res = this.res;

    result = {
        status: 498,
        message: 'El token proporcionado no es válido o ha caducado.'
    };
  
    return res.status(498).json(result);
};

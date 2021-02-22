/**
 * @param {string} email 
 * @param {string} password 
 * @returns {User | undefined}
 */
function passwordChecker(email, password){
  if(email === 'jeff@jeff.jeff' && password === 'jeff'){
    return {name: 'Jeff Jeffries', email: 'jeff@jeff.jeff'};
  }
  return undefined;
}

/**
 * @param {string} email 
 * @param {string} password 
 * @param {nodeStyleCallback} cb 
 */
function passwordCheckerCb(email, password, cb){
  const user = passwordChecker(email, password);
  if(user){
    cb(null, user);
  } else {
    setTimeout(() => {
      cb('User Not Found!');
    }, 1000);
  }
}


/**
 *
 * EXERCISE 1:
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<User, string>}
 */

function passwordCheckerPrms(email, password) {
  return new Promise((resolve, reject) => {
    passwordCheckerCb(email, password, (error, user) => {
      if(user) {
        return resolve(user);
      }
      if(error) {
        return reject(error); 
      };
    })
  })
}
/**
 * 
 * EXERCISE 2
 * 
 * @param {callbackStyleAsyncFunction} fn
 * @param {*} fnParams 
 * @return {Promise<any, any>}
 */
function makePromiseFromFunctionWithCallback(fn, ...fnParams){
  /* 
  Return a promise that 
    - calls fn with the fnParams and a callback (like fn(...fnParams, cb))
    - resolves with a value if the callback succeeds
    - rejects with an error if the callback fails
    It would return with a Promise that resolved with the value or rejected with an error based
     on the success or failure of calling `passwordCheckerCb("jeff@jeff.jeff", "jeff")`. 
    In other words, it would be identical to calling `passwordCheckerPrms("jeff@jeff.jeff", "jeff")`
  */
  return new Promise((resolve, reject) => {
    fn(...fnParams, (err, data) => {
      if(data) {
        return resolve(data);
      } else {
        return reject(err);
      }
    });
  })
}

/**
 * @callback callbackStyleAsyncFunction
 * @param {*[]} fnParams
 * @param {nodeStyleCallback}
 */

/**
  * @callback nodeStyleCallback
  * @param {*} Error
  * @param {*} Value
  */

module.exports = {
  passwordCheckerCb,
  passwordCheckerPrms,
  makePromiseFromFunctionWithCallback,
};
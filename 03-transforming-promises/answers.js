/**
 * 
 * EXERCISE 1
 * 
 * @param {*} promise 
 * @param {*} transformer 
 * @returns {Promise}
 */


function mapPromise(promise, transformer) {
  return new Promise((resolve, reject) => {
  promise
  .then((resolved) => {
    try { 
      if (transformer(resolved) !== undefined)
       {
        resolve(transformer(resolved));
      }
    } catch(e) {
      reject(e);
    }
  })
  .catch((error) => {reject(error)})
  });
}

/**
 * 
 * EXERCISE 2
 * 
 * @param {Promise<number | string>} numberPromise 
 * @returns {Promise<number>}
 */
function squarePromise(numberPromise) {  
  return numberPromise
    .then((value) => {
      if(typeof(value) === Number) {
        return value * value;
      } else if( !Number.isNaN(Number(value)) ) {
        return value * value;
      } else {
        throw `Cannot convert '${value}' to a number!`;
      }
    }).catch(e => { 
      throw e;
    });
}

/**
 * EXERCISE 3
 * 
 * @param {Promise<number | string>} numberPromise 
 * @returns {Promise<number>}
 */
// 1) resolves with 0 if the resolution value is not numeric
// 2) rejects if the input promise rejects.
function squarePromiseOrZero(promise) {
  return squarePromise(promise)
  .catch((e) => {
    return Promise.resolve(0);
  });;
}


/**
 * EXERCISE 4
 * 
 * @param {Promise} promise 
 * @returns {Promise}
 */
// * If the input promise rejects with an error, the output promise will resolve with that error.

// * If the input promise resolves with a value, the output promise will reject with that value.

function switcheroo(promise) {
  return promise.then(
    function success(resolve) {
      throw resolve;
    },
    
    function failure(reject) { 
      return reject;
    }
  );
}

/**
 * 
 * @callback consumer
 * @param {*} value
 */

/**
 * @callback handler
 * @param {*} error
 */

module.exports = {
  mapPromise,
  squarePromise,
  squarePromiseOrZero,
  switcheroo,
};
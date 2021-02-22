/**
 * 
 * EXERCISE 1
 * 
 * @param {Promise} promise 
 * @param {function} asyncTransformer 
 */
function flatMapPromise(promise, asyncTransformer) {
  return new Promise((resolve, reject) => {
    promise
      .then((result) => {resolve(asyncTransformer(result))},
      (subReject) => {reject(subReject)})
      .catch((e) => {e})
  });
}

/**
 * 
 * EXERCISE 2
 * 
 * @param {Promise} firstPromise 
 * @param {function} slowAsyncProcess 
 */

//  Let's practice that!  You're going to create an example like the one above, which will use 
// `.then(cb)` to transform the value of a promise using another async process.  It's a little hairy.
function chainTwoAsyncProcesses(firstPromise, slowAsyncProcess){
  return firstPromise.then((resolve) => {
    return slowAsyncProcess(resolve);
  });
}

/**
 * 
 * EXERCISE 3
 * 
 * @param {function} getUserById 
 * @param {function} getOrganizationById 
 */
function makeGetUserByIdWithOrganization(getUserById, getOrganizationById){
  return function getUserByIdWithOrganization(userId){
    
  return getUserById(userId)
  .then((user) => {
    if(user === undefined) {
      return undefined;
    }
    return getOrganizationById(user.organizationId)
    .then((org) => {
    if(org === undefined) {
      return undefined;
    }
    user.organization = org;
    return user;
    })

  });
  }
}

module.exports = {
  flatMapPromise,
  chainTwoAsyncProcesses,
  makeGetUserByIdWithOrganization,
};
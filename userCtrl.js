var app = require('./server')
var users = require('./users')

module.exports = {
  readAll: () => {
    return users.find()
  },
  findUserById: (id) => {
    let result = users.findOne('id', id)
    if(!result){
      return null
    }
    return result
  },
  getAdmins: () => {
    let results = users.find('type', 'admin')
    if(results.length === 0){
      return null
    } else{
      return results
    }
  },
  getNonAdmins: () => {
    let results = users.find('type', 'user')
    if(results.length === 0){
      return null
    } else{
      return results
    }
  },
  getUsersByFavorite: (favorite)=>{
    let results = users.find()
    let finalResults = []
    for(let i = 0; i < results.length; i++){
      for(let f = 0; f < results[i].favorites.length; f++){
        if(favorite = results[i].favorites[f]){
          finalResults.push(results[i])
        }
      }
    }

    if(finalResults.length = 0){
      return null
    } else{
      return finalResults
    }

  },
  getUsersByAgeLimit: (age) =>{
    let results = users.find()
    let finalResults = []
    for(let i = 0; i < results.length; i++){
      if(age >= results[i].age){
        finalResults.push(results[i])
      }
     }
     if(finalResults.length = 0){
       return null
     } else{
       return finalResults
     }
   },
   findUserByQuery:  (query, value)=>{
     let result = users.find(query, value)
     if(!result){
       return null
     }
     return result
   },
   createUser: (userOBJ) => users.add(userOBJ),
   updateUser: (id, userObj) =>{
     users.update('id', id, userObj);
   },
   removeUser: (id) => {
     let result = users.findOne('id', id)
     users.remove('id', id)
     return result
   }


  }

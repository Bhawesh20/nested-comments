export function saveToLocalStorage(key, value){
    window.localStorage[key] = JSON.stringify(value);
}

export function getFromLocalStorage(key){
    try{
        return JSON.parse(window.localStorage[key]);
    } catch(err){
        return null;
    }
}

export function makeTree(items) {
    let tree = [];
    let mappedArr = {}
     
    // Build a hash table and map items to objects
    items.forEach(function(item) {
      var id = item.id;
      if (!mappedArr.hasOwnProperty(id)) { // in case of duplicates
        mappedArr[id] = item; // the extracted id as key, and the item as value
        mappedArr[id].children = [];  // under each item, add a key "children" with an empty array as value
      }
    })
    
    // Loop over hash table
    for (let i in items) { 
        let id = items[i].id;
      if (mappedArr.hasOwnProperty(id)) {
        let mappedElem = mappedArr[id];
        
        // If the element is not at the root level, add it to its parent array of children. Note this will continue till we have only root level elements left
        if (mappedElem.parentId) { 
          var parentId = mappedElem.parentId;
          mappedArr[parentId].children.push(mappedElem); 
        }
        
        // If the element is at the root level, directly push to the tree
        else { 
          tree.push(mappedElem);
        } 
      }
    }
    
    return tree;
    
  }
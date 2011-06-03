// Initialising the window.IndexedDB Object
//window.indexedDB = window.moz_indexedDB || window.webkitIndexedDB;
//window.IDBKeyRange = window.webkitIDBKeyRange;
//var DAO = {};
/*
//Initialising the window.IndexedDB Object
//IndexedDB implementations still use API prefixes
var indexedDB = window.indexedDB || 		// Use the standard DB API
								window.mozIndexedDB ||  // Or Firefox's early version of it
								window.webkitIndexedDB; // Or Chrome's early version
// Firefox does not prefix these two:
var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;

//Example 1 – Opening and Setting Up a Database
//var request = window.indexedDB.open("CandyDB","My candy store database");
var request = indexedDB.open("CandyDB","My candy store database");
request.onsuccess = function(event) {
  var db = event.result;
  if (db.version != "1") {
    //User's first visit, initialize database.
    var createdObjectStoreCount = 0;
    var objectStores = [
      { name: "kids", keyPath: "id", autoIncrement: true },
      { name: "candy", keyPath: "id", autoIncrement: true },
      { name: "candySales", keyPath: "", autoIncrement: true }
    ];
    function objectStoreCreated(event) {
      if (++createdObjectStoreCount == objectStores.length) {
        db.setVersion("1").onsuccess = function(event) {
          loadData(db);
        };
      }
    }
    for (var index = 0; index < objectStores.length; index++) {
      var params = objectStores[index];
      request = db.createObjectStore(params.name, params.keyPath,
                                     params.autoIncrement);
      request.onsuccess = objectStoreCreated;
    }
  } else {
    //User has been here before, no initialization required.
    loadData(db);
  }
};
*/

var indexedDB = window.indexedDB || 		// Use the standard DB API
								window.mozIndexedDB ||  // Or Firefox's early version of it
								window.webkitIndexedDB; // Or Chrome's early version
// Firefox does not prefix these two:
var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
//Opening a database.
var db;
//var request = mozIndexedDB.open("MyTestDatabase");
var request = indexedDB.open("MyTestDatabase");
request.onerror = function(event) {
  //Do something with request.errorCode!
  alert("Why didn't you allow my web app to use IndexedDB?!");
};
request.onsuccess = function(event) {
  //Do something with request.result!
  db = request.result;
  alert("IndexedDB Opened! - db: "+db);
};

/*
//Class: SjamayeeDb
var SjamayeeDb = new Class({
  initialize: function() {
    this.DBS = {};
    this.DBS.db = null;
  },
  open: function(name,description) {
    //var request = window.moz_indexedDB.open(name,description);
    //var request = window.webkitIndexedDb.open(name,description);
    //var request = window.indexedDB.open(name, description);
    var request = indexedDB.open(name, description);
    request.onsuccess = function(e) {   
      this.DBS.db = e.result;
      document.write("Database Opened", this.DBS.db);
      //Do some more stuff in a minute
    };
    request.onerror = function(e){
      writeError(e);
    };  
    request.onfailure = this.DBS.onerror;
    return request;
  },
  createStore: function(name) {
    var request = this.open(name);
    request.onsuccess = function(e) {
      var v = "1.0";
      this.DBS.db = e.result;
      var db = this.DBS.db;
      //We can only create Object stores in a setVersion transaction;
      if(v!= db.version) {
        var setVrequest = db.setVersion(v);
        //onsuccess is the only place we can create Object Stores
        setVrequest.onfailure = this.DBS.onerror;
        setVrequest.onsuccess = function(e) {
          var store = db.createObjectStore(name, {keyPath: "id"});
        };
      }
    };
    request.onfailure = this.DBS.onerror;
    return request;
  },
  add: function(storeName,text) {
    var db = this.DBS.db;
    var trans = db.transaction([storeName], IDBTransaction.READ_WRITE, 0);
    var store = trans.objectStore(storeName);
    var request = store.put({"text": text, "id": new Date().getTime()});
    request.onsuccess = function(e) {
      console.log(e.value);
    };
    request.onerror = function(e) {
      console.log(e.value);
    };
    return request;
  },
  getAll: function(storeName) {
    //var todos = document.getElementById("todoItems");
    //todos.innerHTML = "";
    var db = this.DBS.db;
    var trans = db.transaction([storeName], IDBTransaction.READ_WRITE, 0);
    var store = trans.objectStore(storeName);
    //Get everything in the store;
    var cursorRequest = store.openCursor();
    cursorRequest.onsuccess = function(e) {
      if (e.result == null) return;
      //renderTodo(e.result.value); // Defined a little later.
      e.result.continue();
    };  
    cursorRequest.onerror = this.DBS.onerror;
    return cursorRequest;
  },
  delete: function(storeName,id) {
    var db = this.DBS.db;
    var trans = db.transaction([storeName], IDBTransaction.READ_WRITE, 0);
    var store = trans.objectStore(storeName);  
    var request = store.delete(id);
    request.onsuccess = function(e) {
      //this.DBS.getAllTodoItems();  // Refresh the screen
    };
    request.onerror = function(e) {
      console.log(e);
    };
    return request;
  }
});
SjamayeeDb.ID = "SjamayeeDb";

var sdb = new SjamayeeDb();
sdb.open("d1","my first indexedDB d1!");
sdb.createStore("O1");
sdb.add("O1","Sjamayee is in the house!");
sdb.getAll("O1");
*/

////////////////////////////////////////////////////////////////////////////

/*
//Example 1 – Opening and Setting Up a Database
var request = window.indexedDB.open("CandyDB","My candy store database");
request.onsuccess = function(event) {
  var db = event.result;
  if (db.version != "1") {
    //User's first visit, initialize database.
    var createdObjectStoreCount = 0;
    var objectStores = [
      { name: "kids", keyPath: "id", autoIncrement: true },
      { name: "candy", keyPath: "id", autoIncrement: true },
      { name: "candySales", keyPath: "", autoIncrement: true }
    ];
    function objectStoreCreated(event) {
      if (++createdObjectStoreCount == objectStores.length) {
        db.setVersion("1").onsuccess = function(event) {
          loadData(db);
        };
      }
    }
    for (var index = 0; index < objectStores.length; index++) {
      var params = objectStores[index];
      request = db.createObjectStore(params.name, params.keyPath,
                                     params.autoIncrement);
      request.onsuccess = objectStoreCreated;
    }
  } else {
    //User has been here before, no initialization required.
    loadData(db);
  }
};

//Example 2 – Storing Kids in the Database
var kids = [
  { name: "Anna" },
  { name: "Betty" },
  { name: "Christine" }
];
 
var request = window.indexedDB.open("CandyDB","My candy store database");
request.onsuccess = function(event) {
  var objectStore = event.result.objectStore("kids");
  for (var index = 0; index < kids.length; index++) {
    var kid = kids[index];
    objectStore.add(kid).onsuccess = function(event) {
      document.getElementById("display").textContent =
        "Saved record for " + kid.name + " with id " + event.result;
    };
  }
};

//Example 3 – List All Kids
var request = window.indexedDB.open("CandyDB","My candy store database");
request.onsuccess = function(event) {
  //Enumerate the entire object store.
  request = event.result.objectStore("kids").openCursor();
  request.onsuccess = function(event) {
    var cursor = event.result;
    //If cursor is null then we've completed the enumeration.
    if (!cursor) {
      return;
    }
    var element = document.createElement("div");
    element.textContent = cursor.value.name;
    document.getElementById("kidList").appendChild(element);
    cursor.continue();
  };
};

//Example 4 – List Kids Who Bought Candy
candyEaters = [];
function displayCandyEaters(event) {
  var display = document.getElementById("purchaseList");
  for (var i in candyEaters) {
    display.textContent += ", " + candyEaters[i].name + "bought " + candyEaters[i].count + "pieces";
  }
};
 
var request = window.indexedDB.open("CandyDB","My candy store database");
request.onsuccess = function(event) {
  var db = event.result;
  var transaction = db.transaction(["kids", "candySales"]);
  transaction.oncomplete = displayCandyEaters;
 
  var kidCursor;
  var saleCursor;
  var salesLoaded = false;
  var count;
 
  var kidsStore = transaction.objectStore("kids");
  kidsStore.openCursor().onsuccess = function(event) {
    kidCursor = event.result;
    count = 0;
    attemptWalk();
  }
  var salesStore = transaction.objectStore("candySales");
  var kidIndex = salesStore.index("kidId");
  kidIndex.openObjectCursor().onsuccess = function(event) {
    saleCursor = event.result;
    salesLoaded = true;
    attemptWalk();
  }
  function attemptWalk() {
    if (!kidCursor || !salesLoaded)
      return;
    if (saleCursor && kidCursor.value.id == saleCursor.kidId) {
      count++;
      saleCursor.continue();
    } else {
      candyEaters.push({ name: kidCursor.value.name, count: count });
      kidCursor.continue();
    }
  }
}
*/

////////////////////////////////////////////////////////////////////////////

/*
//Use a namespace.
var html5rocks = {};
html5rocks.indexedDB = {};

//Open the database.
html5rocks.indexedDB.db = null;
html5rocks.indexedDB.open = function() {
  var request = indexedDB.open("todos");
  request.onsuccess = function(e) {   
    html5rocks.indexedDB.db = e.result;
    //Do some more stuff in a minute
  };
  request.onfailure = html5rocks.indexedDB.onerror;
};

//Creating an Object Store.
html5rocks.indexedDB.open = function() {
  var request = indexedDB.open("todos", "This is a description of the database.");
  request.onsuccess = function(e) {
    var v = "1.0";
    html5rocks.indexedDB.db = e.result;
    var db = html5rocks.indexedDB.db;
    //We can only create Object stores in a setVersion transaction;
    if(v!= db.version) {
      var setVrequest = db.setVersion(v);
      //onsuccess is the only place we can create Object Stores
      setVrequest.onfailure = html5rocks.indexedDB.onerror;
      setVrequest.onsuccess = function(e) {
        var store = db.createObjectStore("todo", {keyPath: "timeStamp"});
        html5rocks.indexedDB.getAllTodoItems();
      };
    }
    html5rocks.indexedDB.getAllTodoItems();
  };
  request.onfailure = html5rocks.indexedDB.onerror;
}

//Adding data to a data store.
html5rocks.indexedDB.addTodo = function(todoText) {
  var db = html5rocks.indexedDB.db;
  var trans = db.transaction(["todo"], IDBTransaction.READ_WRITE, 0);
  var store = trans.objectStore("todo");
  var request = store.put({"text": todoText, "timeStamp": new Date().getTime()});
  request.onsuccess = function(e) {
    console.log(e.value);
  };
  request.onerror = function(e) {
    console.log(e.value);
  };
};

//Querying the data in a store.
html5rocks.indexedDB.getAllTodoItems = function() {
  var todos = document.getElementById("todoItems");
  todos.innerHTML = "";
  var db = html5rocks.indexedDB.db;
  var trans = db.transaction(["todo"], IDBTransaction.READ_WRITE, 0);
  var store = trans.objectStore("todo");
  //Get everything in the store;
  var cursorRequest = store.openCursor();
  cursorRequest.onsuccess = function(e) {
    if(e.result == null) return;
    renderTodo(e.result.value); // Defined a little later.
    e.result.continue();
  };  
  cursorRequest.onerror = html5rocks.indexedDB.onerror;
};

//Deleting data from a table.
html5rocks.indexedDB.deleteTodo = function(id) {
  var db = html5rocks.indexedDB.db;
  var trans = db.transaction(["todo"], IDBTransaction.READ_WRITE, 0);
  var store = trans.objectStore("todo");  
  var request = store.delete(id);
  request.onsuccess = function(e) {
    html5rocks.indexedDB.getAllTodoItems();  // Refresh the screen
  };
  request.onerror = function(e) {
    console.log(e);
  };
};

//Hooking it all up.
function init() {
  html5rocks.indexedDB.open(); // open displays the data previously saved
}
window.addEventListener("DOMContentLoaded", init(), false);

function addTodo() {
  var todo = document.getElementById('todo');
  html5rocks.indexedDB.addTodo(todo.value);
  todo.value = '';
}

//Rendering data from an Object Store.
function renderTodo(row) {
  var todos = document.getElementById("todoItems");
  var li = document.createElement("li");
  var a = document.createElement("a");
  var t = document.createTextNode();
  t.data = row.text;  
  a.addEventListener("click", function(e) {
    html5rocks.indexedDB.deleteTodo(row.text);
  });
  a.textContent = " [Delete]";
  li.appendChild(t);
  li.appendChild(a);
  todos.appendChild(li)
}

// Example / Class /////////////////////////////////////////

//Class: ModelAttributeProxy
var ModelAttributeProxy = new Class({
  Extends: AttributeProxy,
  initialize: function() {
    this.parent(ModelAttributeProxy.ID);
    this.addItem(new ModelAttributeVO("1","name1", "value1"));
  },
  getListObject: function(modelAttributeVO) {
    return new ModelAttribute(modelAttributeVO);
  },
  newBusinessObject: function(item) {
    return new ModelAttribute(item);
  }
});
ModelAttributeProxy.ID = "ModelAttributeProxy";
*/

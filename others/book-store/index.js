import { Application } from './functions.js';

const App = new Application();

// Add Book
console.log("Add Book")
App.Addbook("Javascript Fundamentals", 2, 500)
// App.listInventory() 

// Restock Book
console.log("Restock Book")
// Scenario 1: Book not found
App.restockBook("HTML and CSS from Basics to Advance", 5)
// > RESTOCKING CANNOT PROCEED : The book "HTML and CSS from Basics to Advance" does not exists in the inventory

// Scenario 2: Successfull
App.restockBook("Javascript Fundamentals", 4)
// App.listInventory() 

// Sell Book
console.log("Sell Book")
//    Scenario 1: Out of Stock
App.sellBook("HTML and CSS from Basics to Advance", 5)
// > SELLING CANNOT PROCEED : The book "HTML and CSS from Basics to Advance" does not exists in the inventory.

//    Scenario 2: only limited stocks left
App.sellBook("Javascript Fundamentals", 8)
// > SELLING CANNOT PROCEED : Only 6 stocks left for "Javascript Fundamentals".

//    Scenario 3: Successfull
App.sellBook("Javascript Fundamentals", 3)
// > TRANSACTION SUCCESSFULL
// App.listInventory() 

// Total Earnings
console.log("Total Earnings")
App.totalEarnings()

// // List Inventory
console.log("List Inventory")
App.listInventory() 
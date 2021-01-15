export function Application() {
    // Store Object
    this.Store = {
        name : "National Book Store",
        inventory : [
            {   
                title: "Learning JavaScript Design Patterns",
                quantity : 10,
                value: 100
            },
            {
                title: "Eloquent JavaScript, Second Edition",
                quantity : 20,
                value: 120
            },
            {
                title: "Speaking JavaScript",
                quantity : 15,
                value: 200
            }
        ],
        earnings : 0
    }

    // Book Object
    this.Book = {
        title : null,
        quantity: null,
        value: null
    }

    this.Addbook = function(title, quantity, value) {
        this.Book.title = title;
        this.Book.quantity = quantity;
        this.Book.value = value;

        // add to inventory

        this.Store.inventory.push(this.Book)
    }

    this.getListofBookTitles = function() {
        let inventory = Object.entries(this.Store.inventory).map((value) => {
            return value[1].title
        });
        return inventory;
    }

    this.restockBook = function(title, quantity) {
        // Convert invenorty in store into array
        let inventory = this.getListofBookTitles()

        // check if title exists
        if (inventory.includes(title)){
            let index = inventory.indexOf(title)
            this.Store.inventory[index].quantity += quantity
        } else {
            console.log(`RESTOCKING CANNOT PROCEED : The book "${title}" does not exists in the inventory.`)
        }
    }

    this.sellBook = function(SellTitle, SellQuantity){
        // Convert invenorty in store into array
        let inventory = this.getListofBookTitles()

        // check if title exists
        if (inventory.includes(SellTitle)){
            let index = inventory.indexOf(SellTitle)

            let { value, quantity } = this.Store.inventory[index];

            if (SellQuantity > quantity){
                console.log(`SELLING CANNOT PROCEED : Only ${quantity} stocks left for "${SellTitle}".`)
            } else {
                this.Store.inventory[index].quantity -= SellQuantity
                this.Store.earnings += (SellQuantity * value)
                console.log(`TRANSACTION SUCCESSFULL`)
            }

        } else {
            console.log(`SELLING CANNOT PROCEED : The book "${SellTitle}" does not exists in the inventory.`)
        }
    }

    this.totalEarnings = function() {
        // total earnings of the store, print store name and earnings;
        console.log(this.Store.name)
        console.log("Total earned: "+ this.Store.earnings+" Pesos.")
        return { name: this.Store.name, earnings: this.Store.earnings }
    }

    this.listInventory = function() {
        //  inventory, print title quantity and value;
        for (const value of this.Store.inventory){
            console.log("Book title: ", value.title)
            console.log("Quantity: ", value.quantity)
            console.log("Value: ", value.value)
        }
        return this.Store.inventory
    }
}
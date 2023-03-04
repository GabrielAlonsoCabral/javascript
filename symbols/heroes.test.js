const {deepStrictEqual, throws} = require("assert");

(async ()=>{
    const Heroes = require("./heroes")
    const heroes = new Heroes()
    
    heroes.add("Gabriel","Alonso")
    heroes.add("Gabriel","Cabral")

    deepStrictEqual(heroes.toString(), '\nGabriel Alonso\nGabriel Cabral')
    deepStrictEqual(String(heroes), '\nGabriel Alonso\nGabriel Cabral')
    //throws(()=>heroes*1, {name:"TypeError", message:"Invalid convertion!"})

    const expectedItems = [
        {
            firstName:"Gabriel",
            lastName:"Alonso"
        },
        {
            firstName:"Gabriel",
            lastName:"Cabral"
        },
    ]

    deepStrictEqual([...heroes], expectedItems)
    deepStrictEqual(Array.from(heroes), expectedItems)

    // .iterator
    {
        const items = []
        for (const item of heroes){items.push(item)}
        deepStrictEqual(items, expectedItems)
    }

    // .asyncIterator
    {
        const items = []
        for await (const hero of heroes) { items.push(hero) }
        const expectedKeys = ['id', 'firstName', 'lastName']
    
        deepStrictEqual(items.filter(({ id }) => id > 0).length, 2)
        deepStrictEqual(Object.keys(items[0]), expectedKeys)
    }
})();

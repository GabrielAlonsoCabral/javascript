const {promisify} = require("util");
const crypto = require('crypto');

const randomInt = promisify(crypto.randomInt)

const kItems = Symbol("kItems");
const kFormatName = Symbol("kFormatName");
const kIdKeySize = Symbol("kIdKeySize");

class Heroes{
    constructor(){
        this[kItems]=[]
        this[kIdKeySize]=10
    }

    add(firstName, lastName){
        this[kItems].push({firstName, lastName})
    }

    [kFormatName](firstName, lastName){
        return `${firstName} ${lastName}`
    }

    toString(){
        const result = this[kItems]
            .map(item=>this[kFormatName](item.firstName, item.lastName))
            .join('\n')

        return '\n'.concat(result)
    }

    //Its called when we use String(obj), obj + '', obj*1; -> It means try to change his type
    [Symbol.toPrimitive](coercionType){
        if(coercionType!=='string') throw new TypeError("Invalid convertion!")
        return this.toString();
    }

    // Its callend when someone try to iterate this -> ex: [...new Heroes()]
    //[...obj], Array.from(obj), for of...
    * [Symbol.iterator](){
        for(const item of this[kItems]){
            yield item
        }
    }
    
    async * [Symbol.asyncIterator](){
        for (const item of this[kItems]){
            const id = await randomInt(this[kIdKeySize])
            yield {id, ...item}
        }
    }
}

module.exports=  Heroes

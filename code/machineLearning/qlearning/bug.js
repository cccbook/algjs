class Person {
  constructor(name) {
    this.name = 'Person:'+name
  }

  dump() {
    console.log('Person.name=', this.name)
  }
}

class John extends Person {
  constructor(name) {
    super(name)
    this.name = 'John:'+name
    // this.name = 'John:'+name
  }

  dump() {
    console.log('John.name=', this.name)
  }
}

let john = new John('ccc')

john.dump()

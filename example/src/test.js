
class Base{

    getName(){
        console.log(this.username)
    }

}

class Person extends Base{

    constructor(username, email){
        super()
        this.username = username
        this.email = email
    }
}

const p1 = new Person("rasel", "test@gmail.com")

p1.getName()
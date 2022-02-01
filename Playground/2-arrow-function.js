// const square = function (x) {
//     return x*x
// }

const square = (x) => x*x
console.log(square(2));

const event = {
    name: 'birthday party',
    guestList: ['andrew','jen', 'mike'],
    printguestList() {
        console.log('guest list for ' +this.name);

        this.guestList.forEach((guest) => {
            console.log(`${guest} is attending ${this.name}`);
        })
    }
}

event.printguestList()
const name = 'hadar'
const useAge = 28

const user = {
    name,
    age: useAge,
    location: 'tel aviv'
}
console.log(user);

//object destructuring

const product = {
    label: 'red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
    rating: 4.2
}
// const {label: productLabel, stock, rating = 5} = product
// console.log(productLabel,stock, rating);

const transaction = (type , {label,stock}) => {
    console.log(type , label , stock);
    

}
transaction('order', product)
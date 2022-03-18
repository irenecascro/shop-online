require('mongoose').connect('mongodb://127.0.0.1/codehouse-apolo');

const Person = require('./models/person');
const Product = require('./models/product');

// INSERT V1
const pers1 = new Person();

pers1.name = 'Rodrigo';
pers1.surname = 'Gómez';
pers1.age = 23;
pers1.address = 'C Mayor 34';

// pers1.save();

// INSERT v2

// Person.create({
//     name: 'Manuel',
//     surname: 'Romero',
//     age: 56,
//     address: 'Pavones 127'
// });

// Recuperar datos
// Person.find()
//     .then(people => console.log(people))
//     .catch(error => console.log(error));

// (async () => {
//     try {
//         const people = await Person.find();
//         console.log(people);
//     } catch (err) {
//         console.log(error);
//     }
// })();

// Filtrar datos
// Personas cuya edad es 56

// Person.find({ age: 56 })
//     .then(people => console.log(people.length))
//     .catch(err => console.log(err));

// // Personas mayores de 25 años y menores de 40

// Person.find({
//     age: { $gt: 25, $lt: 40 }
// })
//     .then(people => console.log(people.length))
//     .catch(err => console.log(err));


// Product.create({
//     name: 'Garaje con coches',
//     description: 'rampas y saltitos',
//     price: 129.99,
//     category: 'juguetes',
//     stock: 1,
//     available: true
// })

// const pers2 = new Person();
// pers2.name = 'Luis';
// pers2.surname = 'López';
// pers2.age = 35;
// pers2.address = 'Guzmán el Bueno 34';

// console.log(pers2.fullName);

// pers2.save();

// Person.findOne({ _id: '61de97dca0a8b2281fcb6023' });
Person.findById('61de97dca0a8b2281fcb6023')
    .then(person => {
        console.log(person);
        person.fullName = 'Luisete Sánchez';
        person.save();
    })
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//create Schema
const PhotoSchema = new Schema({
    title: String,
    description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

//Create A Photo
// Photo.create({
//     title: 'Photo 2',
//     description: 'Description 2',
// });

//Read A Photo
// Photo.find({}, (err, data) => {
//     console.log(data);
// });

// Update A Photo
const id = '63037cc04d5e71c2ef9007a7';
// Photo.findByIdAndUpdate(
//     id,
//     {
//         title: 'Photo 2 Updated',
//         description: 'Description 2 Updated',
//     },
//     {
//         new: true,
//     },
//     (err, data) => {
//         console.log(data);
//     }
// );

//Delete A Photo
Photo.findByIdAndDelete(id, (err, data) => {
    console.log('Record has been delete');
});

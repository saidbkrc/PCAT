const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageControllers');

const app = express();

mongoose.connect('mongodb+srv://saidbkrc:9CjI54ZMdxcZL3IL@cluster0.mnkjpgt.mongodb.net/pcat-db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB Connected')
}).catch((err) => {
    console.log(err)
})

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET'],
    })
);

//ROUTES
app.get('/', photoController.getAllPhotos);
app.get('/add', photoController.getAddPage);
app.post('/photos', photoController.createPhoto);
app.get('/photo/:id', photoController.getPhoto);
app.get('/photo/edit/:id', photoController.editPhotoPage);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı`);
});

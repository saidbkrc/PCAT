const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {

    const page = req.query.page || 1;
    const photosPerPage = 3;
    const totalPhotos = await Photo.find().countDocuments();
    const photos = await Photo.find({})
    .sort('-createdAt')
    .skip((page-1) * photosPerPage)
    .limit(photosPerPage);
    res.render('index', {
        photos: photos,
        current: page, 
        pages: Math.ceil(totalPhotos / photosPerPage)
    });

    // console.log(req.query);
    // const photos = await Photo.find({}).sort('-createdAt');
    // res.render('index', {
    //     photos,
    // });
};

exports.getPhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
        photo,
    });
};

exports.getAddPage = (req, res) => {
    res.render('add');
};

exports.createPhoto = async (req, res) => {
    const uploadDir = 'public/uploads';

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    let uploadedImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name;

    uploadedImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadedImage.name,
        });
        res.redirect('/');
    });
};

exports.editPhotoPage = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    res.render('edit', {
        photo,
    });
};

exports.updatePhoto = async (req, res) => {
    const id = req.params.id;
    const photo = await Photo.findOne({ _id: id });
    photo.title = req.body.title;
    photo.description = req.body.description;
    photo.save();
    res.redirect(`/photo/${id}`);
};

exports.deletePhoto = async (req, res) => {
    const id = req.params.id;
    const photo = await Photo.findOne({ _id: id });
    let deletedImage = __dirname + '/../public' + photo.image;
    fs.unlinkSync(deletedImage);
    await Photo.findByIdAndRemove(id);
    res.redirect('/');
};

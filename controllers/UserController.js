const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

    // check errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array() })
    }

    const { email, password } = req.body;


    try {
        // check user is unique
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({ msg: 'This user already exists' });
        }

        // create user
        user = new User(req.body);

        //  password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt );

        // save user
        await user.save();

        // create and sign JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        // sign JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 
        }, (error, token) => {
            if(error) throw error;

            // confirm message
            res.json({ token  });
        });


    } catch (error) {
        res.status(400).send('There was an error');
    }
}

exports.getUsers= async (req, res) => {
    let users = await User.find();
    return res.json(users);
}

exports.getMovies = async (req, res) => {
    try {
        let movies = await User.findById({_id : req.user.id}).select('favMovies');
        return res.json(movies);
    } catch(error){
        console.log(error);
    }

}
exports.saveMovie = async (req, res) => {

    try {
        const user = await User.findByIdAndUpdate({ _id: req.user.id}, 
            { $addToSet: { favMovies: req.body.imdbID} }) ;

    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'There was an error'});
    }
}

exports.deleteMovie = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate({ _id: req.params.id }, 
            { $pull: { favMovies:  req.query.imdbID } }) ;
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'There was an error'});
    }
}

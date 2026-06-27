const userModel = require("../model/userModel");
const clientAccountModel = require("../model/clientAccountModel");
const AppError = require("../utils/AppError");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require("validator");
const sanitizeTaxt = require("../utils/senitize");

const register = async (req, res, next) => {
    let {name , email, password, invitation_code = '', admin_secert_key = '', company_name = '', billing_reference = ''} = req.body;
    
    name = sanitizeTaxt(name);

    if (!name || !email || !password) {
        return next(new AppError(400, "VALIDATION_ERROR", "Name, Email and Password all are required."));
    }

    if (!validator.isEmail(email)) {
        return next(new AppError(400, "VALIDATION_ERROR", "Please enter a valid email."));
    }

    const passwordMatch = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passwordMatch.test(password)) {
        return next(new AppError(400, "VALIDATION_ERROR", "Please enter a valid password. (Password must be a minimum of 8 characters with at least one letter and one number)"));
    }

    const userExists = await userModel.exists({email: email});

    if (userExists) {
        return next(new AppError(409, "USER_ALREADY_EXISTS", "User alredy exists."));
    }

    role = "client";
    if (invitation_code == process.env.AGENT_INVITATION_CODE) {
        role = "agent";
    }
    if (invitation_code == process.env.SUPERVISOR_INVITATION_CODE) {
        role = "supervisor";
    }
    if (admin_secert_key == process.env.ADMIN_SECERT_KEY) {
        role = "admin"
    }

    let costFactorCode = Number(process.env.COST_FACTOR_CODE);

    let hashPassowrd = await bcrypt.hash(password, costFactorCode);

    const userDetails = await userModel.create({
        name,
        email,
        password: hashPassowrd,
        role
    });
    
    let data = {};
    data['user'] = {name: name, email: email, role: role};

    if (userDetails && role == "client") {
        const clientAccountDeails = await clientAccountModel.create({
            user_id: userDetails._id,
            company_name,
            billing_reference
        })
        data['client_account'] = clientAccountDeails;
    }

    res.status(200).json({
        status: true,
        data: data
    })
}

const login = async (req, res, next) => {
    let {email, password} = req.body;

    if (!email || !password) {
        return next(new AppError(400, "VALIDATION_ERROR", "Please enter a email and password both."));
    }

    if (!validator.isEmail(email)) {
        return next(new AppError(400, "VALIDATION_ERROR", "Please enter a valid email."));
    }

    const passwordMatch = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passwordMatch.test(password)) {
        return next(new AppError(400, "VALIDATION_ERROR", "Please enter a valid password. (Password must be a minimum of 8 characters with at least one letter and one number)"));
    }

    const userDetail = await userModel.findOne({email: email, is_active: true});

    if (!userDetail) {
        return next(new AppError(404, "USER_NOT_EXISTS", "Invalid login credantial or user inactive."));
    }
    
    const validPassword = await bcrypt.compare(password, userDetail.password);

    if (!validPassword) {
        return next(new AppError(404, "USER_NOT_EXISTS", "Invalid login credantial."));
    }

    let userData = {
        user_id: userDetail._id,
        name: userDetail.name,
        email: userDetail.email,
        role: userDetail.role
    };    

    var token = jwt.sign(userData, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_SECRET_EXPIRE_IN});

    userData['token'] = token; 

    res.status(200).json({
        status: true,
        data: userData
    })
}

const me = (req, res, next) => {
    res.status(200).json({
        status: true,
        data: req.userData
    })
}

module.exports = {register, login, me};
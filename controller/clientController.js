const clientAccountModel = require("../model/clientAccountModel");
const userModel = require("../model/userModel");
const AppError = require("../utils/AppError");
const validator = require("validator");
const sanitizeTaxt = require("../utils/senitize");
const { default: mongoose } = require("mongoose");

const getClient = async (req, res, next) => {   

    if (req.userData.role != "admin") {
        return next(new AppError(403, "FORBIDEN", "User have not authorized for this action."));
    }

    let {page = 1, limit = 10, is_verified = null, company_name = ''} = req.query;
    let skipDocument = (page - 1) * limit;
    

    let where = {};
    if (is_verified !== null) {
        where['is_verified'] = (is_verified == 0) ? false : true;
    }
    if (company_name != '') {
        where['company_name'] = company_name;
    }

    const userDetail = await clientAccountModel.find(where).sort({ user_id: 1}).skip(skipDocument).limit(limit).populate("user_id", "name email role is_active");
    const total = await clientAccountModel.countDocuments();
    

    if (!userDetail) {
        return next(new AppError(404, "CLIENT_NOT_EXISTS", "No any client account exists."));
    }
    
    res.status(200).json({
        status: true,
        data: userDetail,
        meta: {
            page: page,
            limit: limit,
            total: total
        }
    });
}

const getSpecificClientDetails = async (req, res, next) => {
    let clientId = req.params.id;

    let where = {};
    where['_id'] = new mongoose.Types.ObjectId(clientId);
    if (req.userData.role == "client") {
        where['user_id'] = req.userData.user_id;
    }

    const userDetail = await clientAccountModel.findOne(where).populate("user_id", "name email role");

    if (!userDetail) {
        return next(new AppError(404, "CLIENT_NOT_EXISTS", "No any client account exists."));
    }
    
    res.status(200).json({
        status: true,
        data: userDetail
    })
}

const verifiedClientAcount = async (req, res, next) => {
    if (req.userData.role != "admin") {
        return next(new AppError(403, "FORBIDEN", "User have not authorized for this action."));
    }

    let clientId = req.params.id;
    
    const clientAccountExists = await clientAccountModel.exists({ _id: clientId });

    if (!clientAccountExists) {
        return next(new AppError(404, "CLIENT_NOT_EXISTS", "No any client account exists."));
    }

    const userDetail = await clientAccountModel.findByIdAndUpdate(clientId, {$set: {is_verified: true}}, {new: true})
    
    res.status(200).json({
        status: true,
        data: userDetail
    })
}

const deactivateClientAcount = async (req, res, next) => {
    console.log("asd");
    
    if (req.userData.role != "admin") {
        return next(new AppError(403, "FORBIDEN", "User have not authorized for this action."));
    }

    let clientId = req.params.id;
    
    const clientAccountExists = await clientAccountModel.exists({ _id: clientId });

    if (!clientAccountExists) {
        return next(new AppError(404, "CLIENT_NOT_EXISTS", "No any client account exists."));
    }

    const userDetail = await userModel.findByIdAndUpdate(req.userData.user_id, {$set: {is_active: false}}, {new: true})
    
    res.status(200).json({
        status: true,
        data: userDetail
    })
}

module.exports = {getClient, getSpecificClientDetails, verifiedClientAcount, deactivateClientAcount};
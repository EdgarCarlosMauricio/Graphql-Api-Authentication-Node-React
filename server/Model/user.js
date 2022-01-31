const { Schema, model } = require("mongoose");

module.exports.User = model(
    "User",
    Schema(
        {
            name: {
                type: String,
                require: true,
            },
            username: {
                type: String,
                require: true,
                trim: true,
                unique: true,
            },
            email: {
                type: String,
                require: true,
                trim: true,
                unique: true,
            },
            siteWeb: {
                type: String,
                trim: true,
            },
            description: {
                type: String,
                trim: true,
            },
            password: {
                type: String,
                require: true,
                trim: true,
            },
            avatar: {
                type: String,
                required: false,
            },
        },
        { timestamps: true }
    )
);

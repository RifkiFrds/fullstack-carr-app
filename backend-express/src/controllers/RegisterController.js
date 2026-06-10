// import express
const express = require('express');

// import validateResult from express-validator
const { validationResult } = require('express-validator');

// import bcrypt
const bcrypt = require('bcryptjs');

// import prisma
const prisma = require('../../prisma/client');

// function register
const register = async (req, res) => {

    // periksa hasil validasi
    const erros = validationResult(req);
    if (!erros.isEmpty()) {

        // jka ada error, kirim response error
        return res.status(400).json({
            success: false,
            message: 'Validation errors',
            errors: erros.array(),
    });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
        // insert data
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            },
        });

        // return response json
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server error',
        });
    }
};

module.exports = { register };

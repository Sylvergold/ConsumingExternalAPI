require("dotenv").config();
const express = require("express");
const dataModel = require("../models/dataModel");
const axios = require("axios");

// get all data from the external API
exports.allData = async (req, res)=>{
    try{
        const externalDataResponse = await axios.get(process.env.EXTERNAL_API_URI);
        const externalData = externalDataResponse.data

        for (const item of externalData){
            const existingData = await dataModel.findOne({postId: item.id})

            if(!existingData){
                const newData = new dataModel({
                    userId: item.userId,
                    postId: item.id,
                    title: item.title,
                    body: item.body
                })

                await newData.save()
            }
        }

        const myData = await dataModel.find();
        res.status(200).json({
            message: "Data",
            data: myData
        })
    }catch(error){
        console.log(error)
    }
}

// get one post
exports.getOne = async (req, res)=>{
    try{
        const id = req.params.id;
        const post = await dataModel.findOne({postId: id})
        res.status(200).json({
            message: `Post with id: ${id} is found.`,
            data: post
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

// create a post
exports.createPost = async (req, res)=>{
    try{
        const externalDataResponse = await axios.get(process.env.EXTERNAL_API_URI, req.body);
        const newData =  new dataModel({
            userId: req.body.userId,
            postId: req.body.postId,
            title: req.body.title,
            body: req.body.body
        });

        await newData.save();
        res.status(201).json({
            message: "Created successfully",
            data: newData
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

// update a post by postId
exports.update= async (req, res) => {
    try {
        const updateId = req.params.id;
    
        const updatedData = await dataModel.findOneAndUpdate({postId:updateId}, req.body, { new: true });

        if (!updatedData) {
            return res.status(404).json({
                message: `Post with id: ${updateId} not found.`
            });
        }else{

            res.status(200).json({
                message: `Post with id: ${updateId} has been updated.`,
                data: updatedData
            });
        }

        
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// delete a post by postId
exports.deletePost = async (req, res) => {
    try {
        const deleteId = req.params.id;

        const deletedData = await dataModel.findOneAndDelete({ postId: deleteId });

        if (!deletedData) {
            return res.status(404).json({
                message: `Post with id: ${deleteId} not found.`
            });
        } else {
            res.status(200).json({
                message: `Post with id: ${deleteId} has been deleted.`,
                data: deletedData
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


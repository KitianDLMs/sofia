const { response } = require("express");
const Value = require('../models/values');


const crearValue = async (req, res = response ) => {
    try {

        let value = req.body ;
        
        const data = await Value.create(value);
        res.status(201).json({
            message: 'el valor se creo correctamente',
            success: true, 
            data: data.id
        });        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getValues = async (req, res = response) => {
    try {
        const data = await Value.find();      
        res.status(201).json(data);
    } catch (error) {
        res.status(501).json({
            ok: false,
            msg: 'hable con el administrador - tripController - getTrips'
        });
    }
}

const getValueByStatus = async (req, res = response) => {
    const comuna = req.headers.comuna;

    try {
        const status = req.params.status;      
        const data = await Trip.find({status});
        return res.status(201).json(data);
    } catch (error) {
        res.status(501).json({
            ok: false,
            msg: 'hable con el administrador - tripController - getTripsByStatus'
        });
    }
}

const getValue = async (req, res = response) => {

    try {
        const { id } = req.params;

        const trip = await Value.findById({_id: id });
        
        res.status(200).json({
            ok: true,
            trip
        });
    } catch (error) {
        res.json({
            ok: false,
            msg: 'hable con el administrador - tripController - getTrip'
        });
    }
}

const deleteValue = async (req, res = response ) => {
    let id = req.params.uid;
    try {

        const data = await Trip.findByIdAndDelete(id);
        
        return res.status(201).json({            
            message: 'el viaje se elimino correctamente',
            success: true,             
            data: data
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'hubo un error al eliminar el viaje'
        });
    }
}



module.exports = {
    crearValue,
    getValues,
    getValueByStatus,
    getValue,
    deleteValue
}
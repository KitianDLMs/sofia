const { response } = require("express");
const Trip = require('../models/trip');
const Usuario = require('../models/usuario');
const usuario = require("../models/usuario");


const crearTrip = async (req, res = response ) => {
    try {

        let trip = req.body ;
        trip.online = false;   
        trip.status = 'Estacionado';

        const data = await Trip.create(trip);
        res.status(201).json({
            message: 'el viaje se creo correctamente',
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

const getTrips = async (req, res = response) => {
    try {
        const data = await Trip.find();      
        res.status(201).json(data);
    } catch (error) {
        res.status(501).json({
            ok: false,
            msg: 'hable con el administrador - tripController - getTrips'
        });
    }
}

const getTripsByStatus = async (req, res = response) => {
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

const getTrip = async (req, res = response) => {

    try {
        const { id } = req.params;

        const trip = await Trip.findById({_id: id });
        
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

const updateTripToDispatched = async (req, res = response ) => {
    const driverUid = req.headers.uid;
    try {
        let trip = req.body;
        const data = await Trip.findByIdAndUpdate(trip.uid,{ status: 'EnCamino', online: true, idDriver: driverUid });
        
        await Usuario.findByIdAndUpdate(driverUid, {trip: data._id});        
        
        return res.status(201).json({            
            message: 'el viaje se asignó correctamente',
            success: true,             
            data: data
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'hubo un error al asignar el viaje'
        });
    }
}

const updateTripToFinish = async (req, res = response ) => {
    const driverUid = req.headers.uid;
    
    try {
        let trip = req.body;
        const data = await Trip.findByIdAndUpdate(trip.uid,{ status: 'Finalizado', online: false, idDriver: '' });
        
        await Usuario.findByIdAndUpdate(driverUid, {trip: ''});        
        
        return res.status(201).json({            
            message: 'el viaje se actualizo correctamente',
            success: true,             
            data: data
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'hubo un error al actualizar el viaje'
        });
    }
}

const updateTrip = async (req, res = response ) => {
    try {
        let trip = req.body;

        const data = await Trip.findByIdAndUpdate(trip.uid,{ status: 'Finalizado', online: false, idDriver: '' }, {new: true});
        
        return res.status(201).json({            
            message: 'el viaje se actualizo correctamente',
            success: true,             
            data: data
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'hubo un error al actualizar el viaje'
        });
    }
}
    
const findDriverAndStatus = async (req, res = response) => {
    try {
        const {id} = req.params;
        const usr = await Usuario.findById({_id: id});
       
        const trip = await Trip.find({_id: usr.trip});
        return res.status(201).json(trip);    
        
    } catch (error) {
        res.status(501).json({
            ok: false,
            msg: 'hable con el administrador - tripController - findDriverAndStatus'
        });
    }
}

const updateLatLng = async (req, res = response ) => {     
    try {
        let trip = req.body;
        const data = await Trip.findByIdAndUpdate(trip.uid,{ lat: trip.lat, lng: trip.lng });
        
        await Usuario.findByIdAndUpdate(driverUid, {trip: ''});        
        
        return res.status(201).json({            
            message: 'el viaje se actualizo correctamente',
            success: true,             
            data: data
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'hubo un error al actualizar el viaje'
        });
    }
}

const deleteTrip = async (req, res = response ) => {
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
    crearTrip,
    getTrips,
    getTrip,
    getTripsByStatus,
    updateTripToDispatched,
    updateTripToFinish,
    findDriverAndStatus,
    updateLatLng,
    updateTrip,
    deleteTrip
}
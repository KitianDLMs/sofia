const { io } = require('../index');

const tripDriverNameSpace = io.of('/trip/driver');

tripDriverNameSpace.on('connection', socket => {

    socket.on('position', (data) => {
        tripDriverNameSpace.emit(`position/${data.id_trip}`, { id_trip: data.id_trip, lat: data.lat, lng: data.lng });
    });
   
    socket.on('disconnect', (data) => {
        console.log('desconectado del socket');
    });

});

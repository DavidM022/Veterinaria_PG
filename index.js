//express
const express = require('express');
const app = express();
const PORT = 3000; // puede cambiar

//array 
let ReservaP = [
    {id: 1 , ci: 13180493, nombre: 'David Mamani', paciente: 'Perro', tipo: 'consulta', fecha: '13-05-2024', hora: '15:00'},
    {id: 2 , ci: 15236598, nombre: 'Vladimir Condori', paciente: 'Gato', tipo: 'Tratamiento', fecha: '14-05-2024', hora: '18:00'},
    {id: 3 , ci: 11028798, nombre: 'Alex Ticona', paciente: 'Gato', tipo: 'cirugia', fecha: '16-05-2024', hora: '14:00'},
];
//manejo de JSON
app.use(express.json());
//endpoint Listar todas las reservas
app.get('/reservas', (req, res) => {
    res.json(ReservaP);
});
// endpoint buscar reserva por Ci
app.get('/reservas/:ci',(req, res) => {
    const CiCapturado = parseInt(req.params.ci);
    console.log(CiCapturado);
    const reservaEncontrada = ReservaP.find((persona) => persona.ci === CiCapturado);
    if (reservaEncontrada) {
        res.json(reservaEncontrada);
    } else {
        res.status(404).json({mensaje : 'no se encontro reserva'});
    }
});
// endpoint Agregar reserva
app.post('/agregar_reserva', (req, res) => {
    const nuevaReserva = req.body;
    console.log(nuevaReserva);
    ReservaP.push(nuevaReserva);
    res.status(201).json('RESERVA GUARDADA EXITOSAMENTE');
})
// endpoint Actualizar reserva
app.put('/actualizar_reserva/:ci', (req, res) => {
    const CiCapturado = parseInt(req.params.ci);
    const ReservaLocalizada = ReservaP.findIndex((persona) => persona.ci === CiCapturado);
    if (ReservaLocalizada !== -1 ){
        ReservaP[ReservaLocalizada] = req.body;
        res.json(ReservaP[ReservaLocalizada]);
    } else {
        res.status(404).json({mensaje : 'RESERVA NO ENCONTRADA'});
    }
});
// endpoint Eliminar reserva
app.delete('/eliminar_reserva/:ci', (req, res) => {
    const ci = parseInt(req.params.ci);
    LReserva = ReservaP.filter( persona => persona.ci === ci);
    res.status(201).json({mensaje : 'SE ELIMINO LA RESERVA'});
    console.log(LReserva);
});



app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto http://localhost:" + PORT);
});
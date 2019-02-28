const { io } = require('../server')
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl()

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

      let siguiente = ticketControl.siguiente()

      console.log(siguiente)

      callback(siguiente)

    })

    client.emit('estadoActual', {
      actual: ticketControl.getUltimoTicket(),
      ultimo4: ticketControl.getUltimo4()
    } )

    client.on('atenderTicket', (data, callback) => {

      if(!data.escritorio){
        return callback({
          err: true,
          mensaje: 'el escritorio es necesario'
        })
      }

      let atenderTicket = ticketControl.atenderTicket(data.escritorio);


      callback(atenderTicket);

      client.broadcast.emit('ultimos4', {
        ultimo4: ticketControl.getUltimo4()
      })

      //Actualizar los cambios de los ultimo 4

    })

    // console.log('Usuario Conectado');

    // client.emit('enviarMensaje', {
    //   usuario: 'Administrador',
    //   mensaje: 'Bienvenido a esta aplicacion'
    // })

    // client.on('disconnect', () => {
    //     console.log('Usuario Desconectado');
    // })

    // //Escuchar el cliente
    // client.on('enviarMensaje', (data, callback) => {

    //     console.log(data);

    //     //Este solo sirve con el mismo cliente
    //     //client.emit('enviarMensaje', data)

    //     //Enviar a todos los que estan en el servidor
    //     client.broadcast.emit('enviarMensaje', data)

    //   // if(mensaje.usuario){
    //   //       callback({
    //   //         resp: 'Todo salio bien :)'
    //   //       })
    //   // }else{
    //   //   callback({
    //   //     resp: 'Todo salio Mal :('
    //   //   })
    //   // }

    // })

})

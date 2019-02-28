var socket = io()

var lblTicket1 = $('#lblTicket1')
var lblTicket2 = $('#lblTicket2')
var lblTicket3 = $('#lblTicket3')
var lblTicket4 = $('#lblTicket4')

var lblEscritorio1 = $('#lblEscritorio1')
var lblEscritorio2 = $('#lblEscritorio2')
var lblEscritorio3 = $('#lblEscritorio3')
var lblEscritorio4 = $('#lblEscritorio4')

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4]
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4]

socket.on('estadoActual', (data) => {

    //console.log(data)
    actualizaHtml(data.ultimo4)

})

socket.on('ultimos4', (data) => {

    var audio = new Audio('../audio/new-ticket.mp3')
    audio.play()

    actualizaHtml(data.ultimo4)

})


function actualizaHtml(ultimo4){

    for(var i= 0; i <= ultimo4.length - 1; i++){

        lblTickets[i].text('Ticket '+ ultimo4[i].numero)
        lblEscritorios[i].text('Escritorio '+ ultimo4[i].escritorio)

    }

}

function dateConvert(stringdate) {
 
    try {
        const date = stringdate.split(" ")[0];
        const time = stringdate.split(" ")[1];


        var dateParts = date.split("/");
        var timeParts = time.split(":");
        var dateObject = new Date(
        //Dia
        dateParts[2],
        //Mês
        dateParts[1] - 1,
        //Ano
        dateParts[0],
        //Hora
        timeParts[0],
        // Minutos
        timeParts[1]
        );
        
        return dateObject

    } catch (error) {
        console.error('Date format invalid')
        throw new Error('Date format invalid')  
    }

}


export default {
    dateConvert,
}
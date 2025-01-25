// Definimos los días de la semana y los nombres de los meses
const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Generamos el calendario con los días y los turnos
function generateCalendar() {
    const calendarTableBody = document.querySelector("#calendar-table tbody");
    const currentMonth = new Date().getMonth(); // Obtener el mes actual
    const currentYear = new Date().getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // Día de la semana del primer día del mes
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Número de días en el mes
    
    // Mostrar el nombre del mes
    const monthName = document.getElementById("month-name");
    monthName.textContent = months[currentMonth] + ' ' + currentYear;

    // Limpiar cualquier fila existente en el calendario
    calendarTableBody.innerHTML = "";

    // Crear las filas para cada día del mes
    for (let day = 1; day <= daysInMonth; day++) {
        const row = document.createElement("tr");
        
        // Columna Día
        const dayCell = document.createElement("td");
        dayCell.textContent = day;
        row.appendChild(dayCell);

        // Columna Turno 1: Nombre
        const nameCell1 = document.createElement("td");
        const inputName1 = document.createElement("input");
        inputName1.type = "text";
        inputName1.placeholder = "Nombre Turno 1";
        nameCell1.appendChild(inputName1);
        row.appendChild(nameCell1);

        // Columna Turno 1: RUT
        const rutCell1 = document.createElement("td");
        const inputRut1 = document.createElement("input");
        inputRut1.type = "text";
        inputRut1.placeholder = "RUT Turno 1";
        rutCell1.appendChild(inputRut1);
        row.appendChild(rutCell1);

        // Agregar la fila al calendario
        calendarTableBody.appendChild(row);

        // Columna Turno 2: Nombre (agregar más celdas si es necesario)
        const nameCell2 = document.createElement("td");
        const inputName2 = document.createElement("input");
        inputName2.type = "text";
        inputName2.placeholder = "Nombre Turno 2";
        nameCell2.appendChild(inputName2);
        row.appendChild(nameCell2);

        // Columna Turno 2: RUT
        const rutCell2 = document.createElement("td");
        const inputRut2 = document.createElement("input");
        inputRut2.type = "text";
        inputRut2.placeholder = "RUT Turno 2";
        rutCell2.appendChild(inputRut2);
        row.appendChild(rutCell2);
    }
}

// Función para generar el PDF con la información
function generatePDF() {
    const doc = new jsPDF();
    doc.text('Calendario de Turnos', 20, 20);
    doc.text(document.getElementById("month-name").textContent, 20, 30);
    
    const calendarRows = document.querySelectorAll("#calendar-table tbody tr");
    let y = 40;
    
    calendarRows.forEach((row, index) => {
        const day = row.cells[0].textContent;
        const turno1Name = row.cells[1].querySelector('input').value;
        const turno1Rut = row.cells[2].querySelector('input').value;
        const turno2Name = row.cells[3].querySelector('input').value;
        const turno2Rut = row.cells[4].querySelector('input').value;

        doc.text(`Día ${day}:`, 20, y);
        doc.text(`Turno 1: ${turno1Name} (RUT: ${turno1Rut})`, 20, y + 10);
        doc.text(`Turno 2: ${turno2Name} (RUT: ${turno2Rut})`, 20, y + 20);
        y += 30;
    });

    // Guardar el PDF
    doc.save('calendario_turnos.pdf');
}

// Iniciar la generación del calendario
generateCalendar();


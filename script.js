// Definimos los días de la semana y los meses
const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D', 'L', 'M', 'M', 'J', 'V', 'S', 'D', 'L', 'M', 'M', 'J', 'V', 'S', 'D', 'L', 'M', 'M', 'J', 'V', 'S', 'D', 'L', 'M', 'M'];
const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Lista de personas (nombre, RUT, cargo)
const people = [
    {name: "KAREM SANTIS", rut: "12.837.593-7", cargo: "APR"},
    {name: "MARCIAL SUAREZ", rut: "24.418.305-0", cargo: "MAESTRO OOCC"},
    {name: "RICHARD COLINA", rut: "", cargo: "SUPERVISOR"},
    {name: "ANGEL ESNAIDER ROJAS", rut: "27.985.208-7", cargo: "SOLDADOR"},
    {name: "YORNATAN PEREIRA", rut: "28.169.717-K", cargo: "AYUD OOCC"},
    {name: "JAVIER VALENCIA", rut: "", cargo: "AYUDANTE"},
    {name: "CARLOS GUZMAN", rut: "", cargo: "AYUDANTE"},
    {name: "VALENTIN VALLEJOS", rut: "", cargo: "AYUDANTE"},
    {name: "DICK ASPRILLA", rut: "", cargo: "AYUDANTE"}
];

// Función para generar el calendario
function generateCalendar() {
    const calendarTableBody = document.querySelector("#calendar-table tbody");
    const currentMonth = new Date().getMonth(); // Obtener el mes actual
    const currentYear = new Date().getFullYear();

    // Mostrar el nombre del mes
    const monthName = document.getElementById("month-name");
    monthName.textContent = `${months[currentMonth]} ${currentYear}`;

    // Limpiar cualquier fila existente en el calendario
    calendarTableBody.innerHTML = "";

    // Crear las filas para cada persona
    people.forEach(person => {
        const row = document.createElement("tr");
        
        // Columna Nombre
        const nameCell = document.createElement("td");
        nameCell.textContent = person.name;
        row.appendChild(nameCell);

        // Columna RUT
        const rutCell = document.createElement("td");
        rutCell.textContent = person.rut;
        row.appendChild(rutCell);

        // Columna Cargo
        const cargoCell = document.createElement("td");
        cargoCell.textContent = person.cargo;
        row.appendChild(cargoCell);

        // Crear las celdas para los días del mes
        for (let i = 1; i <= 31; i++) {
            const dayCell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "si";
            dayCell.appendChild(input);
            row.appendChild(dayCell);
        }

        // Agregar la fila al calendario
        calendarTableBody.appendChild(row);
    });
}

// Función para generar el PDF con la información
function generatePDF() {
    const doc = new jsPDF();
    doc.text('Calendario de Turnos', 20, 20);
    doc.text(document.getElementById("month-name").textContent, 20, 30);
    
    const calendarRows = document.querySelectorAll("#calendar-table tbody tr");
    let y = 40;
    
    calendarRows.forEach((row, index) => {
        const name = row.cells[0].textContent;
        const rut = row.cells[1].textContent;
        const cargo = row.cells[2].textContent;
        doc.text(`Nombre: ${name} (RUT: ${rut}, Cargo: ${cargo})`, 20, y);
        y += 10;
        
        const days = [];
        for (let i = 3; i < row.cells.length; i++) {
            days.push(row.cells[i].querySelector('input').value || "-");
        }
        doc.text(`Días: ${days.join(", ")}`, 20, y);
        y += 20;
    });

    // Guardar el PDF
    doc.save('calendario_turnos.pdf');
}

// Iniciar la generación del calendario
generateCalendar();

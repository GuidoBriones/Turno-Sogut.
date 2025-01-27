// Lista de personas inicial (nombre, rut)
let people = [
    { name: "Juan Pérez", rut: "12.345.678-9" },
    { name: "Ana González", rut: "23.456.789-0" }
];

// Días de la semana
const daysOfWeek = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];

// Función para generar el calendario y ajustar los días según el mes seleccionado
function generateCalendar(monthIndex) {
    const monthName = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const monthNameElement = document.getElementById("month-name");
    monthNameElement.innerText = `Mes de ${monthName[monthIndex]} 2024`;

    // Determinar el primer día del mes
    const firstDay = new Date(2024, monthIndex, 1).getDay(); // Primer día del mes (0=domingo, 1=lunes, ...)
    const numDays = new Date(2024, monthIndex + 1, 0).getDate(); // Número de días del mes

    // Generar las cabeceras de los días
    const daysHeader = document.querySelector("#turnos-table thead tr:nth-child(2)");
    daysHeader.innerHTML = "";
    let day = 1;
    
    // Llenar la cabecera con los días de la semana
    for (let i = 0; i < 31; i++) {
        if (day <= numDays) {
            const th = document.createElement("th");
            th.innerText = `${daysOfWeek[(firstDay + i) % 7]} ${day}`;
            daysHeader.appendChild(th);
            day++;
        } else {
            const th = document.createElement("th");
            th.innerText = "";
            daysHeader.appendChild(th);
        }
    }

    // Limpiar las filas anteriores
    const tableBody = document.querySelector("#turnos-table tbody");
    tableBody.innerHTML = "";

    // Generar las filas para cada persona
    people.forEach(person => {
        const row = document.createElement("tr");

        // Columna Nombre
        const nameCell = document.createElement("td");
        nameCell.innerText = person.name;
        row.appendChild(nameCell);

        // Columna RUT
        const rutCell = document.createElement("td");
        rutCell.innerText = person.rut;
        row.appendChild(rutCell);

        // Crear las celdas para los días del mes
        for (let i = 1; i <= 31; i++) {
            if (i <= numDays) {
                const dayCell = document.createElement("td");
                const select = document.createElement("select");
                const options = ["si", "no", "desc"].map(value => {
                    const option = document.createElement("option");
                    option.value = value;
                    option.innerText = value.charAt(0).toUpperCase() + value.slice(1);
                    return option;
                });
                options.forEach(option => select.appendChild(option));
                dayCell.appendChild(select);
                row.appendChild(dayCell);
            } else {
                const dayCell = document.createElement("td");
                row.appendChild(dayCell);
            }
        }

        // Agregar la fila al calendario
        tableBody.appendChild(row);
    });
}

// Función para agregar una persona a la lista
function addPerson() {
    const name = prompt("Ingrese el nombre de la persona:");
    const rut = prompt("Ingrese el RUT de la persona:");

    if (name && rut) {
        people.push({ name: name, rut: rut });
        generateCalendar(document.getElementById("month-select").value);
    }
}

// Función para descargar el calendario en PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Calendario de Turnos", 20, 20);
    doc.autoTable({ html: '#turnos-table' });

    doc.save('calendario_turnos.pdf');
}

// Llamar a la función para generar el calendario al cargar la página
document.getElementById("month-select").addEventListener("change", (e) => {
    generateCalendar(e.target.value);
});

// Generar el calendario para el mes inicial (Enero)
generateCalendar(0);

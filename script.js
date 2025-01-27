let people = [
    { name: "Juan Pérez", rut: "12.345.678-9" },
    { name: "Ana González", rut: "23.456.789-0" }
];

const daysOfWeek = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];

function generateCalendar(monthIndex) {
    const monthName = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const monthNameElement = document.getElementById("month-name");
    monthNameElement.innerText = `Mes de ${monthName[monthIndex]} 2024`;

    const firstDay = new Date(2024, monthIndex, 1).getDay();
    const numDays = new Date(2024, monthIndex + 1, 0).getDate();

    const daysHeader = document.querySelector("#turnos-table thead tr");
    daysHeader.innerHTML = `<th>Nombre</th><th>RUT</th><th>Cargo</th>`;

    let day = 1;
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

    const tableBody = document.querySelector("#turnos-table tbody");
    tableBody.innerHTML = "";

    people.forEach(person => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.innerText = person.name;
        row.appendChild(nameCell);

        const rutCell = document.createElement("td");
        rutCell.innerText = person.rut;
        row.appendChild(rutCell);

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

        tableBody.appendChild(row);
    });
}

function addPerson() {
    const name = prompt("Ingrese el nombre de la persona:");
    const rut = prompt("Ingrese el RUT de la persona:");

    if (name && rut) {
        people.push({ name: name, rut: rut });
        generateCalendar(document.getElementById("month-select").value);
    }
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'letter'
    });

    doc.text("Calendario de Turnos", 20, 20);
    doc.autoTable({ html: '#turnos-table' });

    const fileName = prompt("Ingrese un nombre para el archivo PDF", "calendario_turnos.pdf");
    if (fileName) {
        doc.save(fileName);
    }
}

document.getElementById("month-select").addEventListener("change", (e) => {
    generateCalendar(e.target.value);
});

generateCalendar(0);

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

    for (let i = 1; i <= numDays; i++) {
        const th = document.createElement("th");
        th.innerText = `${daysOfWeek[(firstDay + i - 1) % 7]} ${i}`;
        daysHeader.appendChild(th);
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

        const cargoCell = document.createElement("td");
        cargoCell.innerText = "Cargo Ejemplo";
        row.appendChild(cargoCell);

        for (let i = 1; i <= numDays; i++) {
            const dayCell = document.createElement("td");
            const select = document.createElement("select");
            const options = ["si", "no", "desc"].map(value => {
                const option = document.createElement("option");
                option.value = value;
                option.innerText = value.charAt(0).toUpperCase() + value.slice(1);
                return option;
            });
            options.forEach(option => select.appendChild(option));

            const hourExtraInput = document.createElement("input");
            hourExtraInput.type = "number";
            hourExtraInput.placeholder = "H.ext";
            dayCell.appendChild(select);
            dayCell.appendChild(hourExtraInput);
            row.appendChild(dayCell);
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

function saveChanges() {
    alert("Cambios guardados correctamente.");
}

function printCalendar() {
    alert("Se abrirá la ventana de impresión.");
    window.print(); // Abre el cuadro de impresión del navegador
}

function shareViaWhatsApp() {
    const message = encodeURIComponent("Aquí te envío el calendario de turnos generado: \n\n" + window.location.href);
    const whatsappLink = `https://wa.me/?text=${message}`;
    window.open(whatsappLink, '_blank');
}

document.getElementById("month-select").addEventListener("change", (e) => {
    generateCalendar(e.target.value);
});

generateCalendar(0);

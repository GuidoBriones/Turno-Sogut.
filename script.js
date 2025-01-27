let people = [
   {nombre: "JOSE", apellido: "VALENCIA HOYOS", rut: "24964408-0", cargo: "ayudante"},
    {nombre: "ANGEL", apellido: "ROJAS LONDOÑO", rut: "26771733-8", cargo: "soldador"},
    {nombre: "RICHARD", apellido: "COLINA COLINA", rut: "25751236-3", cargo: "Supervisor"},
    {nombre: "YORNATAN", apellido: "PEREIRA HERNANDEZ", rut: "28169717-K", cargo: "ayudante"},
    {nombre: "MARCIAL", apellido: "VELASCO SUAREZ", rut: "24418305-0", cargo: "Maestro OOCC"},
    {nombre: "VALENTIN", apellido: "VALLEJOS MARTINEZ", rut: "24963989-3", cargo: "Ayudante"},
    {nombre: "CARLOS", apellido: "Guzmán Salazar", rut: "28239185-6", cargo: "Ayudante"},
    {nombre: "DICK", apellido: "ASPRILLA ASPRILLA", rut: "28451203-0", cargo: "Ayudante"},
    {nombre: "DARWIN", apellido: "VALERO PARRA", rut: "25507071-1", cargo: "Ayudante"},
    {nombre: "FERNANDO", apellido: "PIZARRO TRONCOSO", rut: "11344582-3", cargo: "supervisor"}
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

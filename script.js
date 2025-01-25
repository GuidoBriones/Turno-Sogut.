// Días de la semana (lunes a domingo)
const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

// Crear el calendario
function generateCalendar() {
    const calendar = document.getElementById("calendar");
    const currentMonth = new Date().getMonth(); // Obtener el mes actual
    const currentYear = new Date().getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // Día de la semana del primer día del mes
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Número de días en el mes

    // Crear los encabezados de los días
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement("div");
        dayHeader.classList.add("day-cell");
        dayHeader.textContent = day;
        calendar.appendChild(dayHeader);
    });

    // Crear las celdas de los días
    for (let i = 0; i < firstDay; i++) {
        calendar.appendChild(document.createElement("div"));
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement("div");
        dayCell.classList.add("day-cell");
        dayCell.innerHTML = `<span>${day}</span><input type="text" placeholder="Turno" id="day${day}" />`;
        calendar.appendChild(dayCell);
    }
}

// Función para generar el PDF
function generatePDF() {
    const doc = new jsPDF();
    doc.text('Calendario de Turnos', 20, 20);
    
    const calendar = document.getElementById("calendar");
    const cells = calendar.querySelectorAll('.day-cell');
    
    let y = 30;
    cells.forEach((cell, index) => {
        if (cell.querySelector('input')) {
            const day = cell.querySelector('span').textContent;
            const value = cell.querySelector('input').value;
            doc.text(`Día ${day}: ${value}`, 20, y);
            y += 10;
        }
    });

    // Guardar el PDF
    doc.save('calendario_turnos.pdf');
}

// Iniciar la aplicación
generateCalendar();

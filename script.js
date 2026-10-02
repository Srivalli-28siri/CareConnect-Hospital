let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
const today = new Date().toISOString().split("T")[0];

document.getElementById("date").setAttribute("min", today);
document.getElementById("appointmentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const appointment = {
        patientName: document.getElementById("patientName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        doctor: document.getElementById("doctor").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        reason: document.getElementById("reason").value
    };

    appointments.push(appointment);

    localStorage.setItem("appointments", JSON.stringify(appointments));

    document.getElementById("message").textContent =
        "✅ Appointment booked successfully!";

    document.getElementById("message").style.color = "green";

    document.getElementById("appointmentForm").reset();

    displayAppointments();
    updateDashboard();
});


function displayAppointments(list = appointments) {

    const appointmentsList =
        document.getElementById("appointmentsList");

    appointmentsList.innerHTML = "";

    if (list.length === 0) {
        appointmentsList.innerHTML =
            "<p>No appointments found.</p>";
        return;
    }

    list.forEach(function(appointment) {

        const index = appointments.indexOf(appointment);

        const card = document.createElement("div");

        card.className = "appointment-card";

        card.innerHTML = `
            <h3>Appointment</h3>

            <p><strong>Patient:</strong> ${appointment.patientName}</p>

            <p><strong>Email:</strong> ${appointment.email}</p>

            <p><strong>Phone:</strong> ${appointment.phone}</p>

            <p><strong>Doctor:</strong> ${appointment.doctor}</p>

            <p><strong>Date:</strong> ${appointment.date}</p>

            <p><strong>Time:</strong> ${appointment.time}</p>

            <p><strong>Reason:</strong> ${appointment.reason || "Not specified"}</p>

            <button
                class="cancel-btn"
                onclick="cancelAppointment(${index})">
                Cancel Appointment
            </button>
        `;

        appointmentsList.appendChild(card);
    });
}


function searchAppointments() {

    const searchText =
        document.getElementById("searchAppointment").value.toLowerCase();

    const filteredAppointments = appointments.filter(function(appointment) {

        return appointment.patientName
            .toLowerCase()
            .includes(searchText);

    });

    displayAppointments(filteredAppointments);
}
function filterByDoctor() {

    const selectedDoctor =
        document.getElementById("doctorFilter").value;

    if (selectedDoctor === "") {

        displayAppointments(appointments);

        return;
    }

    const filteredAppointments =
        appointments.filter(function(appointment) {

            return appointment.doctor === selectedDoctor;

        });

    displayAppointments(filteredAppointments);
}


function cancelAppointment(index) {

    appointments.splice(index, 1);

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );

   document.getElementById("message").innerHTML = `
    <div class="confirmation-box">
        <h3>✅ Appointment Confirmed!</h3>
        <p>Your appointment has been booked successfully.</p>
        <p><strong>Patient:</strong> ${patientName}</p>
        <p><strong>Doctor:</strong> ${doctor}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
    </div>
`;

    document.getElementById("message").style.color = "red";

    displayAppointments();

    updateDashboard();
}


function updateDashboard() {

    document.getElementById("totalAppointments").textContent =
        appointments.length;

    const uniquePatients = new Set();

    appointments.forEach(function(appointment) {
        uniquePatients.add(appointment.patientName);
    });

    document.getElementById("totalPatients").textContent =
        uniquePatients.size;

    document.getElementById("totalDoctors").textContent =
        "3";
  const upcomingAppointments =
    appointments.filter(function(appointment) {

        return appointment.date >= today;

    });

document.getElementById("upcomingAppointments").textContent =
    upcomingAppointments.length;
  const todayAppointments =
    appointments.filter(function(appointment) {

        return appointment.date === today;

    });

document.getElementById("todayAppointments").textContent =
    todayAppointments.length;
}


displayAppointments();

updateDashboard();
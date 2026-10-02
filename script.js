let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

const today = new Date().toISOString().split("T")[0];

const dateInput = document.getElementById("date");

if (dateInput) {
    dateInput.setAttribute("min", today);
}

const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {
    appointmentForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const patientName = document.getElementById("patientName").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const doctor = document.getElementById("doctor").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const reason = document.getElementById("reason").value;

        const appointment = {
            patientName,
            email,
            phone,
            doctor,
            date,
            time,
            reason
        };

        appointments.push(appointment);

        localStorage.setItem(
            "appointments",
            JSON.stringify(appointments)
        );

        const message = document.getElementById("message");

        if (message) {
            message.innerHTML = `
                <div class="confirmation-box">
                    <h3>✅ Appointment Confirmed!</h3>
                    <p>Your appointment has been booked successfully.</p>
                    <p><strong>Patient:</strong> ${patientName}</p>
                    <p><strong>Doctor:</strong> ${doctor}</p>
                    <p><strong>Date:</strong> ${date}</p>
                    <p><strong>Time:</strong> ${time}</p>
                </div>
            `;

            message.style.color = "green";
        }

        appointmentForm.reset();

        displayAppointments();
        updateDashboard();
    });
}

function displayAppointments(list = appointments) {
    const appointmentsList =
        document.getElementById("appointmentsList");

    if (!appointmentsList) {
        return;
    }

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
            <button class="cancel-btn" onclick="cancelAppointment(${index})">
                Cancel Appointment
            </button>
        `;

        appointmentsList.appendChild(card);
    });
}

function searchAppointments() {
    const searchInput =
        document.getElementById("searchAppointment");

    if (!searchInput) {
        return;
    }

    const searchText =
        searchInput.value.toLowerCase();

    const filteredAppointments =
        appointments.filter(function(appointment) {
            return appointment.patientName
                .toLowerCase()
                .includes(searchText);
        });

    displayAppointments(filteredAppointments);
}

function filterByDoctor() {
    const doctorFilter =
        document.getElementById("doctorFilter");

    if (!doctorFilter) {
        return;
    }

    const selectedDoctor =
        doctorFilter.value;

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
    if (index < 0 || index >= appointments.length) {
        return;
    }

    appointments.splice(index, 1);

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );

    const message =
        document.getElementById("message");

    if (message) {
        message.innerHTML = `
            <div class="confirmation-box">
                <h3>❌ Appointment Cancelled</h3>
                <p>The appointment has been cancelled successfully.</p>
            </div>
        `;

        message.style.color = "red";
    }

    displayAppointments();
    updateDashboard();
}

function updateDashboard() {
    const totalAppointments =
        document.getElementById("totalAppointments");

    if (totalAppointments) {
        totalAppointments.textContent =
            appointments.length;
    }

    const uniquePatients = new Set();

    appointments.forEach(function(appointment) {
        uniquePatients.add(appointment.patientName);
    });

    const totalPatients =
        document.getElementById("totalPatients");

    if (totalPatients) {
        totalPatients.textContent =
            uniquePatients.size;
    }

    const totalDoctors =
        document.getElementById("totalDoctors");

    if (totalDoctors) {
        totalDoctors.textContent = "3";
    }

    const upcomingAppointments =
        appointments.filter(function(appointment) {
            return appointment.date >= today;
        });

    const upcoming =
        document.getElementById("upcomingAppointments");

    if (upcoming) {
        upcoming.textContent =
            upcomingAppointments.length;
    }

    const todayAppointments =
        appointments.filter(function(appointment) {
            return appointment.date === today;
        });

    const todayCount =
        document.getElementById("todayAppointments");

    if (todayCount) {
        todayCount.textContent =
            todayAppointments.length;
    }
}

displayAppointments();
updateDashboard();

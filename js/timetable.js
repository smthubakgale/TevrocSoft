// Timetable Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date to today in filter
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        dateInput.min = new Date().toISOString().split('T')[0];
    }

    // Handle book now buttons
    document.querySelectorAll('.time-slot button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const slot = this.closest('.time-slot');
            const doctor = slot.querySelector('.font-medium').textContent;
            const specialty = slot.querySelector('.text-sm').textContent;
            const time = this.closest('tr').querySelector('td:first-child').textContent;
            
            // Redirect to appointment page with prefilled data
            window.location.href = `../pages/appointment.html?doctor=${encodeURIComponent(doctor)}&specialty=${encodeURIComponent(specialty)}&time=${encodeURIComponent(time)}`;
        });
    });

    // Handle filter form submission
    const filterForm = document.querySelector('.timetable-filter form');
    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real implementation, this would filter the timetable
            alert('Filtering timetable...');
        });
    }
});
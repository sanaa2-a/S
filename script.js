$(document).ready(function() {
    // Load existing employees if backend is implemented
    loadEmployees();

    // Event listener for form submission
    $('#employeeForm').on('submit', function(event) {
        event.preventDefault();
        saveEmployee();
    });
});

function loadEmployees() {
    $.ajax({
        url: 'http://localhost:8080/SupTechBackEnd/employes',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            var tableBody = $('#employeeTable tbody');
            tableBody.empty();
            data.forEach(function(employee) {
                addEmployeeToTable(employee);
            });
        }
    });
}

function saveEmployee() {
    var employee = {
        nom: $('#nom').val(),
        prenom: $('#prenom').val(),
        telephone: $('#telephone').val(),
        departement: $('#departement').val()
    };

    // Simulate adding employee to backend by directly updating the table
    addEmployeeToTable(employee);

    // If backend integration is ready, uncomment below ajax call
    $.ajax({
        url: 'http://localhost:8080/SupTechBackEnd/employes',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(employee),
        success: function() {
            // Optionally reload employees from backend
            loadEmployees();
        }
    });

    // Clear form fields
    $('#employeeForm')[0].reset();
}

function addEmployeeToTable(employee) {
    var tableBody = $('#employeeTable tbody');
    var row = $('<tr>');
    row.append($('<td>').text(employee.nom));
    row.append($('<td>').text(employee.prenom));
    row.append($('<td>').text(employee.telephone));
    row.append($('<td>').text(employee.departement));
    var actions = $('<td>');
    actions.append('<button class="edit" onclick="editEmployee(this)">Modifier</button>');
    actions.append('<button class="delete" onclick="deleteEmployee(this)">Supprimer</button>');
    row.append(actions);
    tableBody.append(row);
}

function editEmployee(button) {
    // Logic to edit the employee details
    var row = $(button).closest('tr');
    var nom = row.find('td:nth-child(1)').text();
    var prenom = row.find('td:nth-child(2)').text();
    var telephone = row.find('td:nth-child(3)').text();
    var departement = row.find('td:nth-child(4)').text();

    $('#nom').val(nom);
    $('#prenom').val(prenom);
    $('#telephone').val(telephone);
    $('#departement').val(departement);

    // Remove the row from the table
    row.remove();
}

function deleteEmployee(button) {
    var row = $(button).closest('tr');
    var nom = row.find('td:nth-child(1)').text();
    var prenom = row.find('td:nth-child(2)').text();

    // Remove the row from the table
    row.remove();

    // If backend integration is ready, uncomment below ajax call
    $.ajax({
        url: `http://localhost:8080/SupTechBackEnd/employes?nom=${nom}&prenom=${prenom}`,
        method: 'DELETE',
        success: function() {
            // Optionally reload employees from backend
            loadEmployees();
        }
    });
}

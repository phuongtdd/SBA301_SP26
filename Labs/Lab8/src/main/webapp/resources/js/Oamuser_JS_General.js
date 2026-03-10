function Oamuser_Js_getRowSelected() {
    // Get all radio buttons in the table
    const radios = document.getElementsByName('Oamuser_InGroup1');
    let selectedRow = null;

    for (const radio of radios) {
        if (radio.checked) {
            // Found the checked radio, get the parent row
            selectedRow = radio.closest('tr');
            break;
        }
    }

    if (selectedRow) {
        // Extract data from the row cells
        // Cell layout: Choose(0), Id(1), Email(2), Password(3), First Name(4), Last Name(5), Marks(6)
        const id = selectedRow.cells[1].innerText.trim();
        const email = selectedRow.cells[2].innerText.trim();
        const password = selectedRow.cells[3].innerText.trim();
        const firstName = selectedRow.cells[4].innerText.trim();
        const lastName = selectedRow.cells[5].innerText.trim();
        const marks = selectedRow.cells[6].innerText.trim();

        // Populate the form fields
        document.getElementById('txtId').value = id;
        document.getElementById('txtEmail').value = email;
        document.getElementById('txtPassword').value = password;
        document.getElementById('txtFirstName').value = firstName;
        document.getElementById('txtLastName').value = lastName;
        document.getElementById('txtMark').value = marks;
    }
}

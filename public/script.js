document.getElementById('add_btn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission

    const categorySelect = document.getElementById('category_select').value;
    const amountInput = document.getElementById('amount_input').value;
    const infoInput = document.getElementById('info').value;
    const dateInput = document.getElementById('date_input').value;
    const messageDiv = document.getElementById('message');

    if (!categorySelect) {
        alert('Please select a category');
        return;
    }
    if (!amountInput || isNaN(amountInput) || amountInput <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (!infoInput) {
        alert('Please enter valid info');
        return;
    }
    if (!dateInput) {
        alert('Please select a date');
        return;
    }

    // Add new row to the table
    const expenseTableBody = document.getElementById('expense-table-body');
    const newRow = expenseTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const infoCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    categoryCell.textContent = categorySelect;
    amountCell.textContent = amountInput;
    infoCell.textContent = infoInput;
    dateCell.textContent = dateInput;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        expenseTableBody.removeChild(newRow);

        // Update total amount
        let totalAmount = parseFloat(document.getElementById('total-amount').textContent) || 0;
        if (categorySelect === 'Income') {
            totalAmount -= parseFloat(amountInput);
        } else if (categorySelect === 'Expense') {
            totalAmount += parseFloat(amountInput);
        }
        document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
    });

    deleteCell.appendChild(deleteBtn);

    // Update total amount
    const totalAmountCell = document.getElementById('total-amount');
    let totalAmount = parseFloat(totalAmountCell.textContent) || 0;
    if (categorySelect === 'Income') {
        totalAmount += parseFloat(amountInput);
    } else if (categorySelect === 'Expense') {
        totalAmount -= parseFloat(amountInput);
    }
    totalAmountCell.textContent = totalAmount.toFixed(2);

    // Send data to server
    fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            category_select: categorySelect,
            amount_input: amountInput,
            info: infoInput,
            date_input: dateInput
        })
    })
    .then(response => response.text())
    .then(data => {
        messageDiv.textContent = data;
    })
    .catch(error => console.error('Error:', error));
});

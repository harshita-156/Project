let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

let editingIndex = -1; 

function renderExpenses() {
  expenseList.innerHTML = ''; 
  let total = 0;

  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>Expense:</strong> ${expense.name} <br>
      <strong>Amount:</strong> $${expense.amount} <br>
      <strong>Category:</strong> ${expense.category} <br>
      <strong>Date:</strong> ${expense.date || 'No date'} <br>
      <button class="edit-btn" onclick="editExpense(${index})">Edit</button>
      <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
    `;
    expenseList.appendChild(li);
    total += parseFloat(expense.amount);
  });

  totalAmount.textContent = total.toFixed(2);
}


expenseForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('expense-name').value;
  const amount = document.getElementById('expense-amount').value;
  const category = document.getElementById('expense-category').value; 
  const date = document.getElementById('expense-date').value || new Date().toISOString().split('T')[0];

  if (name === '' || amount <= 0 || category === '') {
    alert('Please fill in all required fields correctly.');
    return;
  }
    const dateParts = date.split('-'); 
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; 
    const day = parseInt(dateParts[2]);
  
    const enteredDate = new Date(year, month, day);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
  
    if (
      enteredDate.getFullYear() !== year ||
      enteredDate.getMonth() !== month ||
      enteredDate.getDate() !== day ||
      enteredDate > today 
    ) {
      alert('Please enter a valid date (past or today only).');
      return;
    }
  const newExpense = { name, amount, category, date }; 
  
  if (editingIndex >= 0) {
    expenses[editingIndex] = newExpense;
    editingIndex = -1; 
  } else {
    expenses.push(newExpense);
  }
  
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
  expenseForm.reset();
});

function editExpense(index) {
  const expense = expenses[index];
  document.getElementById('expense-name').value = expense.name;
  document.getElementById('expense-amount').value = expense.amount;
  document.getElementById('expense-category').value = expense.category;
  document.getElementById('expense-date').value = expense.date;

  editingIndex = index; 
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
}

renderExpenses();


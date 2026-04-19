
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let chart;
let chartVisible = false;

const list = document.getElementById("list");
const balance = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");

function save() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function render() {
  list.innerHTML = "";

  let income = 0;
  let expense = 0;

  transactions.forEach(t => {
    if (t.amount >= 0) income += t.amount;
    else expense += t.amount;

    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <div>
        <strong>${t.desc}</strong><br>
        <small>${t.category} • ${t.date}</small>
      </div>

      <div>
        R$ ${t.amount}
        <span class="delete" onclick="deleteTransaction(${t.id})">🗑️</span>
      </div>
    `;

    list.appendChild(div);
  });

  const total = income + expense;

  incomeEl.innerText = "R$ " + income;
  expenseEl.innerText = "R$ " + Math.abs(expense);
  balance.innerText = "R$ " + total;

  if (chartVisible) {
    updateChart(income, expense);
  }
}

function addTransaction() {
  const desc = document.getElementById("desc").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  if (!desc || isNaN(amount)) return;

  transactions.unshift({
    id: Date.now(),
    desc,
    amount,
    category,
    date
  });

  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";

  save();
  render();
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  save();
  render();
}

/* ATUALIZA DADOS */
function updateChartPreview() {
  let income = 0;
  let expense = 0;

  transactions.forEach(t => {
    if (t.amount >= 0) income += t.amount;
    else expense += t.amount;
  });

  updateChart(income, expense);
}

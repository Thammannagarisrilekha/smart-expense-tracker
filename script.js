let form =
document.getElementById("expense-form");

let text =
document.getElementById("text");

let amount =
document.getElementById("amount");

let category =
document.getElementById("category");

let type =
document.getElementById("type");

let balance =
document.getElementById("balance");

let income =
document.getElementById("income");

let expense =
document.getElementById("expense");

let transactionList =
document.getElementById("transaction-list");

let progress =
document.getElementById("progress");

let progressText =
document.getElementById("progress-text");

let totalTransactions =
document.getElementById("total-transactions");

let highestExpense =
document.getElementById("highest-expense");

let dashboardBtn =
document.getElementById("dashboard-btn");

let expenseBtn =
document.getElementById("expense-btn");

let analyticsBtn =
document.getElementById("analytics-btn");

let themeBtn =
document.getElementById("theme-btn");

let analyticsSection =
document.querySelector(".analytics-section");

let expenseSummary =
document.querySelector(".expense-summary");

let transactions = [];

analyticsSection.style.display = "none";

form.addEventListener(
    "submit",
    addTransaction
);

function addTransaction(e){

    e.preventDefault();

    if(
        text.value === "" ||
        amount.value === ""
    ){

        alert("Please fill all fields");

        return;
    }

    let transaction = {

        id:Date.now(),

        text:text.value,

        amount:Number(amount.value),

        category:category.value,

        type:type.value
    };

    transactions.push(transaction);

    updateScreen();

    form.reset();
}

function updateScreen(){

    transactionList.innerHTML = "";

    let incomeTotal = 0;

    let expenseTotal = 0;

    let highest = 0;

    for(
        let i = 0;
        i < transactions.length;
        i++
    ){

        let transaction =
        transactions[i];

        let li =
        document.createElement("li");

        if(transaction.type === "income"){

            li.classList.add(
                "income-item"
            );

            incomeTotal =
            incomeTotal +
            transaction.amount;

        }

        else{

            li.classList.add(
                "expense-item"
            );

            expenseTotal =
            expenseTotal +
            transaction.amount;

            if(
                transaction.amount > highest
            ){

                highest =
                transaction.amount;
            }
        }

        li.innerHTML = `

            <div>

                <h3>${transaction.text}</h3>

                <p>${transaction.category}</p>

            </div>

            <div>

                ₹${transaction.amount}

            </div>

            <button
            class="delete-btn"
            onclick="deleteTransaction(${transaction.id})">

            X

            </button>

        `;

        transactionList.appendChild(li);
    }

    income.innerText =
    "₹" + incomeTotal;

    expense.innerText =
    "₹" + expenseTotal;

    balance.innerText =
    "₹" + (incomeTotal - expenseTotal);

    totalTransactions.innerText =
    transactions.length;

    highestExpense.innerText =
    "₹" + highest;

    updateProgress(
        incomeTotal,
        expenseTotal
    );
}

window.deleteTransaction =
function(id){

    let newTransactions = [];

    for(
        let i = 0;
        i < transactions.length;
        i++
    ){

        if(
            transactions[i].id !== id
        ){

            newTransactions.push(
                transactions[i]
            );
        }
    }

    transactions = newTransactions;

    updateScreen();
}

function updateProgress(
    incomeTotal,
    expenseTotal
){

    if(incomeTotal === 0){

        progress.style.width =
        "0%";

        progressText.innerText =
        "0% Used";

        return;
    }

    let percent =

    (expenseTotal / incomeTotal)
    * 100;

    if(percent > 100){

        percent = 100;
    }

    progress.style.width =
    percent + "%";

    progressText.innerText =
    Math.floor(percent)
    + "% Used";
}

function createChart(){

    let food = 0;
    let travel = 0;
    let shopping = 0;
    let bills = 0;

    for(
        let i = 0;
        i < transactions.length;
        i++
    ){

        let transaction =
        transactions[i];

        if(
            transaction.type === "expense"
        ){

            if(
                transaction.category === "Food"
            ){
                food += transaction.amount;
            }

            if(
                transaction.category === "Travel"
            ){
                travel += transaction.amount;
            }

            if(
                transaction.category === "Shopping"
            ){
                shopping += transaction.amount;
            }

            if(
                transaction.category === "Bills"
            ){
                bills += transaction.amount;
            }

        }
    }

    let chartExist =
    Chart.getChart(
        "expenseChart"
    );

    if(chartExist){
        chartExist.destroy();
    }

    let ctx =
    document.getElementById(
        "expenseChart"
    );

    new Chart(ctx, {

        type:"pie",

        data:{

            labels:[
                "Food",
                "Travel",
                "Shopping",
                "Bills"
            ],

            datasets:[{

                data:[
                    food,
                    travel,
                    shopping,
                    bills
                ],

                backgroundColor:[
                    "#38bdf8",
                    "#10b981",
                    "#f59e0b",
                    "#ef4444"
                ]

            }]

        }

    });
}

dashboardBtn.addEventListener(
    "click",
    function(){

        dashboardBtn.classList.add(
            "active"
        );

        expenseBtn.classList.remove(
            "active"
        );

        analyticsBtn.classList.remove(
            "active"
        );

        document.querySelector(
            ".form-section"
        ).style.display = "block";

        document.querySelector(
            ".history-section"
        ).style.display = "block";

        expenseSummary.style.display =
        "block";

        analyticsSection.style.display =
        "none";
    }
);

expenseBtn.addEventListener(
    "click",
    function(){

        dashboardBtn.classList.remove(
            "active"
        );

        expenseBtn.classList.add(
            "active"
        );

        analyticsBtn.classList.remove(
            "active"
        );

        document.querySelector(
            ".form-section"
        ).style.display = "none";

        document.querySelector(
            ".history-section"
        ).style.display = "block";

        expenseSummary.style.display =
        "none";

        analyticsSection.style.display =
        "none";
    }
);

analyticsBtn.addEventListener(
    "click",
    function(){

        dashboardBtn.classList.remove(
            "active"
        );

        expenseBtn.classList.remove(
            "active"
        );

        analyticsBtn.classList.add(
            "active"
        );

        document.querySelector(
            ".form-section"
        ).style.display = "none";

        document.querySelector(
            ".history-section"
        ).style.display = "none";

        expenseSummary.style.display =
        "none";

        analyticsSection.style.display =
        "block";

        createChart();
    }
);

themeBtn.addEventListener(
    "click",
    function(){

        document.body.classList.toggle(
            "light-mode"
        );

    }
);
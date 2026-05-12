const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", function () {

    alert("Welcome to your Career Dashboard!");

});



const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

});



const streakCount = document.getElementById("streakCount");

const increaseBtn = document.getElementById("increaseBtn");

let streak = 0;



const savedStreak = localStorage.getItem("codingStreak");

if (savedStreak) {

    streak = savedStreak;

    streakCount.textContent = streak + " Days";

}



increaseBtn.addEventListener("click", function () {

    streak++;

    streakCount.textContent = streak + " Days";

    localStorage.setItem("codingStreak", streak);

});



const companyInput = document.getElementById("companyInput");

const addCompanyBtn = document.getElementById("addCompanyBtn");

const companyList = document.getElementById("companyList");



addCompanyBtn.addEventListener("click", function () {

    const companyName = companyInput.value;

    if (companyName === "") {

        alert("Please enter company name");

        return;
    }


    const li = document.createElement("li");

    li.textContent = companyName;

    companyList.appendChild(li);

    companyInput.value = "";

});



const taskInput = document.getElementById("taskInput");

const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");



addTaskBtn.addEventListener("click", function () {

    const taskText = taskInput.value;

    if (taskText === "") {

        alert("Please enter task");

        return;
    }


    const li = document.createElement("li");

    li.textContent = taskText;

    taskList.appendChild(li);

    taskInput.value = "";

});
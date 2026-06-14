// ================= TIMER =================

let time = 1500; // 25 min
let timer = null;

const music = document.getElementById("music");
const alarm = document.getElementById("alarm");

function showTime() {
    let min = Math.floor(time / 60);
    let sec = time % 60;

    document.getElementById("time").innerText =
        `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

function start() {
    if (timer) return;

    timer = setInterval(() => {
        if (time > 0) {
            time--;
            showTime();
        } else {
            clearInterval(timer);
            timer = null;

            if (alarm) {
                alarm.play();
            }

            alert("Pomodoro Session Complete!");
        }
    }, 1000);
}

function pause() {
    clearInterval(timer);
    timer = null;
}

function reset() {
    clearInterval(timer);
    timer = null;

    time = 1500;
    showTime();
}

function toggleMusic() {
    if (!music) return;

    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}

// ================= TASK MANAGER =================

const taskInput = document.getElementById("taskinput");

function saveTasks() {
    const data = {
        pending: document.getElementById("pending").innerHTML,
        progress: document.getElementById("progress").innerHTML,
        done: document.getElementById("done").innerHTML
    };

    localStorage.setItem("tasks", JSON.stringify(data));
}

function add() {
    const txt = taskInput.value.trim();

    if (txt === "") {
        alert("Enter a task");
        return;
    }

    const task = makeTask(txt);
    document.getElementById("pending").appendChild(task);

    taskInput.value = "";
    saveTasks();
}

function makeTask(txt) {
    const div = document.createElement("div");
    div.className = "task";

    const span = document.createElement("span");
    span.innerText = txt;

    const btns = document.createElement("div");
    btns.className = "btns";

    // Forward Button
    const next = document.createElement("button");
    next.innerText = "➡";

    next.onclick = () => {
        const parent = div.parentElement.id;

        if (parent === "pending") {
            document.getElementById("progress").appendChild(div);
        } else if (parent === "progress") {
            document.getElementById("done").appendChild(div);
        }

        saveTasks();
    };

    // Back Button
    const back = document.createElement("button");
    back.innerText = "⬅";

    back.onclick = () => {
        const parent = div.parentElement.id;

        if (parent === "done") {
            document.getElementById("progress").appendChild(div);
        } else if (parent === "progress") {
            document.getElementById("pending").appendChild(div);
        }

        saveTasks();
    };

    // Edit Button
    const edit = document.createElement("button");
    edit.innerText = "✏";

    edit.onclick = () => {
        const newText = prompt("Edit Task", span.innerText);

        if (newText && newText.trim() !== "") {
            span.innerText = newText.trim();
            saveTasks();
        }
    };

    // Delete Button
    const del = document.createElement("button");
    del.innerText = "🗑";

    del.onclick = () => {
        div.remove();
        saveTasks();
    };

    btns.append(back, next, edit, del);

    div.appendChild(span);
    div.appendChild(btns);

    return div;
}

// ================= INITIALIZE =================

showTime();

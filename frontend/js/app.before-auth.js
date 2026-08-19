const API = "https://task-management-dab.orangeriver-39fedb85.uaenorth.azurecontainerapps.io/api";

let tasks = [];
let users = [];
let comments = [];


// ===============================
// API HELPER
// ===============================

async function apiRequest(endpoint, options = {}) {

    const response = await fetch(API + endpoint, {
        headers: {
            "Content-Type": "application/json"
        },
        ...options
    });

    if (!response.ok) {

        let message = `Request failed: ${response.status}`;

        try {
            const error = await response.json();
            message = error.message || JSON.stringify(error);
        } catch {}

        throw new Error(message);
    }

    return response.json();
}


// ===============================
// LOAD DATA
// ===============================

async function loadUsers() {

    const data = await apiRequest("/Users");

    users = data.value || [];

    renderUsers();
    updateDashboard();
}


async function loadTasks() {

    const data = await apiRequest("/Tasks");

    tasks = data.value || [];

    renderTasks();
    renderRecentTasks();
    updateDashboard();
}


async function loadComments() {

    const data = await apiRequest("/Comments");

    comments = data.value || [];

    renderComments();
    updateDashboard();
}


async function loadAllData() {

    try {

        await Promise.all([
            loadUsers(),
            loadTasks(),
            loadComments()
        ]);

        showToast("Data refreshed successfully");

    } catch (error) {

        console.error(error);

        showToast("API connection failed");

    }
}


// ===============================
// DASHBOARD
// ===============================

function updateDashboard() {

    const total = tasks.length;

    const pending = tasks.filter(
        task => task.Status === "Pending"
    ).length;

    const progress = tasks.filter(
        task => task.Status === "In Progress"
    ).length;

    const completed = tasks.filter(
        task => task.Status === "Completed"
    ).length;

    document.getElementById("total-tasks").textContent = total;
    document.getElementById("pending-tasks").textContent = pending;
    document.getElementById("progress-tasks").textContent = progress;
    document.getElementById("completed-tasks").textContent = completed;

    document.getElementById("overview-users").textContent = users.length;
    document.getElementById("overview-tasks").textContent = tasks.length;
    document.getElementById("overview-comments").textContent = comments.length;
}


// ===============================
// NAVIGATION
// ===============================

document.querySelectorAll(".nav-item").forEach(button => {

    button.addEventListener("click", () => {

        showSection(button.dataset.section);

    });

});


function showSection(section) {

    document.querySelectorAll(".section").forEach(item => {
        item.classList.remove("active");
    });

    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
    });

    document.getElementById(section + "-section")
        .classList.add("active");

    const button = document.querySelector(
        `.nav-item[data-section="${section}"]`
    );

    if (button) {
        button.classList.add("active");
    }

    const titles = {
        dashboard: "Dashboard",
        tasks: "Tasks",
        users: "Users",
        comments: "Comments"
    };

    document.getElementById("page-title").textContent =
        titles[section] || "Dashboard";
}


// ===============================
// TASKS
// ===============================

function renderTasks() {

    const tbody = document.getElementById("tasks-table");

    tbody.innerHTML = "";

    if (tasks.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="7">No tasks found.</td>
            </tr>
        `;

        return;
    }

    tasks.forEach(task => {

        const user = users.find(
            u => Number(u.Id) === Number(task.UserId)
        );

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${task.Id}</td>

            <td>
                <strong>${escapeHtml(task.Title || "")}</strong>
            </td>

            <td>
                ${escapeHtml(user?.Name || `User ${task.UserId}`)}
            </td>

            <td>
                <span class="status ${statusClass(task.Status)}">
                    ${escapeHtml(task.Status || "")}
                </span>
            </td>

            <td>
                ${escapeHtml(task.Description || "-")}
            </td>

            <td>
                ${formatDate(task.CreatedAt)}
            </td>

            <td>
                <button
                    class="action-btn action-delete"
                    onclick="deleteTask(${task.Id})">
                    Delete
                </button>
            </td>
        `;

        tbody.appendChild(row);

    });
}


function renderRecentTasks() {

    const tbody = document.getElementById("recent-tasks");

    tbody.innerHTML = "";

    tasks.slice(0, 5).forEach(task => {

        const user = users.find(
            u => Number(u.Id) === Number(task.UserId)
        );

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${task.Id}</td>

            <td>${escapeHtml(task.Title || "")}</td>

            <td>${escapeHtml(user?.Name || `User ${task.UserId}`)}</td>

            <td>
                <span class="status ${statusClass(task.Status)}">
                    ${escapeHtml(task.Status || "")}
                </span>
            </td>
        `;

        tbody.appendChild(row);

    });
}


function filterTasks() {

    const search = document
        .getElementById("task-search")
        .value
        .toLowerCase();

    const status = document
        .getElementById("status-filter")
        .value;

    const filtered = tasks.filter(task => {

        const matchesSearch =
            !search ||
            (task.Title || "").toLowerCase().includes(search) ||
            (task.Description || "").toLowerCase().includes(search);

        const matchesStatus =
            !status ||
            task.Status === status;

        return matchesSearch && matchesStatus;

    });

    renderFilteredTasks(filtered);
}


function renderFilteredTasks(data) {

    const tbody = document.getElementById("tasks-table");

    tbody.innerHTML = "";

    data.forEach(task => {

        const user = users.find(
            u => Number(u.Id) === Number(task.UserId)
        );

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${task.Id}</td>
            <td>${escapeHtml(task.Title || "")}</td>
            <td>${escapeHtml(user?.Name || `User ${task.UserId}`)}</td>

            <td>
                <span class="status ${statusClass(task.Status)}">
                    ${escapeHtml(task.Status || "")}
                </span>
            </td>

            <td>${escapeHtml(task.Description || "-")}</td>

            <td>${formatDate(task.CreatedAt)}</td>

            <td>
                <button
                    class="action-btn action-delete"
                    onclick="deleteTask(${task.Id})">
                    Delete
                </button>
            </td>
        `;

        tbody.appendChild(row);

    });
}


// ===============================
// CREATE TASK
// ===============================

function openTaskModal() {

    document.getElementById("task-form").reset();

    document.getElementById("task-modal-title").textContent =
        "Add Task";

    document.getElementById("task-modal").classList.add("show");
}


document.getElementById("task-form")
    .addEventListener("submit", async event => {

        event.preventDefault();

        const body = {

            Title: document.getElementById("task-title").value,

            Description:
                document.getElementById("task-description").value,

            Status:
                document.getElementById("task-status").value,

            UserId:
                Number(document.getElementById("task-user-id").value)

        };

        try {

            await apiRequest("/Tasks", {

                method: "POST",

                body: JSON.stringify(body)

            });

            closeModal("task-modal");

            showToast("Task created successfully");

            await loadTasks();

        } catch (error) {

            console.error(error);

            showToast("Failed to create task");

        }

    });


// ===============================
// DELETE TASK
// ===============================

async function deleteTask(id) {

    if (!confirm(`Delete task #${id}?`)) {
        return;
    }

    try {

        await apiRequest(`/Tasks/${id}`, {
            method: "DELETE"
        });

        showToast("Task deleted");

        await loadTasks();

    } catch (error) {

        console.error(error);

        showToast("Failed to delete task");

    }
}


// ===============================
// USERS
// ===============================

function renderUsers() {

    const tbody = document.getElementById("users-table");

    tbody.innerHTML = "";

    users.forEach(user => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${user.Id}</td>
            <td>${escapeHtml(user.Name || "")}</td>
            <td>${escapeHtml(user.Email || "")}</td>
            <td>${formatDate(user.CreatedAt)}</td>

            <td>
                <button
                    class="action-btn action-delete"
                    onclick="deleteUser(${user.Id})">
                    Delete
                </button>
            </td>
        `;

        tbody.appendChild(row);

    });
}


function openUserModal() {

    document.getElementById("user-form").reset();

    document.getElementById("user-modal")
        .classList.add("show");
}


document.getElementById("user-form")
    .addEventListener("submit", async event => {

        event.preventDefault();

        const body = {

            Name: document.getElementById("user-name").value,

            Email: document.getElementById("user-email").value

        };

        try {

            await apiRequest("/Users", {

                method: "POST",

                body: JSON.stringify(body)

            });

            closeModal("user-modal");

            showToast("User created successfully");

            await loadUsers();

        } catch (error) {

            console.error(error);

            showToast("Failed to create user");

        }

    });


async function deleteUser(id) {

    if (!confirm(`Delete user #${id}?`)) {
        return;
    }

    try {

        await apiRequest(`/Users/${id}`, {
            method: "DELETE"
        });

        showToast("User deleted");

        await loadUsers();

    } catch (error) {

        console.error(error);

        showToast("Failed to delete user");

    }
}


// ===============================
// COMMENTS
// ===============================

function renderComments() {

    const tbody = document.getElementById("comments-table");

    tbody.innerHTML = "";

    comments.forEach(comment => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${comment.Id}</td>

            <td>${comment.TaskId}</td>

            <td>${comment.UserId}</td>

            <td>${escapeHtml(comment.CommentText || "")}</td>

            <td>${formatDate(comment.CreatedAt)}</td>

            <td>

                <button
                    class="action-btn action-delete"
                    onclick="deleteComment(${comment.Id})">
                    Delete
                </button>

            </td>

        `;

        tbody.appendChild(row);

    });
}


function openCommentModal() {

    document.getElementById("comment-form").reset();

    document.getElementById("comment-modal")
        .classList.add("show");
}


document.getElementById("comment-form")
    .addEventListener("submit", async event => {

        event.preventDefault();

        const body = {

            TaskId:
                Number(document.getElementById("comment-task-id").value),

            UserId:
                Number(document.getElementById("comment-user-id").value),

            CommentText:
                document.getElementById("comment-text").value

        };

        try {

            await apiRequest("/Comments", {

                method: "POST",

                body: JSON.stringify(body)

            });

            closeModal("comment-modal");

            showToast("Comment added successfully");

            await loadComments();

        } catch (error) {

            console.error(error);

            showToast("Failed to add comment");

        }

    });


async function deleteComment(id) {

    if (!confirm(`Delete comment #${id}?`)) {
        return;
    }

    try {

        await apiRequest(`/Comments/${id}`, {
            method: "DELETE"
        });

        showToast("Comment deleted");

        await loadComments();

    } catch (error) {

        console.error(error);

        showToast("Failed to delete comment");

    }
}


// ===============================
// UTILITIES
// ===============================

function closeModal(id) {

    document.getElementById(id)
        .classList.remove("show");

}


function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);

}


function statusClass(status) {

    return (status || "")
        .replace(/\s+/g, "-");

}


function formatDate(value) {

    if (!value) {
        return "-";
    }

    return new Date(value).toLocaleDateString();

}


function escapeHtml(value) {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

}


// ===============================
// INITIAL LOAD
// ===============================

loadAllData();

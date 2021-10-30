document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));   
});

document.querySelector('table tbody').addEventListener('click', function(event) {
    if (event.target.className === "delete-row-btn") {
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "edit-row-btn") {
        handleEditRow(event.target.dataset.id);
    }
});

const updateBtn = document.querySelector('#update-row-btn');
const searchBtn = document.querySelector('#search-btn');

searchBtn.onclick = function() {
    const searchValue = document.querySelector('#search-input').value;

    fetch('http://localhost:5000/search/' + searchValue)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

function deleteRowById(id) {
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}

function handleEditRow(id) {
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
    document.querySelector('#update-course-name').dataset.id = id;
}

updateBtn.onclick = function() {
    const nameInput = document.querySelector('#update-course-name')
    const idInput = document.querySelector('#update-course-name')
    const deptInput = document.querySelector('input[name="update-deptName"]:checked');
    const instituteInput = document.querySelectorAll('input[name="update-instituteName"]:checked');
    const universityInput = document.querySelector('#update-course-uni');



    fetch('http://localhost:5000/update', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: updateNameInput.dataset.id,
            name: updateNameInput.value
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    })
}


const addBtn = document.querySelector('#add-course-btn');

addBtn.onclick = function () {
    const nameInput = document.querySelector('#course-name')
    const idInput = document.querySelector('#course-id')
    const deptInput = document.querySelector('input[name="deptName"]:checked');
    const instituteInput = document.querySelectorAll('input[name="instituteName"]:checked');
    const universityInput = document.querySelector('#course-uni');

    let institute = ''
    for(let node of instituteInput){
        institute += `${node.value}, `
        // node.checked = false
    }

    let course = {
        id : idInput.value,
        name: nameInput.value,
        deptName: deptInput? deptInput.value : "",
        instituteName: institute.slice(0,-2),
        universityName: universityInput.value
    }

    // nameInput.value = "";
    // idInput.value = "";
    // deptInput.checked = false;
    // universityInput.value = "";

    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(course)
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
}

function insertRowIntoTable(data) {
    console.log(data);
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            tableHtml += `<td>${data[key]}</td>`;
        }
    }

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;

    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function (course) {
        tableHtml += "<tr>";
        tableHtml += `<td>${course.id}</td>`;
        tableHtml += `<td>${course.name}</td>`;
        tableHtml += `<td>${course.deptName}</td>`;
        tableHtml += `<td>${course.instituteName}</td>`;
        tableHtml += `<td>${course.universityName}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${course.id}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${course.id}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;

  
}
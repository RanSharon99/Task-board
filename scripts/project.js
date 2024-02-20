timeLimit();

function addNotesTask() {
    event.preventDefault()
    let valueText = document.getElementById("divInputText").value;
    let valueDate = formatDate(document.getElementById("special_input_date").value);
    let valueClock = document.getElementById("special_input_clock").value;
    if (valueText === "" || valueDate === "" || valueClock === "") {
        showErrorAlert("Please fill all the required fields")
    } else {
        let note = {
            text: valueText,
            date: valueDate,
            clock: valueClock,
            isNewNote: true
        };

        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));

        displayNotes();
        clearFields();
    }
}

function displayNotes() {

    let notesContainer = document.getElementById("notes-container");
    notesContainer.innerHTML = '';

    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach((note, index) => {
        let noteContainer = document.createElement("div");
        noteContainer.className = "note";

        let textAboveImage = document.createElement("span");
        textAboveImage.className = "text-above-image";
        textAboveImage.textContent = note.text;

        noteContainer.appendChild(textAboveImage);

        let existingImg = document.createElement("img");
        existingImg.src = "assets\\images\\note.png";

        if (note.isNewNote === true)
            existingImg.className = "fadeInAnimation";

        noteContainer.appendChild(existingImg);

        let textDate = document.createElement("span");
        textDate.className = "textDateClass";
        textDate.textContent = note.date;
        noteContainer.appendChild(textDate);

        let textClock = document.createElement("span");
        textClock.className = "textClockClass";
        textClock.textContent = note.clock;
        noteContainer.appendChild(textClock);

        let btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn-css btn-close";
        btn.setAttribute("aria-label", "Close");
        btn.addEventListener('click', () => {
            deleteNoteAndContainer(index);
        });
        noteContainer.appendChild(btn);
        notesContainer.appendChild(noteContainer);

        setNewNoteStatus(index, false);
    });
};

function setNewNoteStatus(noteIndex, isNewNote) {

    let notes = JSON.parse(localStorage.getItem('notes'));
    if (notes && notes.length > noteIndex && noteIndex >= 0) {

        notes[noteIndex].isNewNote = isNewNote;
        localStorage.setItem('notes', []);
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}

function deleteNoteAndContainer(index) {

    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

function clearFields() {
    document.getElementById("divInputText").value = "";
    document.getElementById("special_input_date").value = "";
    document.getElementById("special_input_clock").value = "";
}

function formatDate(date) {
    let dateObj = new Date(date);
    let yyyy = dateObj.getFullYear();
    let mm = dateObj.getMonth() + 1;
    let dd = dateObj.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    let formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday;
}

function timeLimit() {
    let today = new Date();
    let formattedDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    document.getElementById('special_input_date').setAttribute('min', formattedDate);
}

function showErrorAlert(message) {
    var alertElement = document.createElement("div");
    alertElement.classList.add("alert", "alert-danger", "mt-3");
    alertElement.setAttribute("role", "alert");
    alertElement.style.textAlign = "center";
    alertElement.textContent = message;
    document.body.insertBefore(alertElement, document.body.firstChild);
    setTimeout(function () {
        alertElement.remove();
    }, 5000);
}
window.onload = displayNotes;


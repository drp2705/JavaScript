class PlantReportHandler {

  constructor() {
    this.form = document.getElementById("plantForm");
    this.messageBox = document.getElementById("message");

    this.form.addEventListener("submit",
      (e) => this.handleSubmit(e));
  }

  // Validate Form
  validateForm(data) {

    if (data.name.length < 3)
      return "Plant name must be ≥ 3 characters";

    if (data.frequency <= 0)
      return "Frequency must be greater than 0";

    if (!data.date)
      return "Select valid last watered date";

    if (data.notes.length < 15)
      return "Notes must be ≥ 15 characters";

    return "valid";
  }

  // Save to LocalStorage
  saveToLocalStorage(data) {

    let reports =
      JSON.parse(localStorage.getItem("plantReports")) || [];

    reports.push(data);

    localStorage.setItem(
      "plantReports",
      JSON.stringify(reports)
    );
  }

  // Clear Form
  clearForm() {
    this.form.reset();
  }

  // Show Message
  showMessage(msg, color="red") {
    this.messageBox.style.color = color;
    this.messageBox.innerText = msg;
  }

  // Handle Submit
  handleSubmit(e) {
    e.preventDefault();

    const data = {
      name: plantName.value,
      location: location.value,
      frequency: frequency.value,
      date: lastWatered.value,
      notes: notes.value
    };

    const validation = this.validateForm(data);

    if (validation !== "valid") {
      this.showMessage(validation);
      return;
    }

    this.saveToLocalStorage(data);
    this.showMessage("Report Saved ✅", "green");
    this.clearForm();
  }
}

// Initialize Class
new PlantReportHandler();



----------------------------------------------------------------


const table = document.getElementById("reportTable");
const search = document.getElementById("search");

let reports =
  JSON.parse(localStorage.getItem("plantReports")) || [];

function displayData(data) {

  table.innerHTML = "";

  if (data.length === 0) {
    table.innerHTML =
      "<tr><td colspan='5'>No data found</td></tr>";
    return;
  }

  data.forEach(r => {
    table.innerHTML += `
      <tr>
        <td>${r.name}</td>
        <td>${r.location}</td>
        <td>${r.frequency}</td>
        <td>${r.date}</td>
        <td>${r.notes}</td>
      </tr>`;
  });
}

// Initial load
displayData(reports);

// Search Filter
search.addEventListener("input", () => {

  const value = search.value.toLowerCase();

  const filtered = reports.filter(r =>
    r.name.toLowerCase().includes(value) ||
    r.location.toLowerCase().includes(value)
  );

  displayData(filtered);
});
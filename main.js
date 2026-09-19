document.addEventListener("DOMContentLoaded", function () {
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  var btn = document.getElementById("stamp-btn");
  var out = document.getElementById("stamp");
  if (btn && out) {
    btn.addEventListener("click", function () {
      out.textContent = "Loaded at " + new Date().toLocaleTimeString();
    });
  }
});

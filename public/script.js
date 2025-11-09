document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  const resultDiv = document.getElementById('result');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch('/submit-register-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => response.text())
      .then(text => { resultDiv.innerHTML = text; })
      .catch(err => { resultDiv.innerHTML = 'Error: ' + err.message; });
  });
});

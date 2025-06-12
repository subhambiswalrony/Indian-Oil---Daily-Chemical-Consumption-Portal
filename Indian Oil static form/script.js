// Set current date/time
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('en-GB', options);
    const timeStr = now.toLocaleTimeString('en-GB', {hour12: true});
    document.getElementById('datetime').textContent = dateStr + ", " + timeStr;
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Auto-calculate Closing Balance and SAP Balance
document.getElementById('chemicalForm').addEventListener('input', function() {
    const opening = parseFloat(document.getElementById('opening').value) || 0;
    const receive = parseFloat(document.getElementById('receive').value) || 0;
    const consumption = parseFloat(document.getElementById('consumption').value) || 0;
    const closing = opening + receive - consumption;
    document.getElementById('closing').value = closing.toFixed(2);
    document.getElementById('sapbalance').value = closing.toFixed(2); 
});

// Prevent form submission for demonstration
document.getElementById('chemicalForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Form submitted!');
});

fetch("https://api.deepwoken.co/get?type=talent&name=all")
    .then(response => response.json())  // Convert response to JSON
    .then(data => {
        const body = document.body; // Get reference to the body element
        
        // Create a preformatted block to display the data
        const pre = document.createElement('pre');
        
        // Stringify the JSON object with indentation (2 spaces)
        pre.textContent = JSON.stringify(data, null, 2);
        
        // Append the preformatted block to the body
        body.appendChild(pre);
    })
    .catch(error => console.error('Error:', error));
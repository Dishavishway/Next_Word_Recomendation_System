document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const predictBtn = document.getElementById('predictBtn');
    const predictionsDiv = document.getElementById('predictions');

    async function getPredictions() {
        const text = userInput.value;
        
        try {
            const response = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            displayPredictions(data.predictions);
        } catch (error) {
            console.error('Error:', error);
            predictionsDiv.innerHTML = '<p style="color: red;">Error fetching predictions</p>';
        }
    }

    function displayPredictions(predictions) {
        predictionsDiv.innerHTML = '';
        
        predictions.forEach(word => {
            const chip = document.createElement('div');
            chip.className = 'prediction-chip';
            chip.textContent = word;
            
            // Add click handler to append word to input
            chip.addEventListener('click', () => {
                userInput.value = userInput.value.trim() + ' ' + word;
                userInput.focus();
            });
            
            predictionsDiv.appendChild(chip);
        });
    }

    predictBtn.addEventListener('click', getPredictions);

    // Optional: Add prediction on Enter key
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            getPredictions();
        }
    });
}); 
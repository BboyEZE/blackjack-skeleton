// Immediately invoke the function when the script loads
(function() {
    console.log("Highscores script loaded"); // Debug log

    function updateHighScores() {
        console.log("Starting highscores fetch"); // Debug log
        fetch('http://127.0.0.1:3000/highscores')
            .then(response => {
                console.log("Raw response:", response); // Debug log
                //check if response is ok
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {

                console.log("Parsed data:", data); // Debug log
                const tbody = document.getElementById('highscores-body');
                console.log("Found tbody:", tbody); // Debug log

                //check if tbody exists
                if (!tbody) {
                    throw new Error('Could not find highscores-body element');
                }

                //check if data is valid
                if (!data.success || !data.highScores) {
                    throw new Error('Invalid data format received');
                }

                tbody.innerHTML = ''; // Clear existing scores
                
                // Only expecting top 3 scores now
                data.highScores.forEach((score, index) => {
                    const row = document.createElement('tr');
                    const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
                    row.innerHTML = `
                        <td>${medal}</td>
                        <td>${score.username}</td>
                        <td>${score.score} rounds</td>
                    `;
                    tbody.appendChild(row);
                    console.log("Added row:", row); // Debug log
                });
            })
            .catch(error => {
                console.error('Error in highscores:', error);
                const tbody = document.getElementById('highscores-body');
                if (tbody) {
                    tbody.innerHTML = '<tr><td colspan="3">Error loading high scores: ' + error.message + '</td></tr>';
                }
            });
    }

    // Call immediately and set interval
    console.log("Highscores script initialized"); // Debug log
    updateHighScores();
})();

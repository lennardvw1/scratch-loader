document.getElementById('play-btn').addEventListener('click', loadGame);
document.getElementById('exit-btn').addEventListener('click', exitFullscreen);

function loadGame() {
    var input = document.getElementById('scratch-url').value.trim();
    var errorMsg = document.getElementById('error-msg');
    
    // Find the sequence of digits (the Project ID) inside the string
    var idMatch = input.match(/\d+/);
    
    if (idMatch && idMatch[0]) {
        // Safe string extraction using direct text addition
        var projectId = idMatch[0];
        var embedUrl = "https://scratch.mit.edu/projects/" + projectId + "/embed";
        
        // Hide input interface, reveal canvas container
        document.getElementById('setup-container').style.display = 'none';
        var playerContainer = document.getElementById('player-container');
        playerContainer.style.display = 'block';
        
        // Assign the generated source value directly to the iframe window
        document.getElementById('scratch-iframe').src = embedUrl;
        errorMsg.style.display = 'none';

        // Trigger native hardware element fullscreen
        if (playerContainer.requestFullscreen) {
            playerContainer.requestFullscreen();
        } else if (playerContainer.webkitRequestFullscreen) { /* Safari */
            playerContainer.webkitRequestFullscreen();
        } else if (playerContainer.msRequestFullscreen) { /* IE11 */
            playerContainer.msRequestFullscreen();
        }
    } else {
        errorMsg.style.display = 'block';
    }
}

function exitFullscreen() {
    // Escape hardware fullscreen engine gracefully
    if (document.exitFullscreen) {
        document.exitFullscreen().catch(function() {});
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    
    // Flush the viewport nodes back to home dashboard state
    document.getElementById('player-container').style.display = 'none';
    document.getElementById('scratch-iframe').src = '';
    document.getElementById('setup-container').style.display = 'flex';
}

// Fallback listener for manual exits via Escape key
document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement) {
        if(document.getElementById('player-container').style.display === 'block') {
            document.getElementById('exit-btn').style.display = 'block';
        }
    }
});

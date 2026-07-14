document.addEventListener('DOMContentLoaded', function() {
    const copyBtn = document.getElementById('copyBtn');
    const tokenAddress = document.getElementById('tokenAddress').textContent;
    const copyFeedback = document.getElementById('copyFeedback');

    copyBtn.addEventListener('click', async function() {
        try {
            await navigator.clipboard.writeText(tokenAddress);
            
            copyBtn.classList.add('copied');
            copyFeedback.classList.add('show');
            
            setTimeout(function() {
                copyBtn.classList.remove('copied');
                copyFeedback.classList.remove('show');
            }, 2000);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = tokenAddress;
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px';
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                copyBtn.classList.add('copied');
                copyFeedback.classList.add('show');
                
                setTimeout(function() {
                    copyBtn.classList.remove('copied');
                    copyFeedback.classList.remove('show');
                }, 2000);
            } catch (err) {
                console.error('Could not copy text: ', err);
            }
            
            document.body.removeChild(textArea);
        }
    });
});
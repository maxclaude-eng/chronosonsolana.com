document.addEventListener('DOMContentLoaded', function() {
    const copyBtn = document.getElementById('copyBtn');
    const tokenAddress = document.getElementById('tokenAddress').textContent.trim();
    const copyFeedback = document.getElementById('copyFeedback');
    const FEEDBACK_DURATION = 2000;

    function showFeedback() {
        copyBtn.classList.add('copied');
        copyFeedback.classList.add('show');

        setTimeout(function() {
            copyBtn.classList.remove('copied');
            copyFeedback.classList.remove('show');
        }, FEEDBACK_DURATION);
    }

    async function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        }

        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);

        try {
            textArea.select();
            textArea.setSelectionRange(0, textArea.value.length);
            const success = document.execCommand('copy');
            return success;
        } catch (err) {
            console.error('Fallback copy failed:', err);
            return false;
        } finally {
            document.body.removeChild(textArea);
        }
    }

    copyBtn.addEventListener('click', async function() {
        try {
            const success = await copyToClipboard(tokenAddress);
            if (success) {
                showFeedback();
            } else {
                copyFeedback.textContent = 'Could not copy';
                copyFeedback.style.color = '#ff6b6b';
                showFeedback();
            }
        } catch (err) {
            console.error('Copy failed:', err);
            copyFeedback.textContent = 'Could not copy';
            copyFeedback.style.color = '#ff6b6b';
            showFeedback();
        }
    });
});
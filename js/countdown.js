function getCountdownMessage(expiryDate, id) {
    const now = new Date();
    const timeDifference = new Date(expiryDate) - now;

    const totalSecondsRemaining = Math.floor(timeDifference / 1000);
    const hoursRemaining = Math.floor(totalSecondsRemaining / 3600);
    const minutesRemaining = Math.floor((totalSecondsRemaining % 3600) / 60);
    const secondsRemaining = totalSecondsRemaining % 60;

    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    if (daysRemaining < 3) {
        return `<div class="countdown__timer" id="${id}">${String(hoursRemaining).padStart(2, '0')}:${String(minutesRemaining).padStart(2, '0')}:${String(secondsRemaining).padStart(2, '0')}</div>`;
    } else {
        const options = { day: 'numeric', month: 'long' };
        const formattedExpiryDate = new Date(expiryDate).toLocaleDateString('ru-RU', options);
        return `<div class="countdown__date">До ${formattedExpiryDate}</div>`;
    }
}

function startCountdown(expiryDate, countdownId) {
    const updateCountdown = () => {
        const now = new Date();
        const timeDifference = new Date(expiryDate) - now;

        if (timeDifference < 0) {
            clearInterval(timer);
            return;
        }

        const totalSecondsRemaining = Math.floor(timeDifference / 1000);
        const hours = Math.floor(totalSecondsRemaining / 3600);
        const minutes = Math.floor((totalSecondsRemaining % 3600) / 60);
        const seconds = totalSecondsRemaining % 60;

        $(`#${countdownId}`).text(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();
}

export { getCountdownMessage, startCountdown };
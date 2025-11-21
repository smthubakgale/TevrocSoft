ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

const joinForm = document.getElementById('joinForm');
const zoomModal = new bootstrap.Modal(document.getElementById('zoomModal'));

joinForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Extract meeting number and password
    const meetingNumber = document.getElementById('meetingId').value.trim();
    const passWord = document.getElementById('meetingPass').value.trim();
    const userName = document.getElementById('userName').value.trim() || 'Guest';

    if (!meetingNumber) return alert('Please enter a Meeting ID');

    try {
        // 1?? Request signature & SDK Key from backend
        const res = await fetch('/generate-signature', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ meetingNumber, role: 0 }) // 0 = attendee
        });

        const data = await res.json();
        if (!data.signature || !data.sdkKey) throw new Error('Invalid signature from server');

        const signature = data.signature;
        const sdkKey = data.sdkKey;

        // 2?? Show Zoom modal
        zoomModal.show();
        // 2?? Initialize and join the meeting
        ZoomMtg.init({
            leaveUrl: window.location.href,
            disablePreview: false,
            isSupportAV: true,
            success: () => {
                ZoomMtg.join({
                    //sdkKey,          // Use SDK Key here, not apiKey
                    signature,
                    meetingNumber,
                    passWord,
                    userName,
                    userEmail: '',   // optional
                    success: () => console.log('? Joined meeting'),
                    error: (err) => console.error('Join error:', err)
                });
            },
            error: (err) => console.error('Init error:', err)
        });

    } catch (err) {
        alert('Error joining meeting: ' + err.message);
        console.error(err);
    }
});
export default {

    userMediaAvailable() {
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    },

    getUserResources() {
        if (this.userMediaAvailable()) {
            return navigator.mediaDevices.getUserMedia({
                video: true,
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true
                }
            });
        } else {
            throw new Error('Media not available');
        }
    },


    getUserAudio() {
        if (this.userMediaAvailable()) {
            return navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true
                }
            });
        } else {
            throw new Error('Media not available');
        }
    },

    shareScreen() {
        if (this.userMediaAvailable()) {
            return navigator.mediaDevices.getDisplayMedia({
                video: {
                    cursor: "always"
                },
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                }
            });
        } else {
            throw new Error('Media not available');
        }
    },


    getIceServer() {
        return {
            iceServers: [{
                urls: ['stun:stun.l.google.com:19302']
            }]
        };
    },


    replaceTrack(stream, recipientPeer) {
        let sender = recipientPeer.getSenders ? recipientPeer.getSenders().find(s => s.track && s.track.kind === stream.kind) : false;

        sender ? sender.replaceTrack(stream) : '';
    },



    toggleShareIcons(share) {
        let shareIconElem = document.querySelector('#share-screen');

        if (share) {
            shareIconElem.setAttribute('title', 'Stop sharing screen');
            shareIconElem.children[0].classList.add('text-primary');
            shareIconElem.children[0].classList.remove('text-white');
        } else {
            shareIconElem.setAttribute('title', 'Share screen');
            shareIconElem.children[0].classList.add('text-white');
            shareIconElem.children[0].classList.remove('text-primary');
        }
    },


    toggleVideoBtnDisabled(disabled) {
        document.getElementById('toggle-video').disabled = disabled;
    },


    fullScreenStream(e) {
        let viewElem = e.target.parentElement.previousElementSibling;

        viewElem.requestFullscreen() || viewElem.mozRequestFullScreen() || viewElem.webkitRequestFullscreen() || viewElem.msRequestFullscreen();
    },


    singleStreamToggleMute(e) {
        if (e.target.classList.contains('fa-microphone')) {
            e.target.parentElement.previousElementSibling.muted = true;
            e.target.classList.add('fa-microphone-slash');
            e.target.classList.remove('fa-microphone');
        } else {
            e.target.parentElement.previousElementSibling.muted = false;
            e.target.classList.add('fa-microphone');
            e.target.classList.remove('fa-microphone-slash');
        }
    },


    saveRecordedStream(stream, user) {
        let blob = new Blob(stream, { type: 'video/webm' });

        let file = new File([blob], `${ user }-${ moment().unix() }-record.webm`);

        saveAs(file);
    },


    toggleModal(id, show) {
        let el = document.getElementById(id);

        if (show) {
            el.style.display = 'block';
            el.removeAttribute('aria-hidden');
        } else {
            el.style.display = 'none';
            el.setAttribute('aria-hidden', true);
        }
    },

    setLocalStream(stream, mirrorMode = true) {
        const localVidElem = document.getElementById('local');

        localVidElem.srcObject = stream;
        mirrorMode ? localVidElem.classList.add('mirror-mode') : localVidElem.classList.remove('mirror-mode');
    },

    videoGridSizing() {
        let videospace = document.getElementById('videos');
        let usersCount = videospace.children.length;
        let columns = Math.sqrt(usersCount);

        if (usersCount != 0) {
            if (usersCount == 1) {
                videospace.style.gridTemplateColumns = "repeat( 1, 1fr)";
                videospace.style.gridTemplateRows = "repeat(1, 1fr)";
            } else if (usersCount == 2) {
                videospace.style.gridTemplateColumns = "repeat( 2, 1fr)";
                videospace.style.gridTemplateRows = "repeat(1, 1fr)";
            } else if (!Number.isInteger(columns)) {
                videospace.style.gridTemplateColumns = "repeat(" + (Math.ceil(columns)).toString() + ", 1fr)";
                videospace.style.gridTemplateRows = "repeat(" + Math.ceil(columns).toString() + ", 1fr)";
            } else {
                videospace.style.gridTemplateColumns = "repeat(" + Math.ceil(columns).toString() + ", 1fr)";
                videospace.style.gridTemplateRows = "repeat(" + (Math.ceil(columns) + 1).toString() + ", 1fr)";
            }
        }
    }
};
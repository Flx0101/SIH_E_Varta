import helper from './helper.js';

window.addEventListener('load', () => {
    let roomName = "roomName";
    let yourName = "userName";
    console.log(roomName + " " + yourName);
    sessionStorage.setItem('username', yourName);

    if (roomName && yourName) {
        let roomLink = `${ location.origin }/video?room=${ roomName.trim().replace( ' ', '_' ) }_${ Date.now() }`;
        console.log(roomLink);
    }
    document.getElementById('local').addEventListener('click', () => {
        if (!document.pictureInPictureElement) {
            document.getElementById('local').requestPictureInPicture()
                .catch(error => {
                    console.error(error);
                });
        } else {
            document.exitPictureInPicture()
                .catch(error => {
                    console.error(error);
                });
        }
    });
    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('expand-remote-video')) {
            helper.fullScreenStream(e);
        } else if (e.target && e.target.classList.contains('mute-remote-mic')) {
            helper.singleStreamToggleMute(e);
        }
    });

    // document.getElementById('closeModal').addEventListener('click', () => {
    //     helper.toggleModal('recording-options-modal', false);
    // });

});
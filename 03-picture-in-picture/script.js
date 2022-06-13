const videoElement = document.getElementById("video");
const button = document.getElementById("button");


//prompt para selecionar a media, passar para o elemnto video, e tocar.

async function selectMediaStream () {
	try {
		const mediaStream = await navigator.mediaDevices.getDisplayMedia();
		videoElement.srcObject = mediaStream;
		videoElement.onloadedmetadata = () => {
			videoElement.play();
		}
	} catch(error) {
		//catch error
		console.log("whoos error here:", error);
		
	}
}

button.addEventListener('click', async () => {
	//desabiltar botao
	button.disabled = true;
	//começar pic in pu
	await videoElement.requestPictureInPicture();
	//reset botao
	button.disabled = false;
})

//carregar
selectMediaStream();
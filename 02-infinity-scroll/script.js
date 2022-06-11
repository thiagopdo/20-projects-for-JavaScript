const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

//unsplash API
const count = 20;
const apiKey = "API_KEY_HERE";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Checa se todas imagens foram carregadas
function imageLoaded() {
	imagesLoaded++;
	console.log(imagesLoaded);
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
	}
}

//helper function para setar os atributos no DOM
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

//cria elementos para os links e photos, adiciona no DOM
function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photoArray.length;
	console.log("total images", totalImages);

	//percorre function foreach objeto no photoarray
	photoArray.forEach((photo) => {
		//create <a> to link to unsplash
		const item = document.createElement("a");
		setAttributes(item, {
			href: photo.links.html,
			target: "_blank",
		});

		//Cria <img> para photos
		const img = document.createElement("img");
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});

		//eventlistener, checa qnd cada um já foi carregado
		img.addEventListener("load", imageLoaded);

		//put <img> inside <a> then put both dentro do imageContainer Element
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

//get photos from unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photoArray = await response.json();

		displayPhotos();
	} catch (error) {
		//catch error here
	}
}

//checar se o scrool está perto do fim da pagina e carregar mais fotos
window.addEventListener("scroll", () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotos();
	}
});

//para loadar
getPhotos();

/
document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.getElementById('image-container');
    const randomImage = document.getElementById('random-image');
    const showNameButton = document.getElementById('show-name');
    const iKnowButton = document.getElementById('i-know');
    const iDontKnowButton = document.getElementById('i-dont-know');
    const imageName = document.getElementById('image-name');
    const knownImagesList = document.getElementById('known-images-list');

    let images = [];
    let knownImages = JSON.parse(localStorage.getItem('knownImages')) || [];

    function updateKnownList() {
        knownImagesList.innerHTML = '';
        knownImages.forEach(image => {
            const listItem = document.createElement('li');
            listItem.textContent = image;
            listItem.addEventListener('click', () => {
                window.open(`img/${image}`, '_blank');
            });
            knownImagesList.appendChild(listItem);
        });
    }

    function getRandomImage() {
        const availableImages = images.filter(image => !knownImages.includes(image));
        if (availableImages.length === 0) {
            randomImage.src = '';
            imageName.textContent = 'No more images available';
            return;
        }
        const randomIndex = Math.floor(Math.random() * availableImages.length);
        const randomImageName = availableImages[randomIndex];
        randomImage.src = `img/${randomImageName}`;
        randomImage.dataset.name = randomImageName;
        imageName.textContent = '';
    }

    showNameButton.addEventListener('click', () => {
        imageName.textContent = randomImage.dataset.name;
    });

    iKnowButton.addEventListener('click', () => {
        const currentImageName = randomImage.dataset.name;
        if (!knownImages.includes(currentImageName)) {
            knownImages.push(currentImageName);
            localStorage.setItem('knownImages', JSON.stringify(knownImages));
            updateKnownList();
            getRandomImage();
        }
    });

    iDontKnowButton.addEventListener('click', getRandomImage);

    fetch('/images')
        .then(response => response.json())
        .then(data => {
            images = data;
            updateKnownList();
            getRandomImage();
        })
        .catch(error => console.error('Error fetching images:', error));
});
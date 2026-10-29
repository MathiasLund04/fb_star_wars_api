const characterList = document.getElementById('character-list');

async function hentCharacters() {
    try {
        const response = await fetch('/characters');

        if (!response.ok) {
            throw new Error('Kunne ikke hente karakterer');
        }

        const characters = await response.json();
        characterList.innerHTML = '';

        characters.forEach(character => {
            const listItem = document.createElement('div');

            const name = document.createElement('h2');
            name.textContent = character.name;

            const role = document.createElement('p');
            role.textContent = `Role: ${character.role}`;

            const homeworld = document.createElement('p');
            homeworld.textContent = `Homeworld: ${character.homeworld}`;

            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.addEventListener('click', () => {
                window.location.href = `/update.html?id=${character.id}`;
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete');
            deleteButton.addEventListener('click', () => {
                deleteCharacter(character.id);
            });

            listItem.appendChild(name);
            listItem.appendChild(role);
            listItem.appendChild(homeworld);
            listItem.appendChild(updateButton);
            listItem.appendChild(deleteButton);

            characterList.appendChild(listItem);
        });
    } catch (error) {
        console.error(error);
    }
}

async function deleteCharacter(id) {
    if (!confirm('Er du sikker på, at karakteren skal slettes?')) {
        return;
    }

    try {
        const response = await fetch(`/characters/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Karakteren kunne ikke slettes');
        }

        await hentCharacters();
    } catch (error) {
        console.error(error);
    }
}

const createForm = document.getElementById('create-character-form');

if (createForm) {
    createForm.addEventListener('submit', async event => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const role = document.getElementById('role').value.trim();
        const homeworld = document.getElementById('homeworld').value.trim();

        try {
            const response = await fetch('/characters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    role,
                    homeworld
                })
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || 'Kunne ikke oprette karakteren');
            }

            window.location.href = '/';
        } catch (error) {
            alert(error.message);
        }
    });
}

const updateForm = document.getElementById('update-character-form');

if (updateForm) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
        throw new Error('Mangler karakter-ID');
    }

    fetch(`/characters/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Kunne ikke hente karakteren');
            }

            return response.json();
        })
        .then(character => {
            document.getElementById('name').value = character.name;
            document.getElementById('role').value = character.role;
            document.getElementById('homeworld').value = character.homeworld;
        })
        .catch(error => console.error(error));

    updateForm.addEventListener('submit', async event => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const role = document.getElementById('role').value.trim();
        const homeworld = document.getElementById('homeworld').value.trim();

        try {
            const response = await fetch(`/characters/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    role,
                    homeworld
                })
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || 'Kunne ikke opdatere karakteren');
            }

            window.location.href = '/';
        } catch (error) {
            alert(error.message);
        }
    });
}

if (characterList) {
    hentCharacters().then(() => {}).catch(error => console.error('Error fetching characters:', error));
}

const rebelPopup = document.getElementById('rebel-popup');
const rebelText = document.getElementById('rebel-text');
const closePopup = document.getElementById('close-popup');
const popupClosedKey = 'rebel-popup-closed';

if (
    rebelPopup &&
    rebelText &&
    closePopup &&
    !sessionStorage.getItem(popupClosedKey)
) {
    fetch('/download')
        .then(response => {
            if (!response.ok) {
                throw new Error('Kunne ikke hente rebel-alliance.txt');
            }

            return response.text();
        })
        .then(text => {
            rebelText.textContent = text;
            rebelPopup.hidden = false;
        })
        .catch(error => console.error(error));

    closePopup.addEventListener('click', () => {
        rebelPopup.hidden = true;
        sessionStorage.setItem(popupClosedKey, 'true');
    });
}


async function fetchProfileData() {
    const url = 'https://raw.githubusercontent.com/reenanrs1/JS-Aprendizado/main/BootCamp_Ifood_Dio/Portifolio/data/profile.json';
    const fetching = await fetch(url)
    return await fetching.json()
}
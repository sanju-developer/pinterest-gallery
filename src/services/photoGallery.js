const accessKey = "FSm2_IszXiKvD7moLkv1uVVnaHmCW2hQFtHxwP5gtXE";

export async function photoGalleryService(page = 1) {
    // const response = await fetch(`http://jsonplaceholder.typicode.com/photos?_start=${page}&_limit=10`)
    const response = await fetch(`https://api.unsplash.com/photos?page=${page}&client_id=${accessKey}`)
    const json = await response.json();
    return json
}
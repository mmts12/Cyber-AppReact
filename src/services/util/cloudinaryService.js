async function uploadImg(ev) {
    const CLOUD_NAME = "dscb3040k"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', 'zbzfctom');
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        console.log(data)
        return Promise.resolve(data);

    } catch (err) {
        console.log(err);
    }
}

export const cloudinaryService = {
    uploadImg
}
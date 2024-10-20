export const fileUpload = async (file) => {
    const cloudUrl = "https://api.cloudinary.com/v1_1/ddbj1cag6/image/upload";
    const formData = new FormData();
    formData.append("timestamp", Math.floor(Date.now() / 1000));
    formData.append("upload_preset", "react-journal-app-v2");
    formData.append("file", file);

    try {
        const resp = await fetch(cloudUrl, {
            method: "POST",
            body: formData,
        });

        if (!resp.ok) {
            console.log("Error: ", await resp.json());
            throw new Error("No se pudo subir la imagen.");
        }

        const cloudResp = await resp.json();
        return cloudResp.secure_url;
    } catch (error) {
        throw error;
    }
};

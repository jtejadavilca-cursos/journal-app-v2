// create fileUpload test

import { fileUpload } from "../../src/helpers/fileUpload";

// Mockeamos global.fetch
global.fetch = jest.fn();

describe("fileUpload", () => {
    const file = new File(["dummy content"], "example.png", { type: "image/png" });

    beforeEach(() => {
        fetch.mockClear(); // Limpiamos los mocks antes de cada test
    });

    test("debe subir un archivo y devolver la URL", async () => {
        const mockResponse = {
            secure_url: "https://cloudinary.com/example.jpg",
        };

        // Simulamos una respuesta exitosa de fetch
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const url = await fileUpload(file);

        // Asegurarse de que la URL devuelta sea la correcta
        expect(url).toBe(mockResponse.secure_url);

        // Comprobamos que fetch fue llamado correctamente
        expect(fetch).toHaveBeenCalledWith(
            "https://api.cloudinary.com/v1_1/ddbj1cag6/image/upload",
            expect.objectContaining({
                method: "POST",
                body: expect.any(FormData),
            })
        );
    });

    test("debe lanzar un error si la respuesta no es exitosa", async () => {
        const mockErrorResponse = { error: "No se pudo subir la imagen." };

        // Simulamos una respuesta fallida de fetch
        fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => mockErrorResponse,
        });

        await expect(fileUpload(file)).rejects.toThrow("No se pudo subir la imagen.");

        // Comprobamos que fetch fue llamado correctamente
        expect(fetch).toHaveBeenCalledWith(
            "https://api.cloudinary.com/v1_1/ddbj1cag6/image/upload",
            expect.objectContaining({
                method: "POST",
                body: expect.any(FormData),
            })
        );
    });
});

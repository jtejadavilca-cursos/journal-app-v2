// En caso de necesitar la implementación del FetchAPI
import "whatwg-fetch"; // <-- yarn add whatwg-fetch
import { getEnvironments } from "./src/firebase/getEnvironments";

require("dotenv").config({
    path: ".env.test",
});

jest.mock("./src/firebase/getEnvironments", () => ({
    getEnvironments: () => ({ ...process.env }),
}));

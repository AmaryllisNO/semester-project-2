import { baseUrl } from "../../../settings/api.js";
import { getToken } from "../../../utils/storage.js";

export default function deleteButton(id) {

    const container = document.querySelector(".delete-container");

    container.innerHTML = `<button types="button" class="delete btn form__button">Delete</button>`

    const button = document.querySelector("button.delete");

    button.addEventListener("click", handleDelete);

    async function handleDelete() {

        const doDelete = confirm("Are you sure want to delete this?");


        if (doDelete) {
            const url = baseUrl + "/products/" + id;

            const token = getToken();

            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }

            try {
                const response = await fetch(url, options);
                const json = await response.json();
                console.log(json);

                location.href = "index.html";
            } catch (error) {
                console.log(error);
            }
        }
    };
}
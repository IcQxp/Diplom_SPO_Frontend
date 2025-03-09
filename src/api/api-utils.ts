export const fetchData = async () => {
    try {
        const response = await fetch("https://localhost:7003/api/users/get-all", {
            method: "GET", // Исправлено на GET
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: `HTTP error! Status: ${response.status}` }));

            if (response.status === 404) {
                console.error("Not Found:", errorData);
            } else if (response.status >= 500) {
                console.error("Server Error:", errorData);
            } else {
                console.error("HTTP error:", errorData);
            }
            throw errorData;
        }

        const data = await response.json();
        return data; // Вот это добавлено!
    } catch (error) {
        console.error("Fetch error:", error);
        return null; //Возвращаем null при ошибке, чтобы избежать undefined
    }
};

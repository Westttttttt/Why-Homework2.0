type AuthCredentials = {
    username: string;
    pin: string;
};

export async function register(credentials: AuthCredentials) {
    try {
        const res = await fetch("/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        const data = await res.json();

        return { data, status: res.status };
    } catch (error) {
        console.error("Error during registration", error);
        throw error;
    }
}

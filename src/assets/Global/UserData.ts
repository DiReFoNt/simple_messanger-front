export let tokenAccess: string | null = localStorage.getItem("access_token");
export let config = {
    headers: {
        Authorization: `Bearer ${tokenAccess}`,
    },
};

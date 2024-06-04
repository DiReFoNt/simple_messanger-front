export let tokenAccess: string | null = "";
export let config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
};

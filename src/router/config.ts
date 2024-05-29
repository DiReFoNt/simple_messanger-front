export const tokenAccess: string | null = localStorage.getItem("access_token");
export const config = {
    headers: {
        Authorization: `Bearer ${tokenAccess}`,
    },
};

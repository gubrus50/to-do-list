
import cookies from "./cookies"

const getResponse = (warningMessage: string = '') => {
    const path = location.pathname;

    cookies.delete("confirmAction_response");
    cookies.set("confirmAction_pathname", path, 1);
    cookies.set("confirmAction_warningMessage", warningMessage, 1);

    location.replace("/confirm-action");
}

const response = () => cookies.get("confirmAction_response");

const deleteConfirmActionCookies = () => {
    cookies.delete("confirmAction_response");
    cookies.delete("confirmAction_pathname");
    cookies.delete("confirmAction_warningMessage")
}

export default {
    getResponse,
    response,
    reset: deleteConfirmActionCookies
}
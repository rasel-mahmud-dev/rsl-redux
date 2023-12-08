import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

class Toast {
    openSuccess(message, opt) {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            timer: opt?.duration ?? 4000,
            icon: "success",
            title: message,
            showConfirmButton: false
        });
    }

    promptWithConfirm(deleteMessage, yesBtnLabel) {
        const MySwal = withReactContent(Swal);

        return new Promise((resolve) => {
            MySwal.fire({
                title: deleteMessage || "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: yesBtnLabel ?? "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    return resolve({
                        isConfirmed: true,
                        done: (msg) => {
                            MySwal.fire({
                                title: "Deleted!",
                                timer: 4000,
                                text: msg,
                                icon: "success"
                            });
                        }
                    });
                }

                resolve({
                    isConfirmed: false,
                    done: (msg) => {
                        MySwal.fire({
                            title: "Operator Cancel!",
                            text: msg,
                            timer: 4000,
                            icon: "info"
                        });
                    }
                });
            });
        });
    }

    openError(message, opt) {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            timer: opt?.duration ?? 4000,
            icon: "error",
            title: message,
            showConfirmButton: false
        });
    }
}

export default new Toast();

import Swal from "sweetalert2";

const confirmDelete = async (title = "Are you sure?") => {
  const result = await Swal.fire({
    title,
    text: "This action cannot be undone.",
    icon: "warning",

    showCancelButton: true,

    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6366f1",

    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",

    reverseButtons: true,
  });

  return result.isConfirmed;
};

export default confirmDelete;

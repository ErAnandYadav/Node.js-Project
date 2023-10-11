$(document).ready(function () {
  // user sign up
 
  // Forgot password js
  $('#forgotPasswordForm').submit(function (event) {
    event.preventDefault();
    const email = $('#forgotPasswordEmail').val();
    $.ajax({
      url: '/auth/forgot-password',
      method: 'POST',
      data: { email },
      success: function (response) {
        console.log(response.message);
        $('#forgotPasswordModal').modal('hide');
        Toastify({
          text: response.message,
          duration: 3000,
          close: true,
          gravity: 'top',
          position: 'center',
          // style: {
          //   background: "#dc3545",
          // },
        }).showToast();
      },
      error: function (error) {
        console.error(error);
        Toastify({
          text: error,
          duration: 3000,
          close: true,
          gravity: 'top',
          position: 'center',
          style: {
            background: "#dc3545",
          },
        }).showToast();
      },
    });
  });

  $('#updatePasswordForm').submit(function (event) {
    event.preventDefault();
    const password = $('#password').val();
    const confirmPassword = $('#confirmPassword').val();
    $.ajax({
      url: '/auth/update-password',
      method: 'POST',
      data: { password, confirmPassword},
      success: function (response) {
        console.log(response.message);
        $('#forgotPasswordModal').modal('hide');
        Toastify({
          text: response.message,
          duration: 3000,
          close: true,
          gravity: 'top',
          position: 'center',
          // style: {
          //   background: "#dc3545",
          // },
        }).showToast();
      },
      error: function (error) {
        console.error(error);
        Toastify({
          text: error,
          duration: 3000,
          close: true,
          gravity: 'top',
          position: 'center',
          style: {
            background: "#dc3545",
          },
        }).showToast();
      },
    });
  });
  $(document).on("click", "#fgModal", function () {
      $("#userLoginModal").modal("hide");
      $("#forgotPasswordModal").modal("show");
      $("#body").addClass("modal-open");
  });
  $(window).on('load', function() {
    $('#passwordResetModal').modal('show');
  });
});

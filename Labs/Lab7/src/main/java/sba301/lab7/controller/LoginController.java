package sba301.lab7.controller;

import javafx.application.Platform;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.stage.Stage;
import sba301.lab7.pojo.Student;
import sba301.lab7.service.IStudentService;
import sba301.lab7.service.StudentService;

import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

public class LoginController implements Initializable {
    @FXML
    private TextField txtEmail;

    @FXML
    private PasswordField txtPassword;

    private IStudentService IStudentService;

    public LoginController() {
        IStudentService = new StudentService();
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {

    }

    @FXML
    public void login() throws IOException {
        String email = txtEmail.getText();
        String password = txtPassword.getText();

        // 1. Kiểm tra trường rỗng
        if (email == null || email.trim().isEmpty()) {
            showAlert(AlertType.WARNING, "Lỗi xác thực", "Vui lòng nhập email!");
            txtEmail.requestFocus(); // Đưa con trỏ chuột về ô email
            return;
        }

        if (password == null || password.trim().isEmpty()) {
            showAlert(AlertType.WARNING, "Lỗi xác thực", "Vui lòng nhập mật khẩu!");
            txtPassword.requestFocus();
            return;
        }

        // 2. Kiểm tra định dạng email bằng Regex
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        if (!email.matches(emailRegex)) {
            showAlert(AlertType.WARNING, "Lỗi xác thực", "Định dạng email không hợp lệ!");
            txtEmail.requestFocus();
            return;
        }

        // 3. Xử lý logic đăng nhập nếu dữ liệu đã hợp lệ
        Student account = IStudentService.findByEmail(email);

        if (account != null && account.getPassword().equals(password)) {
            // Đăng nhập thành công
            FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("/student-view.fxml"));
            Parent root = fxmlLoader.load();
            Stage stage = new Stage();
            stage.setScene(new Scene(root));
            stage.show();

            // (Tuỳ chọn) Ẩn hoặc đóng cửa sổ đăng nhập hiện tại
            // Stage currentStage = (Stage) txtEmail.getScene().getWindow();
            // currentStage.close();

        } else {
            // Sai email hoặc mật khẩu
            showAlert(AlertType.ERROR, "Đăng nhập thất bại", "Email hoặc mật khẩu không chính xác!");
        }
    }

    @FXML
    public void logout() throws IOException {
        Platform.exit();
    }

    @FXML
    public void hello() {
        System.out.println("Hello, welcome to the Student Management System!");
        // Thường nút Cancel ở màn hình Login sẽ dùng để thoát ứng dụng hoặc xoá trắng các trường nhập
        // txtEmail.clear();
        // txtPassword.clear();
    }

    /**
     * Hàm tiện ích để hiển thị thông báo Alert
     */
    private void showAlert(AlertType alertType, String title, String message) {
        Alert alert = new Alert(alertType);
        alert.setTitle(title);
        alert.setHeaderText(null);
        alert.setContentText(message);
        alert.showAndWait();
    }
}
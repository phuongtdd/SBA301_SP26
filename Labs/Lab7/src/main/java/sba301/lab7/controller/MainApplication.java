package sba301.lab7.controller;

import javafx.application.Application;
import javafx.scene.Scene;

import java.io.IOException;

public class MainApplication extends Application {
    @Override
    public void start(javafx.stage.Stage primaryStage) throws Exception {
        // Khởi tạo và hiển thị giao diện người dùng ở đây
        try {
            // 1. Load FXML - Login Form
            javafx.fxml.FXMLLoader loader = new javafx.fxml.FXMLLoader(getClass().getResource("/LoginGUI.fxml"));

            // 2. Tạo Scene từ FXML
            Scene scene = new Scene(loader.load());
            // 3. Thiết lập Stage
            primaryStage.setTitle("Login");
            primaryStage.setScene(scene);
            primaryStage.show(); // Hiển thị cửa sổ chính
        } catch (IOException e) {
            System.err.println("Lô i khi tải giao dien FXML: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        launch(args);
    }
}

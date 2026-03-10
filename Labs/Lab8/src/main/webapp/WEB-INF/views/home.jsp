<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Management System</title>
    <link rel="stylesheet" href="resources/css/style.css">
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
<div class="page-container">
    <header>
        <img src="resources/images/Logo.png" alt="Logo">
        <span class="caption-subject">Student Management</span>
    </header>

    <div class="main-content">
        <input id="collapsible3" class="toggle" type="checkbox" checked>
        <label for="collapsible3" class="lbl-toggle">Student List</label>
        
        <div class="collapsible-content">
            <table class="table">
                <thead>
                    <tr>
                        <th>Choose</th>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Mark</th>
                    </tr>
                </thead>
                <tbody>
                    <c:forEach var="student" items="${studentList}" varStatus="STT">
                        <tr>
                            <td align="center">
                                <input type="radio" name="Oamuser_InGroup1" onclick="Oamuser_Js_getRowSelected()">
                            </td>
                            <td>${student.id}</td>
                            <td>${student.email}</td>
                            <td>${student.password}</td>
                            <td>${student.firstName}</td>
                            <td>${student.lastName}</td>
                            <td>${student.marks}</td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>

            <div class="form-section">
                <form id="Oamuser_Form1" action="manageStudent" method="post">
                    <table class="management-table">
                        <tbody>
                            <tr>
                                <td><label for="txtId">Student Id</label></td>
                                <td><input type="text" id="txtId" name="txtId" /></td>
                            </tr>
                            <tr>
                                <td><label for="txtEmail">Email</label></td>
                                <td><input type="text" id="txtEmail" name="txtEmail" required /></td>
                            </tr>
                            <tr>
                                <td><label for="txtPassword">Password</label></td>
                                <td><input type="password" id="txtPassword" name="txtPassword" required /></td>
                            </tr>
                            <tr>
                                <td><label for="txtFirstName">First Name</label></td>
                                <td><input type="text" id="txtFirstName" name="txtFirstName" /></td>
                            </tr>
                            <tr>
                                <td><label for="txtLastName">Last Name</label></td>
                                <td><input type="text" id="txtLastName" name="txtLastName" /></td>
                            </tr>
                            <tr>
                                <td><label for="txtMark">Marks</label></td>
                                <td><input type="text" id="txtMark" name="txtMark" /></td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="btn-group">
                        <button type="submit" name="btnManageStudent" value="add" class="btn btn-primary">
                            <i class="fa fa-plus"></i> Add
                        </button>
                        <button type="submit" name="btnManageStudent" value="update" class="btn btn-warning">
                            <i class="fa fa-edit"></i> Update
                        </button>
                        <button type="submit" name="btnManageStudent" value="delete" class="btn btn-danger">
                            <i class="fa fa-trash-o"></i> Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<script src="resources/js/Oamuser_JS_General.js"></script>
</body>
</html>

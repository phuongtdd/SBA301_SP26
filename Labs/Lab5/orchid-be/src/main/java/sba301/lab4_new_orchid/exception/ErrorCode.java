package sba301.lab4_new_orchid.exception;

public enum ErrorCode {
    UNCAUGHT_EXCEPTION(9999, "Uncaught exception"),
    EMAIL_EXISTED(1001, "Email existed"),
    USER_EXISTED(1002, "User existed"),
    USER_NOT_EXISTED(1003, "User not existed"),
    EMAIL_NOT_EXISTED(1004, "Email not existed"),
    SIGNIN_USERNAME_INVALID(1005, "Username or email must be between 6 and 100 characters"),
    SIGNIN_PASSWORD_INVALID(1006, "Password must be between 6 and 30 characters"),
    LOGIN_USERNAME_INVALID(1007, "Username or email is required"),
    LOGIN_PASSWORD_INVALID(1008, "Password is required"),
    USER_UNAUTHICATED(1009, "User is not authenticated"),
    ROOM_NOT_EXISTED(1010, "Room is not existed"),
    SUBJECT_NOT_EXISTED(1011, "Subject is not existed"),
    OWNER_NOT_EXISTED(1012, "Owner is not existed"),
    ROOM_NAME_EXISTED(1013, "Room name is existed"),
    EXAM_NOT_EXISTED(1014, "Examination is not existed"),
    QUESTION_NOT_EXISTED(1015, "Question is not existed"),
    ANSWER_NOT_EXISTED(1016, "Answer is not existed"),
    SUBMISSION_NOT_EXISTED(1017, "Submission is not existed"),
    PERMISSION_NOT_EXISTED(1018, "Permission is not existed"),
    ROLE_NOT_EXISTED(1019, "Role is not existed"),
    KNOWLEDGE_BASE_NOT_EXIST(1020, "Knowledge base is not existed"),
    FLASHCARD_NOT_EXISTED(1021, "Flashcard is not existed"),
    CARD_SET_NOT_EXIST(1022, "Card Set is not existed"),
    ORCHID_NOT_FOUND(2001, "Orchid not found"),
    CATEGORY_NOT_FOUND(2002, "Category not found"),
    INVALID_REQUEST(4000, "Invalid request data");

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    private int code;
    private String message;

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}

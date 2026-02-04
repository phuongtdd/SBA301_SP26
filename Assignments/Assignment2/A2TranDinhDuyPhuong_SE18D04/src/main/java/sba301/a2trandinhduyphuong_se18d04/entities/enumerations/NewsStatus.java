package sba301.a2trandinhduyphuong_se18d04.entities.enumerations;

public enum NewsStatus {
    ACTIVE(1), INACTIVE(0);

    final int value;

    NewsStatus(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}

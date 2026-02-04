package sba301.a2trandinhduyphuong_se18d04.entities.enumerations;

public enum CategoryStatus {
    ACTIVE(1), INACTIVE(0);

    final int value;

    CategoryStatus(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}

package sba301.fuminihotelsystem.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "RoomType")
public class RoomType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RoomTypeID")
    private Integer roomTypeId;

    @NotBlank(message = "Room type name is required")
    @Size(max = 50, message = "Room type name must not exceed 50 characters")
    @Column(name = "RoomTypeName", length = 50)
    private String roomTypeName;

    @Size(max = 250, message = "Type description must not exceed 250 characters")
    @Column(name = "TypeDescription", length = 250)
    private String typeDescription;

    @Size(max = 250, message = "Type note must not exceed 250 characters")
    @Column(name = "TypeNote", length = 250)
    private String typeNote;

    @JsonIgnoreProperties("roomType")
    @OneToMany(mappedBy = "roomType")
    private List<RoomInformation> roomInformationList;
}
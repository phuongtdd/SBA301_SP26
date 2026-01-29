package sba301.lab4_new_orchid.pojos;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orchid")
public class Orchid implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orchid_id")
    private Integer orchidID;

    @Column(name = "orchid_name")
    private String orchidName;

    @Column(name = "is_natural", columnDefinition = "bit default 0")
    private Boolean isNatural;

    @Column(name = "orchid_description")
    private String orchidDescription;

    @Column(name = "is_attractive", columnDefinition = "bit default 0")
    private Boolean isAttractive;

    @Column(name = "orchid_url")
    private String orchidURL;

    @Column(name = "price")
    private Double price;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category orchidCategory;
}
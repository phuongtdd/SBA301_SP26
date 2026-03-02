package sba301.fuminihotelsystem.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sba301.fuminihotelsystem.entities.RoomInformation;

@Repository
public interface RoomInformationRepository extends JpaRepository<RoomInformation, Integer> {
}

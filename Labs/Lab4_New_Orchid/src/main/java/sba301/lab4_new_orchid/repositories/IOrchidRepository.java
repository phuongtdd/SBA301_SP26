package sba301.lab4_new_orchid.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sba301.lab4_new_orchid.pojos.Orchid;

@Repository
public interface IOrchidRepository extends JpaRepository<Orchid, Integer> {
}

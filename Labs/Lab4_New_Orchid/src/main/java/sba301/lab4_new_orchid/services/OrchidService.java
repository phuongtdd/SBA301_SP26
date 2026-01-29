package sba301.lab4_new_orchid.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sba301.lab4_new_orchid.pojos.Orchid;
import sba301.lab4_new_orchid.repositories.IOrchidRepository;

import java.util.List;
import java.util.Optional;

@Service
public class OrchidService implements IOrchidService {

    @Autowired
    private IOrchidRepository orchidRepository;

    @Override
    public List<Orchid> getAllOrchids() {
        return orchidRepository.findAll();
    }

    @Override
    public Orchid insertOrchid(Orchid orchid) {
        return orchidRepository.save(orchid);
    }

    @Override
    public Orchid updateOrchid(int orchidId, Orchid orchid) {
        Orchid o = orchidRepository.findById(orchidId).orElse(null);
        if (o != null) {
            o.setOrchidName(orchid.getOrchidName());
            o.setIsNatural(orchid.getIsNatural());
            o.setOrchidDescription(orchid.getOrchidDescription());
            o.setOrchidCategory(orchid.getOrchidCategory());
            o.setIsAttractive(orchid.getIsAttractive());
            o.setOrchidURL(orchid.getOrchidURL());
        }
        return orchidRepository.save(o);
    }

    @Override
    public void deleteOrchid(int orchidId) {
        orchidRepository.deleteById(orchidId);
    }

    @Override
    public Optional<Orchid> getOrchidById(int id) {
        Orchid o = orchidRepository.findById(id).orElse(null);
        return Optional.ofNullable(o);
    }
}

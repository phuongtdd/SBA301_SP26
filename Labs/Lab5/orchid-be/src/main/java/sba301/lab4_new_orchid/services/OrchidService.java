package sba301.lab4_new_orchid.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sba301.lab4_new_orchid.exception.AppException;
import sba301.lab4_new_orchid.exception.ErrorCode;
import sba301.lab4_new_orchid.models.orchid.OrchidAddRequest;
import sba301.lab4_new_orchid.pojos.Category;
import sba301.lab4_new_orchid.pojos.Orchid;
import sba301.lab4_new_orchid.repositories.ICategoryRepository;
import sba301.lab4_new_orchid.repositories.IOrchidRepository;

import java.util.List;

@Service
public class OrchidService implements IOrchidService {

    @Autowired
    private IOrchidRepository orchidRepository;

    @Autowired
    private ICategoryRepository categoryRepository;

    @Override
    public List<Orchid> getAllOrchids() {
        return orchidRepository.findAll();
    }

    @Override
    public Orchid insertOrchid(OrchidAddRequest orchidRequest) {
        Orchid orchid = new Orchid();
        orchid.setOrchidName(orchidRequest.getOrchidName());
        orchid.setIsNatural(orchidRequest.getIsNatural());
        orchid.setOrchidDescription(orchidRequest.getOrchidDescription());
        orchid.setIsAttractive(orchidRequest.getIsAttractive());
        orchid.setOrchidURL(orchidRequest.getOrchidURL());
        orchid.setPrice(orchidRequest.getPrice());

        if (orchidRequest.getOrchidCategory() != null && orchidRequest.getOrchidCategory().getId() != null) {
            Category category = categoryRepository.findById(orchidRequest.getOrchidCategory().getId())
                    .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
            orchid.setOrchidCategory(category);
        }

        return orchidRepository.save(orchid);
    }

    @Override
    public Orchid updateOrchid(int orchidId, Orchid orchid) {
        Orchid existingOrchid = orchidRepository.findById(orchidId)
                .orElseThrow(() -> new AppException(ErrorCode.ORCHID_NOT_FOUND));

        existingOrchid.setOrchidName(orchid.getOrchidName());
        existingOrchid.setIsNatural(orchid.getIsNatural());
        existingOrchid.setOrchidDescription(orchid.getOrchidDescription());
        existingOrchid.setOrchidCategory(orchid.getOrchidCategory());
        existingOrchid.setIsAttractive(orchid.getIsAttractive());
        existingOrchid.setOrchidURL(orchid.getOrchidURL());
        existingOrchid.setPrice(orchid.getPrice());

        return orchidRepository.save(existingOrchid);
    }

    @Override
    public void deleteOrchid(int orchidId) {
        if (!orchidRepository.existsById(orchidId)) {
            throw new AppException(ErrorCode.ORCHID_NOT_FOUND);
        }
        orchidRepository.deleteById(orchidId);
    }

    @Override
    public Orchid getOrchidById(int id) {
        return orchidRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ORCHID_NOT_FOUND));
    }
}

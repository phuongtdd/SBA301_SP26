package sba301.lab4_new_orchid.services;

import sba301.lab4_new_orchid.models.orchid.OrchidAddRequest;
import sba301.lab4_new_orchid.pojos.Orchid;

import java.util.List;

public interface IOrchidService {
    public List<Orchid> getAllOrchids();

    public Orchid insertOrchid(OrchidAddRequest orchidRequest);

    public Orchid updateOrchid(int orchidId, Orchid orchid);

    public void deleteOrchid(int orchidId);

    public Orchid getOrchidById(int id);
}

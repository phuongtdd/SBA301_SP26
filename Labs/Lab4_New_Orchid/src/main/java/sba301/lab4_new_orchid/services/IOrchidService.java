package sba301.lab4_new_orchid.services;

import sba301.lab4_new_orchid.pojos.Orchid;

import java.util.List;
import java.util.Optional;

public interface IOrchidService {
    public List<Orchid> getAllOrchids();
    public Orchid insertOrchid(Orchid orchid);
    public Orchid updateOrchid(int orchidId, Orchid orchid);
    public void deleteOrchid(int orchidId);
    public Optional<Orchid> getOrchidById(int id);
}

package sba301.lab4_new_orchid.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sba301.lab4_new_orchid.models.orchid.OrchidAddRequest;
import sba301.lab4_new_orchid.pojos.Orchid;
import sba301.lab4_new_orchid.services.OrchidService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/orchids")
public class OrchidController {

    @Autowired
    private OrchidService orchidService;

    @GetMapping("/")
    public ResponseEntity<List<Orchid>> getAllOrchids() {
        return ResponseEntity.ok(orchidService.getAllOrchids());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orchid> getOrchidById(@PathVariable int id) {
        Orchid orchid = orchidService.getOrchidById(id);
        return ResponseEntity.ok(orchid);
    }

    @PostMapping("/")
    public ResponseEntity<Orchid> saveOrchid(@RequestBody OrchidAddRequest orchid) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orchidService.insertOrchid(orchid));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Orchid> updateOrchid(@PathVariable int id, @RequestBody Orchid orchid) {
        return ResponseEntity.ok(orchidService.updateOrchid(id, orchid));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrchid(@PathVariable int id) {
        orchidService.deleteOrchid(id);
        return ResponseEntity.noContent().build();
    }
}

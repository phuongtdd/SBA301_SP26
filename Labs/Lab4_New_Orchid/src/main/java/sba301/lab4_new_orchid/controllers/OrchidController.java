package sba301.lab4_new_orchid.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sba301.lab4_new_orchid.pojos.Orchid;
import sba301.lab4_new_orchid.services.OrchidService;

import java.util.List;
import java.util.Optional;

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
        Optional<Orchid> orchid = orchidService.getOrchidById(id);
        return ResponseEntity.ok(orchid.orElse(null));
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Orchid> saveOrchid(@RequestBody Orchid orchid) {
        return ResponseEntity.ok(orchidService.insertOrchid(orchid));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Orchid> updateOrchid(@PathVariable int id, @RequestBody Orchid orchid) {
        return ResponseEntity.ok(orchidService.updateOrchid(id, orchid));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrchid(@PathVariable int id) {
        orchidService.deleteOrchid(id);
        return ResponseEntity.ok("Deleted");
    }
}

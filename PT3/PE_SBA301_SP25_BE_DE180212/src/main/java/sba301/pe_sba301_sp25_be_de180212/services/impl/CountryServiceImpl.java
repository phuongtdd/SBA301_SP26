package sba301.pe_sba301_sp25_be_de180212.services.impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import sba301.pe_sba301_sp25_be_de180212.dtos.country.CountryResponse;
import sba301.pe_sba301_sp25_be_de180212.mapper.CountryMapper;
import sba301.pe_sba301_sp25_be_de180212.repositories.CountryRepository;
import sba301.pe_sba301_sp25_be_de180212.services.CountryService;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CountryServiceImpl implements CountryService {

    CountryRepository countryRepository;
    CountryMapper countryMapper;

    @Override
    public List<CountryResponse> getAllCountries() {
        return countryRepository.findAll().stream()
                .map(countryMapper::toCountryResponse)
                .toList();
    }
}

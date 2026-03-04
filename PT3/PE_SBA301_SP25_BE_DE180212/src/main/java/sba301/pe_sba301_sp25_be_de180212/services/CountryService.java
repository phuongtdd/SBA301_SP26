package sba301.pe_sba301_sp25_be_de180212.services;

import sba301.pe_sba301_sp25_be_de180212.dtos.country.CountryResponse;

import java.util.List;

public interface CountryService {
    List<CountryResponse> getAllCountries();
}

package sba301.pe_sba301_sp25_be_de180212.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;
import sba301.pe_sba301_sp25_be_de180212.dtos.account_member.AccountMemberResponse;
import sba301.pe_sba301_sp25_be_de180212.entities.AccountMember;


@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface AccountMemberMapper {
    AccountMemberResponse toAccountMemberResponse(AccountMember accountMember);
}

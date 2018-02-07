package com.hundoy.hundo.mapper;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("dataMapper")
public interface DataMapper {
//	List<Accountbook> getAccountBook(@Param("taxNo") String taxNo);
//	// product_id=1006 and partner_code='yh' and partner_user_name='zmxy01
//	List<FactOrgStatus> getFactOrgStatus(@Param("productId") Long productId,
//										 @Param("partnerCode") String partnerCode,
//										 @Param("partnerUserName") String partnerUserName,
//										 @Param("orgAccount") String orgAccount);
	List<Map<String,Long>> getAllUids();

    List<Map<String,Object>> getScoreData();
}
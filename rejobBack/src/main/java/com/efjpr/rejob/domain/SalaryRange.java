package com.efjpr.rejob.domain;


import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SalaryRange {
    private float salaryRangeMin;
    private float salaryRangeMax;

}

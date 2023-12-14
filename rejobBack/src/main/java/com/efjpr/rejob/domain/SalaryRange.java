package com.efjpr.rejob.domain;


import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class SalaryRange {
    private float salaryRangeMin;
    private float salaryRangeMax;

}

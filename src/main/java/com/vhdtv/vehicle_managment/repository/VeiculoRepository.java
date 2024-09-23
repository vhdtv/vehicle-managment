package com.vhdtv.vehicle_managment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vhdtv.vehicle_managment.model.Veiculo;

public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {
}

import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentRepository';

//data transfer object
interface RequestDTO {
    provider_id: string;
    date: Date;
}

/**
 * Dependency Inversion ( SOLID )
 */

class CreateAppointmentService {
    public async execute({ date, provider_id }: RequestDTO): Promise<Appointment> {
        const appointmentRepository = getCustomRepository(AppointmentsRepository);
        const appointmentDate = startOfHour(date);


        const findAppointmentInSameDate = await appointmentRepository.findByDate(appointmentDate);

        if (findAppointmentInSameDate)
            throw new AppError('This appointment is already booked');

        const appointment = appointmentRepository.create({
            provider_id,
            date: appointmentDate
        });

        await appointmentRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
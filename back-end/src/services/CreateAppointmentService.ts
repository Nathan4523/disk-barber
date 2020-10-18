import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentRepository';

//data transfer object
interface RequestDTO {
    provider: string;
    date: Date;
}

/**
 * Dependency Inversion ( SOLID )
 */

class CreateAppointmentService {
    public async execute({ date, provider }: RequestDTO): Promise<Appointment> {
        const appointmentRepository = getCustomRepository(AppointmentsRepository);
        const appointmentDate = startOfHour(date);


        const findAppointmentInSameDate = await appointmentRepository.findByDate(appointmentDate);

        if (findAppointmentInSameDate)
            throw Error('This appointment is already booked');

        const appointment = appointmentRepository.create({
            provider,
            date: appointmentDate
        });

        await appointmentRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
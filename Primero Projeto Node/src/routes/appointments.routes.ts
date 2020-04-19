import { Router } from 'express';
import { startOfDay, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (req, res) => {
    const { provider, date } = req.body;

    const parsedDate = startOfDay(parseISO(date));

    const findAppointmentInSameDate = appointments.find(appointment =>
        isEqual(parsedDate, appointment.date),
    );

    if (findAppointmentInSameDate) {
        return res
            .status(400)
            .json({ message: 'This appointment is alredy booked.' });
    }

    const appointment = new Appointment(provider, parsedDate);

    appointments.push(appointment);

    return res.json(appointment);
});

export default appointmentsRouter;

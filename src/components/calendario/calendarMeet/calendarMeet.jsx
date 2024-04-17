import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './styleAgendaMeet.css'
import moment from "moment";


const CalendarMeet = () => {

    moment.locale("es");
    moment.updateLocale("es", {
        weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
        months: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
        ],
        days: [
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
            "Sabado",
            "Domingo",
        ],
    });

    const localizer = momentLocalizer(moment);
    return (
        <div className="w-full h-full">
            <Calendar
                localizer={localizer}
                defaultView="day"
                views={{ day: true }}
                toolbar={null}
                style={{
                    width: "100%",
                    height: "100%",
                    background: "white",
                    border: "none",
                    marginTop: "10px",
                    borderRadius: "5px",
                }} />
        </div>
    )
}

export default CalendarMeet;
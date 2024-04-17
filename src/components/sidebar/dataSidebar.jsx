import { FaUserCircle, FaHome } from "react-icons/fa";
import { BiFile , BiCalendarWeek } from "react-icons/bi";
import { CgCalculator } from "react-icons/cg";
import { AiOutlineMenuUnfold, AiOutlineFolderAdd  } from "react-icons/ai";

export const routes = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaHome />,
    },
    {
      path: "",
      name: "Agenda",
      icon: <BiCalendarWeek />,
      subRoutes: [
        {
          path: "/agenda/agenda-medica",
          name: "Agenda Medica",
          icon: <AiOutlineMenuUnfold />,
        },
        {
          path: "/agenda/citas",
          name: "Mis citas",
          icon: <AiOutlineMenuUnfold />,
        },
        {
          path: "/agenda/option3",
          name: "Option3",
          icon: <AiOutlineMenuUnfold />,
        },
      ],
    },
    {
      path: "",
      name: "Historia clínica ",
      icon: <FaUserCircle />,
      subRoutes: [
        {
          path: "/atencion/option1",
          name: "Historia clínica ",
          icon: <AiOutlineMenuUnfold />,
        },
        {
          path: "/atencion/option2",
          name: "Option2",
          icon: <AiOutlineMenuUnfold />,
        },
        {
          path: "/atencion/option3",
          name: "Option3",
          icon: <AiOutlineMenuUnfold />,
        },
      ],
    },
    {
      path: "",
      name: "Caja",
      icon: <CgCalculator />,
      subRoutes: [
        {
          path: "/caja/option1",
          name: "Option1",
          icon: <AiOutlineMenuUnfold />,
        },
        {
          path: "/caja/option2",
          name: "Option2",
          icon: <AiOutlineMenuUnfold />,
        },
        {
          path: "/caja/option3",
          name: "Option3",
          icon: <AiOutlineMenuUnfold />,
        },
      ],
    },
    {
      path: "",
      name: "Facturación",
      icon: <BiFile />,
      subRoutes: [
        {
          path: "/facturacion/option1",
          name: "Option1",
          icon: <AiOutlineMenuUnfold />,
        },
        {
          path: "/facturacion/option2",
          name: "Option2",
          icon: <AiOutlineMenuUnfold />,
        },
        {
          path: "/facturacion/option3",
          name: "Option3",
          icon: <AiOutlineMenuUnfold />,
        },
      ],
    },
    {
      path: "",
      name: "Radicacion",
      icon: <AiOutlineFolderAdd  />,
      subRoutes: [
        {
          path: "/radicacion/option1",
          name: "Option1",
          icon: <AiOutlineMenuUnfold />,
        },
        {
          path: "/radicacion/option2",
          name: "Option2",
          icon: <AiOutlineMenuUnfold />,
        },
        {
          path: "/radicacion/option3",
          name: "Option3",
          icon: <AiOutlineMenuUnfold />,
        },
      ],
    },
  ];
  
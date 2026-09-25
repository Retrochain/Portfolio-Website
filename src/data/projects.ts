export type Project = {
    id: string;
    number: number;
    title: string;
    description: string;

    img: string;
    gif: string;

    color: string;
    border: string;

    overview: string;
    technologies: string[];
    features: string[];
    type: string;
    status: string;
    duration: string;

    github?: string | string[];
    demo?: string;
};

export const projects: Project[] = [
    {
        id: "attendance",
        number: 1,

        title: "Attendance Application/Website",
        description: "Attendance Application/Website",

        img: "/UTDAttendanceApp.png",
        gif: "/UTDAttendanceApp.gif",

        color: "#FF0026",
        border: "tl-rect l-rect-y border",

        overview:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Integer tincidunt, justo vitae tincidunt elementum, lorem ipsum tristique lectus, vitae feugiat sapien libero at erat.Donec vel neque vitae justo consequat sollicitudin.Aliquam erat volutpat.Cras interdum, massa vitae posuere tincidunt, augue neque faucibus nisl, vitae malesuada lectus neque sed erat",

        technologies: [
            "VS MVC .NET",
            "WinForms",
            "Blazor",
            "MySQL RDBS",
            "BCrypt",
        ],

        features: [
            "Student attendance tracking",
            "Attendance history",
            "User authentication",
            "Real time dynamic updates",
        ],

        type: "web application/desktop application",
        status: "live",
        duration: "Jan 2025 - May 2025",

        github: [
            "https://github.com/Retrochain/UtdAttendanceApplication",
            "https://github.com/Retrochain/ProfessorAttendanceApplication",
        ],
    },

    {
        id: "weather",
        number: 2,

        title: "What's The Weather!",
        description: "A weather application displaying current weather information.",

        img: "/WhatsTheWeather.png",
        gif: "/WhatsTheWeather.gif",

        color: "#005EFF",
        border: "tl-clip-y bl-clip l-rect-y border",

        overview:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Integer tincidunt, justo vitae tincidunt elementum, lorem ipsum tristique lectus, vitae feugiat sapien libero at erat.Donec vel neque vitae justo consequat sollicitudin.Aliquam erat volutpat.Cras interdum, massa vitae posuere tincidunt, augue neque faucibus nisl, vitae malesuada lectus neque sed erat",

        technologies: [
            "JavaScript",
            "OpenWeather API",
            "Node.js",
            "HTML & Bootstrap CSS",
        ],

        features: [
            "Current weather fetching",
            "Location-based weather fetching",
            "Responsive design",
        ],


        type: "web application",
        status: "live",
        duration: "Jan 2025",

        github: "https://github.com/Retrochain/WeatherApp",
        demo: "https://retrochain.github.io/WeatherApp/index.html",
    },

    {
        id: "birthday",
        number: 3,

        title: "Birthday Calendar",
        description: "A birthday calendar to keep track of your birthdays",

        img: "/BirthdayCalendar.png",
        gif: "/BirthdayCalendar.gif",

        color: "#A9f51B",
        border: "tl-clip bl-rect l-rect border",

        overview:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Integer tincidunt, justo vitae tincidunt elementum, lorem ipsum tristique lectus, vitae feugiat sapien libero at erat.Donec vel neque vitae justo consequat sollicitudin.Aliquam erat volutpat.Cras interdum, massa vitae posuere tincidunt, augue neque faucibus nisl, vitae malesuada lectus neque sed erat",

        technologies: [
            "Express.js",
            "Node.js",
            "SupaBase",
            "React",
            "Tailwind CSS",
        ],

        features: [
            "CRUD Operations for Birthdays",
            "Upcoming and all birthday list",
            "full responsive calendar",
            "custom themes",
        ],


        type: "web application",
        status: "live",
        duration: "Mar 2026 - Apr 2026",

        github: "https://github.com/Retrochain/Birthday-Calendar-App",
        demo: "https://birthday-calendar-app.vercel.app/",
    },
];
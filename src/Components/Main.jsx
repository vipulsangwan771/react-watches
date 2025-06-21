import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import audiof from '../assets/aring.mp3';

// Utility to format time for Stopwatch and Timer
const formatTime = (elapsedMs) => {
    const totalSeconds = Math.floor(elapsedMs / 1000);
    const milliseconds = String(elapsedMs % 1000).padStart(3, '0');
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

// Stopwatch Component
const Stopwatch = ({ audioRef }) => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [targetMinutes, setTargetMinutes] = useState('0');
    const [targetTime, setTargetTime] = useState(null);
    const startTimeRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            startTimeRef.current = Date.now() - elapsedTime;
            intervalRef.current = setInterval(() => {
                const currentTime = Date.now() - startTimeRef.current;
                setElapsedTime(currentTime);

                if (targetTime && currentTime >= targetTime) {
                    setIsRunning(false);
                    clearInterval(intervalRef.current);
                    try {
                        audioRef.current.play();
                    } catch (err) {
                        console.error("Failed to play audio:", err);
                    }
                    Swal.fire({
                        icon: 'success',
                        title: "Time's up!",
                        text: 'The stopwatch has reached the target.',
                        showCancelButton: true,
                        confirmButtonText: 'Reset',
                        cancelButtonText: 'Stop Audio',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    }).then((result) => {
                        audioRef.current.pause();
                        audioRef.current.currentTime = 0;
                        if (result.isConfirmed) {
                            setElapsedTime(0);
                            setTargetTime(null);
                            setIsRunning(false);
                        }
                    });
                }
            }, 50);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning, targetTime, audioRef]);

    const startTimer = () => {
        const totalMilliseconds = parseFloat(targetMinutes) * 60 * 1000;
        if (totalMilliseconds <= 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Invalid Time',
                text: 'Please set a valid target time before starting the stopwatch.',
            });
            return;
        }
        if (!targetTime) {
            setTargetTime(totalMilliseconds);
        }
        setIsRunning(true);
    };

    const stopTimer = () => setIsRunning(false);

    const resetTimer = () => {
        setIsRunning(false);
        setElapsedTime(0);
        setTargetTime(null);
    };

    const getHours = () => Math.floor(parseFloat(targetMinutes) / 60);
    const getMinutes = () => Math.floor(parseFloat(targetMinutes)) % 60;
    const getSeconds = () => Math.round((parseFloat(targetMinutes) * 60) % 60);

    const handleTimeChange = (newHours, newMinutes, newSeconds) => {
        const totalSeconds = newHours * 3600 + newMinutes * 60 + newSeconds;
        const totalMinutes = totalSeconds / 60;
        setTargetMinutes(totalMinutes.toFixed(4));
    };

    return (
        <div className="text-center">
            <h2 className="text-gray-300 text-xl font-semibold mb-4">Digital Stopwatch</h2>
            <div className="mb-4">
                <label className="text-gray-400 text-sm block mb-1">Set Target Time</label>
                <div className="mb-2">
                    <select
                        value={getHours()}
                        onChange={(e) => handleTimeChange(parseInt(e.target.value), getMinutes(), getSeconds())}
                        disabled={isRunning}
                        className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
                    >
                        {[...Array(24).keys()].map((h) => (
                            <option key={h} value={h}>{h} hr</option>
                        ))}
                    </select>
                </div>
                <div className="flex space-x-2">
                    <select
                        value={getMinutes()}
                        onChange={(e) => handleTimeChange(getHours(), parseInt(e.target.value), getSeconds())}
                        disabled={isRunning}
                        className="w-1/2 px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
                    >
                        {[...Array(60).keys()].map((m) => (
                            <option key={m} value={m}>{m} min</option>
                        ))}
                    </select>
                    <select
                        value={getSeconds()}
                        onChange={(e) => handleTimeChange(getHours(), getMinutes(), parseInt(e.target.value))}
                        disabled={isRunning}
                        className="w-1/2 px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
                    >
                        {[...Array(60).keys()].map((s) => (
                            <option key={s} value={s}>{s} sec</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="bg-gray-800 text-green-400 font-mono text-3xl py-6 rounded-lg shadow-inner mb-6">
                {formatTime(elapsedTime)}
            </div>
            <div className="flex justify-between space-x-4">
                <button onClick={startTimer} className="flex-1 bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transition">Start</button>
                <button onClick={stopTimer} className="flex-1 bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transition">Stop</button>
                <button onClick={resetTimer} className="flex-1 bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transition">Reset</button>
            </div>
        </div>
    );
};

// Timer Component
const Timer = () => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const startTimeRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            startTimeRef.current = Date.now() - elapsedTime;
            intervalRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 50);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    const startTimer = () => setIsRunning(true);
    const stopTimer = () => setIsRunning(false);
    const resetTimer = () => {
        setIsRunning(false);
        setElapsedTime(0);
    };

    return (
        <div className="text-center">
            <h2 className="text-gray-300 text-xl font-semibold mb-4">Digital Timer</h2>
            <div className="bg-gray-800 text-green-400 font-mono text-3xl py-6 rounded-lg shadow-inner mb-6">
                {formatTime(elapsedTime)}
            </div>
            <div className="flex justify-between space-x-4">
                <button onClick={startTimer} className="flex-1 bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transition">Start</button>
                <button onClick={stopTimer} className="flex-1 bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transition">Stop</button>
                <button onClick={resetTimer} className="flex-1 bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transition">Reset</button>
            </div>
        </div>
    );
};

// Watch Component
const Watch = () => {
    const [localTime, setLocalTime] = useState(new Date());
    const [timeFormat24, setTimeFormat24] = useState(false);
    const [countryInput, setCountryInput] = useState('');
    const [countryTimes, setCountryTimes] = useState([]);

    const countryTimezones = {
        Afghanistan: 'Asia/Kabul',
        Albania: 'Europe/Tirane',
        Algeria: 'Africa/Algiers',
        Andorra: 'Europe/Andorra',
        Angola: 'Africa/Luanda',
        AntiguaAndBarbuda: 'America/Antigua',
        Argentina: 'America/Argentina/Buenos_Aires',
        Armenia: 'Asia/Yerevan',
        Australia: [
            'Australia/Sydney', 'Australia/Melbourne', 'Australia/Brisbane', 'Australia/Adelaide',
            'Australia/Perth', 'Australia/Darwin', 'Australia/Hobart', 'Australia/Eucla', 'Australia/Lord_Howe'
        ],
        Austria: 'Europe/Vienna',
        Azerbaijan: 'Asia/Baku',
        Bahamas: 'America/Nassau',
        Bahrain: 'Asia/Bahrain',
        Bangladesh: 'Asia/Dhaka',
        Barbados: 'America/Barbados',
        Belarus: 'Europe/Minsk',
        Belgium: 'Europe/Brussels',
        Belize: 'America/Belize',
        Benin: 'Africa/Porto-Novo',
        Bhutan: 'Asia/Thimphu',
        Bolivia: 'America/La_Paz',
        BosniaAndHerzegovina: 'Europe/Sarajevo',
        Botswana: 'Africa/Gaborone',
        Brazil: [
            'America/Sao_Paulo', 'America/Manaus', 'America/Recife', 'America/Belem', 'America/Fortaleza',
            'America/Cuiaba', 'America/Porto_Velho', 'America/Boa_Vista', 'America/Rio_Branco', 'America/Noronha'
        ],
        Brunei: 'Asia/Brunei',
        Bulgaria: 'Europe/Sofia',
        BurkinaFaso: 'Africa/Ouagadougou',
        Burundi: 'Africa/Gitega',
        Cambodia: 'Asia/Phnom_Penh',
        Cameroon: 'Africa/Douala',
        Canada: [
            'America/Toronto', 'America/Vancouver', 'America/Winnipeg', 'America/Regina', 'America/Halifax',
            'America/Edmonton', 'America/St_Johns', 'America/Whitehorse', 'America/Yellowknife', 'America/Iqaluit', 'America/Rankin_Inlet'
        ],
        CapeVerde: 'Atlantic/Cape_Verde',
        CentralAfricanRepublic: 'Africa/Bangui',
        Chad: 'Africa/Ndjamena',
        Chile: ['America/Santiago', 'Pacific/Easter'],
        China: 'Asia/Shanghai',
        Colombia: 'America/Bogota',
        Comoros: 'Indian/Comoro',
        Congo: 'Africa/Brazzaville',
        CostaRica: 'America/Costa_Rica',
        Croatia: 'Europe/Zagreb',
        Cuba: 'America/Havana',
        Cyprus: 'Asia/Nicosia',
        CzechRepublic: 'Europe/Prague',
        DemocraticRepublicOfCongo: ['Africa/Kinshasa', 'Africa/Lubumbashi'],
        Denmark: 'Europe/Copenhagen',
        Djibouti: 'Africa/Djibouti',
        Dominica: 'America/Dominica',
        DominicanRepublic: 'America/Santo_Domingo',
        Ecuador: 'America/Guayaquil',
        Egypt: 'Africa/Cairo',
        ElSalvador: 'America/El_Salvador',
        EquatorialGuinea: 'Africa/Malabo',
        Eritrea: 'Africa/Asmara',
        Estonia: 'Europe/Tallinn',
        Eswatini: 'Africa/Mbabane',
        Ethiopia: 'Africa/Addis_Ababa',
        Fiji: 'Pacific/Fiji',
        Finland: 'Europe/Helsinki',
        France: [
            'Europe/Paris', 'Indian/Reunion', 'Indian/Mayotte', 'Pacific/Tahiti', 'Pacific/Noumea',
            'Pacific/Marquesas', 'America/Martinique', 'America/Guadeloupe', 'America/Cayenne', 'Indian/Kerguelen'
        ],
        Gabon: 'Africa/Libreville',
        Gambia: 'Africa/Banjul',
        Georgia: 'Asia/Tbilisi',
        Germany: 'Europe/Berlin',
        Ghana: 'Africa/Accra',
        Greece: 'Europe/Athens',
        Grenada: 'America/Grenada',
        Guatemala: 'America/Guatemala',
        Guinea: 'Africa/Conakry',
        GuineaBissau: 'Africa/Bissau',
        Guyana: 'America/Guyana',
        Haiti: 'America/Port-au-Prince',
        Honduras: 'America/Tegucigalpa',
        Hungary: 'Europe/Budapest',
        Iceland: 'Atlantic/Reykjavik',
        India: 'Asia/Kolkata',
        Indonesia: ['Asia/Jakarta', 'Asia/Makassar', 'Asia/Jayapura'],
        Iran: 'Asia/Tehran',
        Iraq: 'Asia/Baghdad',
        Ireland: 'Europe/Dublin',
        Israel: 'Asia/Jerusalem',
        Italy: 'Europe/Rome',
        IvoryCoast: 'Africa/Abidjan',
        Jamaica: 'America/Jamaica',
        Japan: 'Asia/Tokyo',
        Jordan: 'Asia/Amman',
        Kazakhstan: ['Asia/Almaty', 'Asia/Aqtobe', 'Asia/Aqtau', 'Asia/Atyrau', 'Asia/Qyzylorda'],
        Kenya: 'Africa/Nairobi',
        Kiribati: ['Pacific/Tarawa', 'Pacific/Kiritimati', 'Pacific/Enderbury'],
        Kuwait: 'Asia/Kuwait',
        Kyrgyzstan: 'Asia/Bishkek',
        Laos: 'Asia/Vientiane',
        Latvia: 'Europe/Riga',
        Lebanon: 'Asia/Beirut',
        Lesotho: 'Africa/Maseru',
        Liberia: 'Africa/Monrovia',
        Libya: 'Africa/Tripoli',
        Liechtenstein: 'Europe/Vaduz',
        Lithuania: 'Europe/Vilnius',
        Luxembourg: 'Europe/Luxembourg',
        Madagascar: 'Indian/Antananarivo',
        Malawi: 'Africa/Blantyre',
        Malaysia: 'Asia/Kuala_Lumpur',
        Maldives: 'Indian/Maldives',
        Mali: 'Africa/Bamako',
        Malta: 'Europe/Malta',
        MarshallIslands: 'Pacific/Majuro',
        Mauritania: 'Africa/Nouakchott',
        Mauritius: 'Indian/Mauritius',
        Mexico: [
            'America/Mexico_City', 'America/Cancun', 'America/Merida', 'America/Monterrey',
            'America/Chihuahua', 'America/Hermosillo', 'America/Tijuana', 'America/Mazatlan'
        ],
        Micronesia: ['Pacific/Chuuk', 'Pacific/Pohnpei', 'Pacific/Kosrae'],
        Moldova: 'Europe/Chisinau',
        Monaco: 'Europe/Monaco',
        Mongolia: ['Asia/Ulaanbaatar', 'Asia/Hovd', 'Asia/Choibalsan'],
        Montenegro: 'Europe/Podgorica',
        Morocco: 'Africa/Casablanca',
        Mozambique: 'Africa/Maputo',
        Myanmar: 'Asia/Yangon',
        Namibia: 'Africa/Windhoek',
        Nauru: 'Pacific/Nauru',
        Nepal: 'Asia/Kathmandu',
        Netherlands: 'Europe/Amsterdam',
        NewZealand: ['Pacific/Auckland', 'Pacific/Chatham'],
        Nicaragua: 'America/Managua',
        Niger: 'Africa/Niamey',
        Nigeria: 'Africa/Lagos',
        NorthKorea: 'Asia/Pyongyang',
        NorthMacedonia: 'Europe/Skopje',
        Norway: 'Europe/Oslo',
        Oman: 'Asia/Muscat',
        Pakistan: 'Asia/Karachi',
        Palau: 'Pacific/Palau',
        Palestine: 'Asia/Gaza',
        Panama: 'America/Panama',
        PapuaNewGuinea: 'Pacific/Port_Moresby',
        Paraguay: 'America/Asuncion',
        Peru: 'America/Lima',
        Philippines: 'Asia/Manila',
        Poland: 'Europe/Warsaw',
        Portugal: 'Europe/Lisbon',
        Qatar: 'Asia/Qatar',
        Romania: 'Europe/Bucharest',
        Russia: [
            'Europe/Moscow', 'Europe/Kaliningrad', 'Europe/Samara', 'Asia/Yekaterinburg', 'Asia/Omsk',
            'Asia/Novosibirsk', 'Asia/Barnaul', 'Asia/Tomsk', 'Asia/Krasnoyarsk', 'Asia/Irkutsk',
            'Asia/Chita', 'Asia/Yakutsk', 'Asia/Vladivostok', 'Asia/Magadan', 'Asia/Sakhalin',
            'Asia/Srednekolymsk', 'Asia/Kamchatka', 'Asia/Anadyr'
        ],
        Rwanda: 'Africa/Kigali',
        SaintKittsAndNevis: 'America/St_Kitts',
        SaintLucia: 'America/St_Lucia',
        SaintVincentAndTheGrenadines: 'America/St_Vincent',
        Samoa: 'Pacific/Apia',
        SanMarino: 'Europe/San_Marino',
        SaoTomeAndPrincipe: 'Africa/Sao_Tome',
        SaudiArabia: 'Asia/Riyadh',
        Senegal: 'Africa/Dakar',
        Serbia: 'Europe/Belgrade',
        Seychelles: 'Indian/Mahe',
        SierraLeone: 'Africa/Freetown',
        Singapore: 'Asia/Singapore',
        Slovakia: 'Europe/Bratislava',
        Slovenia: 'Europe/Ljubljana',
        SolomonIslands: 'Pacific/Guadalcanal',
        Somalia: 'Africa/Mogadishu',
        SouthAfrica: 'Africa/Johannesburg',
        SouthKorea: 'Asia/Seoul',
        SouthSudan: 'Africa/Juba',
        Spain: ['Europe/Madrid', 'Atlantic/Canary'],
        SriLanka: 'Asia/Colombo',
        Sudan: 'Africa/Khartoum',
        Suriname: 'America/Paramaribo',
        Sweden: 'Europe/Stockholm',
        Switzerland: 'Europe/Zurich',
        Syria: 'Asia/Damascus',
        Taiwan: 'Asia/Taipei',
        Tajikistan: 'Asia/Dushanbe',
        Tanzania: 'Africa/Dar_es_Salaam',
        Thailand: 'Asia/Bangkok',
        TimorLeste: 'Asia/Dili',
        Togo: 'Africa/Lome',
        Tonga: 'Pacific/Tongatapu',
        TrinidadAndTobago: 'America/Port_of_Spain',
        Tunisia: 'Africa/Tunis',
        Turkey: 'Europe/Istanbul',
        Turkmenistan: 'Asia/Ashgabat',
        Tuvalu: 'Pacific/Funafuti',
        Uganda: 'Africa/Kampala',
        Ukraine: 'Europe/Kyiv',
        UnitedArabEmirates: 'Asia/Dubai',
        UnitedKingdom: 'Europe/London',
        UnitedStates: [
            'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
            'America/Anchorage', 'America/Honolulu', 'America/Phoenix', 'America/Detroit',
            'America/Indiana/Indianapolis', 'America/Kentucky/Louisville', 'Pacific/Guam',
            'Pacific/Saipan', 'America/Puerto_Rico', 'Pacific/Pago_Pago'
        ],
        Uruguay: 'America/Montevideo',
        Uzbekistan: 'Asia/Tashkent',
        Vanuatu: 'Pacific/Efate',
        VaticanCity: 'Europe/Vatican',
        Venezuela: 'America/Caracas',
        Vietnam: 'Asia/Ho_Chi_Minh',
        Yemen: 'Asia/Aden',
        Zambia: 'Africa/Lusaka',
        Zimbabwe: 'Africa/Harare'
    };

    const timezoneMap = Object.entries(countryTimezones).reduce((map, [key, value]) => {
        map[key.toLowerCase()] = value;
        return map;
    }, {});

    useEffect(() => {
        const interval = setInterval(() => {
            setLocalTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (date, timeZone = undefined) => {
        return date.toLocaleTimeString('en-US', {
            hour12: !timeFormat24,
            timeZone: timeZone,
        });
    };

    const handleSearch = async () => {
        const countryNameInput = countryInput.trim();
        if (!countryNameInput) return;

        const timeZone = timezoneMap[countryNameInput.toLowerCase()];
        if (!timeZone) {
            Swal.fire({
                title: `${countryNameInput} Not found!`,
                text: `Country not supported or not found in mapping.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'OK',
                reverseButtons: true,
            });
            return;
        }

        const zones = Array.isArray(timeZone) ? timeZone : [timeZone];

        // If the country has multiple time zones
        if (zones.length > 1) {
            const { value: selectedZone } = await Swal.fire({
                title: `Select a time zone for ${capitalizeWords(countryNameInput)}`,
                input: 'select',
                inputOptions: zones.reduce((acc, z) => {
                    acc[z] = z;
                    return acc;
                }, {}),
                inputPlaceholder: 'Select a time zone',
                showCancelButton: true,
            });

            if (!selectedZone) return;

            // Update or add country with multiple time zones
            setCountryTimes((prev) => {
                // Check if the country already exists
                const existingCountry = prev.find(entry => entry.name.toLowerCase() === countryNameInput.toLowerCase());

                if (existingCountry) {
                    // If it exists, only update the time zones (avoid duplicates)
                    const updatedTimeZones = [...new Set([...existingCountry.timeZones, selectedZone])];
                    return prev.map(entry =>
                        entry.name.toLowerCase() === countryNameInput.toLowerCase()
                            ? { ...entry, timeZones: updatedTimeZones }
                            : entry
                    );
                } else {
                    // If it doesn't exist, add a new entry with the selected time zone
                    return [
                        ...prev,
                        { name: countryNameInput, timeZones: [selectedZone] },
                    ];
                }
            });
        } else {
            // If there's only one time zone
            setCountryTimes((prev) => {
                // Check if the country already exists
                const existingCountry = prev.find(entry => entry.name.toLowerCase() === countryNameInput.toLowerCase());

                if (existingCountry) {
                    return prev; // Country already exists, don't add again
                } else {
                    return [
                        ...prev,
                        { name: countryNameInput, timeZones: zones },
                    ];
                }
            });
        }

        setCountryInput('');
    };



    const handleReset = () => {
        setCountryTimes([]);
    };

    const handleToggleFormat = () => {
        setTimeFormat24((prev) => !prev);
    };

    const capitalizeWords = (str) => str.replace(/\b\w/g, (char) => char.toUpperCase());

    return (
        <div className="text-center">
            <h2 className="text-gray-300 text-xl font-semibold mb-4">Digital Watch</h2>
            <div className="bg-gray-800 text-green-400 font-mono text-4xl py-6 rounded-lg shadow-inner mb-6">
                {formatTime(localTime)}
            </div>
            <div className="mb-4">
                <div className="text-sm text-left text-gray-300 space-y-2">
                    {countryTimes.map((entry, idx) => (
                        <div key={idx} className="bg-gray-800 p-2 mb-4 rounded text-left">
                            <div className="font-semibold text-white mb-1">{capitalizeWords(entry.name)}</div>
                            {entry.timeZones.map((zone, zoneIdx) => (
                                <div key={zoneIdx} className="text-gray-300 text-sm">
                                    <strong>{zone}</strong>: {formatTime(localTime, zone)}
                                </div>
                            ))}
                        </div>
                    ))}

                </div>
                <input
                    type="text"
                    value={countryInput}
                    onChange={(e) => setCountryInput(e.target.value)}
                    placeholder="Enter country name (e.g. India)"
                    className="w-full px-3 mt-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
                />
                <button
                    onClick={handleSearch}
                    className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition"
                >
                    Add Time Zone
                </button>
            </div>
            <div className="flex justify-between space-x-4 mt-6">
                <button
                    onClick={handleToggleFormat}
                    className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-500 transition"
                >
                    Format: {timeFormat24 ? '24H' : '12H'}
                </button>
                <button
                    onClick={handleReset}
                    className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-500 transition 
          mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

// Alarm Component
const Alarm = ({ audioRef }) => {
    const [time, setTime] = useState(new Date());
    const [alarms, setAlarms] = useState([]);
    const [inputTime, setInputTime] = useState('');
    const [is24Hour, setIs24Hour] = useState(false);
    const alarmTriggeredRef = useRef(new Set());

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour12: !is24Hour });
    };

    const getComparableTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour12: false });
    };

    const addAlarm = () => {
        if (inputTime) {
            const formattedTime = inputTime.length === 5 ? inputTime + ':00' : inputTime;
            if (!alarms.includes(formattedTime)) {
                setAlarms([...alarms, formattedTime]);
                setInputTime('');
            }
        }
    };

    const removeAlarm = (alarmToRemove) => {
        setAlarms(alarms.filter((alarm) => alarm !== alarmToRemove));
        alarmTriggeredRef.current.delete(alarmToRemove);
    };

    const resetAllAlarms = () => {
        setAlarms([]);
        alarmTriggeredRef.current.clear();
    };

    const toggleFormat = () => {
        setIs24Hour(!is24Hour);
    };

    const triggerAlarm = (alarm) => {
        const timeParts = alarm.split(':');
        if (timeParts.length !== 3 || timeParts.some((part) => isNaN(Number(part)))) {
            console.error('Invalid alarm time format:', alarm);
            return;
        }
        audioRef.current.play();
        Swal.fire({
            title: '⏰ Alarm Ringing!',
            text: `It's time for ${alarm}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Later (1 min)',
            cancelButtonText: 'Dismiss',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const [hour, minute, second] = alarm.split(':').map(Number);
                const newTime = new Date();
                newTime.setHours(hour);
                newTime.setMinutes(minute);
                newTime.setSeconds(Number(second) + 60);
                const newAlarm = getComparableTime(newTime);
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                if (!alarms.includes(newAlarm)) {
                    setAlarms((prev) => [...prev, newAlarm]);
                    alarmTriggeredRef.current.delete(newAlarm);
                }
            } else {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                removeAlarm(alarm);
            }
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setTime(now);
            const nowStr = getComparableTime(now);
            alarms.forEach((alarm) => {
                if (alarm === nowStr && !alarmTriggeredRef.current.has(alarm)) {
                    alarmTriggeredRef.current.add(alarm);
                    triggerAlarm(alarm);
                }
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [alarms]);

    return (
        <div className="text-center">
            <h2 className="text-gray-300 text-xl font-semibold mb-4">Digital Alarm</h2>
            <div className="bg-gray-800 text-green-400 font-mono text-4xl py-6 rounded-lg shadow-inner mb-6">
                {formatTime(time)}
            </div>
            <div className="mb-4">
                <input
                    type="time"
                    value={inputTime}
                    onChange={(e) => setInputTime(e.target.value)}
                    className="w-full bg-gray-700 text-white p-2 rounded mb-2"
                />
                <button
                    onClick={addAlarm}
                    className="w-full bg-blue-600 py-2 rounded hover:bg-blue-500 transition"
                >
                    Add Alarm
                </button>
            </div>
            {alarms.length > 0 && (
                <div className="mb-4 text-left">
                    <p className="text-sm mb-2 text-gray-400">Set Alarms:</p>
                    <ul className="space-y-1">
                        {alarms.map((alarm, index) => (
                            <li key={index} className="flex justify-between items-center text-sm bg-gray-800 px-2 py-1 rounded">
                                <span>{alarm}</span>
                                <button
                                    onClick={() => removeAlarm(alarm)}
                                    className="text-red-400 hover:text-red-600"
                                >
                                    ✕
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="flex justify-between space-x-4">
                <button
                    className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-500 transition"
                    onClick={toggleFormat}
                >
                    Format: {is24Hour ? '24H' : '12H'}
                </button>
                <button
                    className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-500 transition"
                    onClick={resetAllAlarms}
                >
                    Reset Alarms
                </button>
            </div>
        </div>
    );
};

// Main Component
const Main = () => {
    const [mode, setMode] = useState('Watch');
    const audioRef = useRef(new Audio(audiof));

    useEffect(() => {
        audioRef.current.onerror = () => {
            console.error('Failed to load the alarm audio file');
        };
        audioRef.current.load();
        return () => {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        };
    }, []);

    const renderContent = () => {
        switch (mode) {
            case 'Watch':
                return <Watch />;
            case 'Stopwatch':
                return <Stopwatch audioRef={audioRef} />;
            case 'Timer':
                return <Timer />;
            case 'Alarm':
                return <Alarm audioRef={audioRef} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="relative w-full max-w-2xl my-6">
                <div className="animated-border">
                    <div className="inner-content p-6 ">
                        <div className="flex justify-between gap-1 sm:gap-4 mb-4 overflow-hidden">
                            {['Watch', 'Stopwatch', 'Timer', 'Alarm'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setMode(tab)}
                                    className={`flex-grow basis-0 min-w-0 px-2 py-2 rounded text-sm sm:text-base overflow-hidden whitespace-nowrap text-ellipsis ${mode === tab
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-700 text-gray-300'
                                        } hover:bg-blue-500 transition`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>


                        {renderContent()}
                        <div className="mt-6">
                            <Link to="/" className="text-sm text-blue-400 hover:underline">
                                ← Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
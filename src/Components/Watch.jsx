import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

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
        'Australia/Sydney',
        'Australia/Melbourne',
        'Australia/Brisbane',
        'Australia/Adelaide',
        'Australia/Perth',
        'Australia/Darwin',
        'Australia/Hobart',
        'Australia/Eucla',
        'Australia/Lord_Howe'
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
        'America/Sao_Paulo',
        'America/Manaus',
        'America/Recife',
        'America/Belem',
        'America/Fortaleza',
        'America/Cuiaba',
        'America/Porto_Velho',
        'America/Boa_Vista',
        'America/Rio_Branco',
        'America/Noronha'
    ],
    Brunei: 'Asia/Brunei',
    Bulgaria: 'Europe/Sofia',
    BurkinaFaso: 'Africa/Ouagadougou',
    Burundi: 'Africa/Gitega',
    Cambodia: 'Asia/Phnom_Penh',
    Cameroon: 'Africa/Douala',
    Canada: [
        'America/Toronto',
        'America/Vancouver',
        'America/Winnipeg',
        'America/Regina',
        'America/Halifax',
        'America/Edmonton',
        'America/St_Johns',
        'America/Whitehorse',
        'America/Yellowknife',
        'America/Iqaluit',
        'America/Rankin_Inlet'
    ],
    CapeVerde: 'Atlantic/Cape_Verde',
    CentralAfricanRepublic: 'Africa/Bangui',
    Chad: 'Africa/Ndjamena',
    Chile: [
        'America/Santiago',
        'Pacific/Easter'
    ],
    China: 'Asia/Shanghai',
    Colombia: 'America/Bogota',
    Comoros: 'Indian/Comoro',
    Congo: 'Africa/Brazzaville',
    CostaRica: 'America/Costa_Rica',
    Croatia: 'Europe/Zagreb',
    Cuba: 'America/Havana',
    Cyprus: 'Asia/Nicosia',
    CzechRepublic: 'Europe/Prague',
    DemocraticRepublicOfCongo: [
        'Africa/Kinshasa',
        'Africa/Lubumbashi'
    ],
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
        'Europe/Paris',
        'Indian/Reunion',
        'Indian/Mayotte',
        'Pacific/Tahiti',
        'Pacific/Noumea',
        'Pacific/Marquesas',
        'America/Martinique',
        'America/Guadeloupe',
        'America/Cayenne',
        'Indian/Kerguelen'
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
    Indonesia: [
        'Asia/Jakarta',
        'Asia/Makassar',
        'Asia/Jayapura'
    ],
    Iran: 'Asia/Tehran',
    Iraq: 'Asia/Baghdad',
    Ireland: 'Europe/Dublin',
    Israel: 'Asia/Jerusalem',
    Italy: 'Europe/Rome',
    IvoryCoast: 'Africa/Abidjan',
    Jamaica: 'America/Jamaica',
    Japan: 'Asia/Tokyo',
    Jordan: 'Asia/Amman',
    Kazakhstan: [
        'Asia/Almaty',
        'Asia/Aqtobe',
        'Asia/Aqtau',
        'Asia/Atyrau',
        'Asia/Qyzylorda'
    ],
    Kenya: 'Africa/Nairobi',
    Kiribati: [
        'Pacific/Tarawa',
        'Pacific/Kiritimati',
        'Pacific/Enderbury'
    ],
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
        'America/Mexico_City',
        'America/Cancun',
        'America/Merida',
        'America/Monterrey',
        'America/Chihuahua',
        'America/Hermosillo',
        'America/Tijuana',
        'America/Mazatlan'
    ],
    Micronesia: [
        'Pacific/Chuuk',
        'Pacific/Pohnpei',
        'Pacific/Kosrae'
    ],
    Moldova: 'Europe/Chisinau',
    Monaco: 'Europe/Monaco',
    Mongolia: [
        'Asia/Ulaanbaatar',
        'Asia/Hovd',
        'Asia/Choibalsan'
    ],
    Montenegro: 'Europe/Podgorica',
    Morocco: 'Africa/Casablanca',
    Mozambique: 'Africa/Maputo',
    Myanmar: 'Asia/Yangon',
    Namibia: 'Africa/Windhoek',
    Nauru: 'Pacific/Nauru',
    Nepal: 'Asia/Kathmandu',
    Netherlands: 'Europe/Amsterdam',
    NewZealand: [
        'Pacific/Auckland',
        'Pacific/Chatham'
    ],
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
        'Europe/Moscow',
        'Europe/Kaliningrad',
        'Europe/Samara',
        'Asia/Yekaterinburg',
        'Asia/Omsk',
        'Asia/Novosibirsk',
        'Asia/Barnaul',
        'Asia/Tomsk',
        'Asia/Krasnoyarsk',
        'Asia/Irkutsk',
        'Asia/Chita',
        'Asia/Yakutsk',
        'Asia/Vladivostok',
        'Asia/Magadan',
        'Asia/Sakhalin',
        'Asia/Srednekolymsk',
        'Asia/Kamchatka',
        'Asia/Anadyr'
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
    Spain: [
        'Europe/Madrid',
        'Atlantic/Canary'
    ],
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
    UK: 'Europe/London',
    UnitedStates: [
        'America/New_York',
        'America/Chicago',
        'America/Denver',
        'America/Los_Angeles',
        'America/Anchorage',
        'America/Honolulu',
        'America/Phoenix',
        'America/Detroit',
        'America/Indiana/Indianapolis',
        'America/Kentucky/Louisville',
        'Pacific/Guam',
        'Pacific/Saipan',
        'America/Puerto_Rico',
        'Pacific/Pago_Pago'
    ],
     USA: [
        'America/New_York',
        'America/Chicago',
        'America/Denver',
        'America/Los_Angeles',
        'America/Anchorage',
        'America/Honolulu',
        'America/Phoenix',
        'America/Detroit',
        'America/Indiana/Indianapolis',
        'America/Kentucky/Louisville',
        'Pacific/Guam',
        'Pacific/Saipan',
        'America/Puerto_Rico',
        'Pacific/Pago_Pago'
    ],
    America: [
        'America/New_York',
        'America/Chicago',
        'America/Denver',
        'America/Los_Angeles',
        'America/Anchorage',
        'America/Honolulu',
        'America/Phoenix',
        'America/Detroit',
        'America/Indiana/Indianapolis',
        'America/Kentucky/Louisville',
        'Pacific/Guam',
        'Pacific/Saipan',
        'America/Puerto_Rico',
        'Pacific/Pago_Pago'
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

// Create a lowercase map for case-insensitive search
const timezoneMap = Object.entries(countryTimezones).reduce((map, [key, value]) => {
    map[key.toLowerCase()] = value;
    return map;
}, {});


const Watch = () => {
    const [localTime, setLocalTime] = useState(new Date());
    const [timeFormat24, setTimeFormat24] = useState(false);
    const [countryInput, setCountryInput] = useState('');
    const [countryTimes, setCountryTimes] = useState([]);

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

            setCountryTimes((prev) => [
                ...prev,
                {
                    name: countryNameInput,
                    timeZones: [selectedZone],
                },
            ]);
        } else {
            // Only one time zone
            setCountryTimes((prev) => [
                ...prev,
                {
                    name: countryNameInput,
                    timeZones: zones,
                },
            ]);
        }

        setCountryInput('');
    };

    const handleReset = () => {
        setCountryTimes([]);
    };

    const handleToggleFormat = () => {
        setTimeFormat24((prev) => !prev);
    };
    const capitalizeWords = (str) =>
        str.replace(/\b\w/g, (char) => char.toUpperCase());

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="relative w-full max-w-sm">
                <div className="animated-border p-[4px] rounded-2xl">
                    <div className="bg-black rounded-2xl p-6 text-center">
                        <h2 className="text-gray-300 text-xl font-semibold mb-4">Digital Watch</h2>

                        {/* Main Clock */}
                        <div className="bg-gray-800 text-green-400 font-mono text-4xl py-6 rounded-lg shadow-inner mb-6">
                            {formatTime(localTime)}
                        </div>

                        {/* Search Country */}
                        <div className="mb-4">
                            {/* Country Times */}
                            <div className="text-sm text-left text-gray-300 space-y-2">
                                {countryTimes.map((entry, idx) => (
                                    <div key={idx} className="bg-gray-800 p-2 mb-4 rounded text-left">
                                        <div className="font-semibold text-white mb-1">
                                            {capitalizeWords(entry.name)}
                                        </div>

                                        <div className="text-gray-300 text-sm">
                                            {/* <span className="text-blue-400">{entry.timeZones[0]}</span>: */}
                                            {formatTime(localTime, entry.timeZones[0])}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <input
                                type="text"
                                value={countryInput}
                                onChange={(e) => setCountryInput(e.target.value)}
                                placeholder="Enter country (e.g. India)"
                                className="w-full px-3 mt-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
                            />
                            <button
                                onClick={handleSearch}
                                className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition"
                            >
                                Add Time Zone
                            </button>
                        </div>



                        {/* Buttons */}
                        <div className="flex justify-between space-x-4 mt-6">
                            <button
                                onClick={handleToggleFormat}
                                className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-500 transition"
                            >
                                Format: {timeFormat24 ? '24H' : '12H'}
                            </button>
                            <button
                                onClick={handleReset}
                                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-500 transition"
                            >
                                Reset
                            </button>
                        </div>

                        {/* Back link */}
                        <div className="mt-6">
                            <Link to="/functions" className="text-sm text-blue-400 hover:underline">
                                ← Back to Menu
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Watch;

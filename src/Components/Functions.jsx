import React from 'react';
import { Link } from 'react-router-dom';

const Functions = () => {
    const tools = [
        {
            name: 'Watch',
            path: '/watch',
            description: 'Keep track of real-time clock across different time zones.',
            icon: '⌚',
        },
        {
            name: 'Stopwatch',
            path: '/stopwatch',
            description: 'Measure elapsed time with precision and ease.',
            icon: '⏱️',
        },
        {
            name: 'Timer',
            path: '/timer',
            description: 'Set a countdown and get notified when time is up.',
            icon: '⏲️',
        },
        {
            name: 'Alarm',
            path: '/alarm',
            description: 'Set alarms for important tasks and reminders.',
            icon: '⏰',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12">
            {/* Header */}
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div className="w-full">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2 md:text-left text-center">
                            Explore Time Tools
                        </h1>
                        <p className="text-gray-600 text-base max-w-xl mx-auto md:mx-0 md:text-left text-center">
                            Choose from a set of beautifully designed and functional time tools to help you manage your schedule effectively.
                        </p>
                    </div>

                    <div className="w-full flex justify-center md:justify-end">
                        <Link
                            to="/"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition whitespace-nowrap"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>


                {/* Tools Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {tools.map((tool) => (
                        <Link
                            key={tool.name}
                            to={tool.path}
                            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition p-6 flex items-start gap-4"
                        >
                            <div className="text-4xl">{tool.icon}</div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-1">{tool.name}</h2>
                                <p className="text-gray-600 text-sm">{tool.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Footer Note */}
                <div className="text-center mt-16 text-gray-500 text-sm">
                    More tools and features coming soon. Stay tuned!
                </div>
            </div>
        </div>
    );
};

export default Functions;

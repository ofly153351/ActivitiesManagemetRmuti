import React, { useState } from 'react';
import { filterActivities } from '../Utils/handler';
import Accordion from './Acordion';

function Activity({ searchQuery }) {
    const activities = [
        { id: 1, name: 'Event One', location: 'Location One', credits: 3 },
        { id: 2, name: 'Event Two', location: 'Location Two', credits: 2 },
        { id: 3, name: 'Event Three', location: 'Location Three', credits: 4 },
        { id: 4, name: 'Event Four', location: 'Location Four', credits: 1 },
        { id: 5, name: 'Event Five', location: 'Location Five', credits: 5 },
        { id: 6, name: 'Event Six', location: 'Location Six', credits: 3 },
        { id: 7, name: 'Event Seven', location: 'Location Seven', credits: 2 },
        { id: 8, name: 'Event Eight', location: 'Location Eight', credits: 3 },
    ];

    const filteredActivities = filterActivities(activities, searchQuery);

    return (
        <div>
            {filteredActivities.map((activity) => (
                <div
                    key={activity.id}
                    className="mx-4 p-4 items-center hover:bg-stone-100 border-b border-gray-200"
                >
                    <div className="flex justify-between">
                        <div>
                            <div className="text-2xl font-kanit">
                                ชื่อ: {activity.name}
                            </div>
                            <div className="px-4 py-2 font-kanit">
                                สถานที่: {activity.location}
                            </div>
                            <div className="px-4 py-2 font-kanit">
                                หน่วยกิต: {activity.credits}
                            </div>
                        </div>
                        <div className="images w-[200px] h-[150px] border flex justify-center items-center">
                            200x150
                        </div>
                    </div>
                    {/* แสดง Accordion */}
                    <Accordion activity={activity} />
                </div>
            ))}
        </div>
    );
}

export default Activity;
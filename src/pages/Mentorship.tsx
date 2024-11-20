import { Key, useEffect, useState } from "react";

interface Member {
    id: Key | null | undefined;
    name: string;
    role: string;
}

export function Community() {
    const [members, setMembers] = useState<Member[]>([]);
    useEffect(() => {
        fetch('http://localhost:5000/api/community')
            .then((res) => res.json())
            .then((data) => setMembers(data))
            .catch((error) => console.error("Error fetching community:", error));
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold">Community</h2>
            <ul>
                {members.map((member) => (
                    <li key={member.id}>
                        {member.name} - {member.role}
                    </li>
                ))}
            </ul>
        </div>
    );
}

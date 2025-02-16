import { useState, useEffect } from "react";

const Profile = ({ userId }) => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (!userId) return;

        // ✅ Mock Data Instead of API Call
        const mockProfile = {
            id: userId,
            name: "John Doe",
            bio: "Experienced dog walker with 5 years in the field.",
            experience: "5 years",
            certifications: "Pet First Aid Certified",
            pricing: "$20/hr",
            availability: "Weekdays",
            rating: 4.8,
        };

        // Simulating an API delay
        setTimeout(() => setProfile(mockProfile), 1000);
    }, [userId]);

    return (
        <div>
            {profile ? (
                <>
                    <h2>{profile.name}</h2>
                    <p>{profile.bio}</p>
                    <p><strong>Experience:</strong> {profile.experience}</p>
                    <p><strong>Certifications:</strong> {profile.certifications}</p>
                    <p><strong>Pricing:</strong> {profile.pricing}</p>
                    <p><strong>Availability:</strong> {profile.availability}</p>
                    <p><strong>Rating:</strong> {profile.rating} ⭐</p>
                </>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default Profile;

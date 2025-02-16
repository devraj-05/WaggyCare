import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DogWalkersPage.css";

const DogWalkersPage = () => {
    const [dogWalkers, setDogWalkers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mockData = [
                    {
                        id: 1,
                        name: "Jane Doe",
                        photo: "/images/default.jpg",
                        bio: "Experienced dog walker with 5 years in the field.",
                        experience: "5 years",
                        certifications: "Pet First Aid Certified",
                        pricing: "$20/hr",
                        availability: "Weekdays",
                        rating: 4.8,
                        specialties: ["Large dogs", "High-energy dogs"],
                    },
                    {
                        id: 2,
                        name: "John Smith",
                        photo: "/images/default.jpg",
                        bio: "Dog trainer & walker with 7 years experience.",
                        experience: "7 years",
                        certifications: "Certified Dog Trainer",
                        pricing: "$25/hr",
                        availability: "Weekends",
                        rating: 4.5,
                        specialties: ["Puppies", "Aggressive dogs"],
                    },
                    {
                        id: 2,
                        name: "John Wick",
                        photo: "/images/default.jpg",
                        bio: "Dog trainer & walker with 7 years experience.",
                        experience: "7 years",
                        certifications: "Certified Dog Trainer",
                        pricing: "$25/hr",
                        availability: "Weekends",
                        rating: 4.5,
                        specialties: ["Puppies", "Aggressive dogs"]
                    }
                ];
                setDogWalkers(mockData);
            } catch (error) {
                console.error("Error fetching the data:", error);
            }
        };

        fetchData();
    }, []);

    const handleBookNow = (walker) => {
        navigate("/bookingpage", { state: { selectedWalker: walker } });
    };

    return (
        <div className="dog-walkers-page">
            <h1>Browse Dog Walkers</h1>
            <div className="dog-walker-list">
                {dogWalkers.map((walker) => (
                    <div className="dog-walker-card" key={walker.id}>
                        <h3>{walker.name}</h3>
                        <p>{walker.bio}</p>
                        <p>
                            <strong>Experience:</strong> {walker.experience}
                        </p>
                        <p>
                            <strong>Certifications:</strong>{" "}
                            {walker.certifications}
                        </p>
                        <p>
                            <strong>Pricing:</strong> {walker.pricing}
                        </p>
                        <p>
                            <strong>Availability:</strong>{" "}
                            {walker.availability}
                        </p>
                        <p>
                            <strong>Rating:</strong> {walker.rating} ⭐
                        </p>
                        <p>
                            <strong>Specialties:</strong>{" "}
                            {walker.specialties.join(", ")}
                        </p>
                        <button
                            className="book-btn"
                            onClick={() => handleBookNow(walker)}
                        >
                            Book Me
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DogWalkersPage;

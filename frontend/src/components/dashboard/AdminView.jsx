import React, { useState } from "react";
import api from "../../services/api";

export const AdminView = () => {
    const [showReviews, setShowReviews] = useState(false);
    const [reviews, setReviews] = useState([]);

    const fetchReviews = async () => {
        try {
            const res = await api.get("/reviews");
            setReviews(res.data);
            setShowReviews(true);
        } catch (err) {
            alert("Eroare la incarcarea review-urilor.");
        }
    };

    const handleDeleteReview = async (id) => {
        try {
            await api.delete(`/reviews/${id}`);
            setReviews(reviews.filter((r) => r.id !== id));
        } catch (err) {
            alert("Eroare la stergere.");
        }
    };

    return (
        <div className="space-y-6 text-red-700">
            <h2 className="text-2xl font-bold">Panou Administrare Sistem</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black">
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
                    <p className="text-gray-500 text-sm">Total Utilizatori</p>
                    <p className="text-2xl font-bold">124</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
                    <p className="text-gray-500 text-sm">Servicii Active</p>
                    <p className="text-2xl font-bold">45</p>
                </div>
                <button
                    onClick={fetchReviews}
                    className="bg-red-600 text-white font-bold rounded-xl hover:bg-red-800 transition-colors"
                >
                    Moderează Review-uri
                </button>
            </div>

            {showReviews && (
                <div className="mt-8 bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 animate-fadeIn">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-black">Review-uri Platformă</h3>
                        <button
                            onClick={() => setShowReviews(false)}
                            className="text-red-500 font-bold hover:text-red-700"
                        >
                            Închide panoul
                        </button>
                    </div>

                    {reviews.length === 0 ? (
                        <p className="text-gray-500 italic">Nu există review-uri în sistem în acest moment.</p>
                    ) : (
                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                            {reviews.map((review) => (
                                <div key={review.id} className="border border-gray-200 p-4 rounded-lg flex justify-between items-start bg-gray-50">
                                    <div>
                                        <p className="font-bold text-black">{review.booking?.client?.name || "Client necunoscut"}</p>
                                        <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
                                            Serviciu: {review.booking?.service?.title || "Nespecificat"}
                                        </p>
                                        <p className="text-yellow-500 text-lg tracking-widest">
                                            {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                                        </p>
                                        <p className="text-gray-800 mt-2 font-medium">{review.comment}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteReview(review.id)}
                                        className="bg-red-100 text-red-600 px-4 py-2 text-sm font-bold rounded hover:bg-red-200 transition-colors"
                                    >
                                        Șterge
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
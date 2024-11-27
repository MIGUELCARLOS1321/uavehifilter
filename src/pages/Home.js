import styles from "./Home.module.css";
import UAlogo from "../assets/UAlogo.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

    const [withResults, setWithResults] = useState(false);
    const [stickerNumber, setStickerNumber] = useState("");
    const [plateNumber, setPlateNumber] = useState(""); // Added state for plateNumber
    const [vehicleType, setVehicleType] = useState("");
    const [vehicleColor, setVehicleColor] = useState(""); // Added state for vehicleColor
    const [vehicleBrand, setVehicleBrand] = useState(""); // Added state for vehicleBrand
    const [searchResults, setSearchResults] = useState([]); // Changed state to an array for multiple results

    const handleSearch = async (e) => {
        e.preventDefault();
        // Check if all inputs are empty (sticker number, plate number, vehicle type, vehicle color, vehicle brand)
        if (!stickerNumber.trim() && !plateNumber.trim() && !vehicleType.trim() && !vehicleColor.trim() && !vehicleBrand.trim()) {
            toast.warn("Please enter a valid sticker number, plate number, vehicle type, vehicle color, or vehicle brand.");
            return;
        }
    
        let allResults = []; // To store results from all searches
        let seenDocs = new Set(); // Set to track document IDs to avoid duplicates
    
        try {
            const confirmedDataRef = collection(db, "confirmedData");
    
            // If sticker number is provided, search for matching documents
            if (stickerNumber.trim()) {
                const qSticker = query(confirmedDataRef, where("stickerNumber", "==", stickerNumber));
                const querySnapshotSticker = await getDocs(qSticker);
    
                if (!querySnapshotSticker.empty) {
                    querySnapshotSticker.docs.forEach(doc => {
                        const docData = {
                            id: doc.id, // Store the document ID
                            fullName: doc.data().fullName,
                            carImage: doc.data().carImage,
                            stickerNumber: doc.data().stickerNumber,
                            plateNumber: doc.data().plateNumber,
                            vehicleType: doc.data().vehicleType,
                            vehicleColor: doc.data().vehicleColor,
                            vehicleBrand: doc.data().vehicleBrand
                        };
                        // Check if the document ID is already in the Set
                        if (!seenDocs.has(doc.id)) {
                            allResults.push(docData);
                            seenDocs.add(doc.id); // Add doc ID to Set to prevent future duplicates
                        }
                    });
                }
            }
    
            // If plate number is provided, search for matching documents
            if (plateNumber.trim()) {
                const qPlate = query(confirmedDataRef, where("plateNumber", "==", plateNumber));
                const querySnapshotPlate = await getDocs(qPlate);
    
                if (!querySnapshotPlate.empty) {
                    querySnapshotPlate.docs.forEach(doc => {
                        const docData = {
                            id: doc.id, // Store the document ID
                            fullName: doc.data().fullName,
                            carImage: doc.data().carImage,
                            stickerNumber: doc.data().stickerNumber,
                            plateNumber: doc.data().plateNumber,
                            vehicleType: doc.data().vehicleType,
                            vehicleColor: doc.data().vehicleColor,
                            vehicleBrand: doc.data().vehicleBrand
                        };
                        // Check if the document ID is already in the Set
                        if (!seenDocs.has(doc.id)) {
                            allResults.push(docData);
                            seenDocs.add(doc.id); // Add doc ID to Set to prevent future duplicates
                        }
                    });
                }
            }
    
            // If vehicle type is provided, search for matching documents
            if (vehicleType.trim()) {
                const qType = query(confirmedDataRef, where("vehicleType", "==", vehicleType));
                const querySnapshotType = await getDocs(qType);
    
                if (!querySnapshotType.empty) {
                    querySnapshotType.docs.forEach(doc => {
                        const docData = {
                            id: doc.id, // Store the document ID
                            fullName: doc.data().fullName,
                            carImage: doc.data().carImage,
                            stickerNumber: doc.data().stickerNumber,
                            plateNumber: doc.data().plateNumber,
                            vehicleType: doc.data().vehicleType,
                            vehicleColor: doc.data().vehicleColor,
                            vehicleBrand: doc.data().vehicleBrand
                        };
                        // Check if the document ID is already in the Set
                        if (!seenDocs.has(doc.id)) {
                            allResults.push(docData);
                            seenDocs.add(doc.id); // Add doc ID to Set to prevent future duplicates
                        }
                    });
                }
            }
    
            // If vehicle color is provided, search for matching documents
            if (vehicleColor.trim()) {
                const qColor = query(confirmedDataRef, where("vehicleColor", "==", vehicleColor));
                const querySnapshotColor = await getDocs(qColor);
    
                if (!querySnapshotColor.empty) {
                    querySnapshotColor.docs.forEach(doc => {
                        const docData = {
                            id: doc.id, // Store the document ID
                            fullName: doc.data().fullName,
                            carImage: doc.data().carImage,
                            stickerNumber: doc.data().stickerNumber,
                            plateNumber: doc.data().plateNumber,
                            vehicleType: doc.data().vehicleType,
                            vehicleColor: doc.data().vehicleColor,
                            vehicleBrand: doc.data().vehicleBrand
                        };
                        // Check if the document ID is already in the Set
                        if (!seenDocs.has(doc.id)) {
                            allResults.push(docData);
                            seenDocs.add(doc.id); // Add doc ID to Set to prevent future duplicates
                        }
                    });
                }
            }
    
            // If vehicle brand is provided, search for matching documents
            if (vehicleBrand.trim()) {
                const qBrand = query(confirmedDataRef, where("vehicleBrand", "==", vehicleBrand));
                const querySnapshotBrand = await getDocs(qBrand);
    
                if (!querySnapshotBrand.empty) {
                    querySnapshotBrand.docs.forEach(doc => {
                        const docData = {
                            id: doc.id, // Store the document ID
                            fullName: doc.data().fullName,
                            carImage: doc.data().carImage,
                            stickerNumber: doc.data().stickerNumber,
                            plateNumber: doc.data().plateNumber,
                            vehicleType: doc.data().vehicleType,
                            vehicleColor: doc.data().vehicleColor,
                            vehicleBrand: doc.data().vehicleBrand
                        };
                        // Check if the document ID is already in the Set
                        if (!seenDocs.has(doc.id)) {
                            allResults.push(docData);
                            seenDocs.add(doc.id); // Add doc ID to Set to prevent future duplicates
                        }
                    });
                }
            }
    
            if (allResults.length > 0) {
                setSearchResults(allResults); // Set the array of results
                setWithResults(true);
                toast.success("Search successful! Results found.");
            } else {
                toast.info("No results found for the given criteria.");
                setSearchResults([]); // Clear results if no match found
                setWithResults(false);
            }
        } catch (error) {
            toast.error("An error occurred while fetching data.");
            console.error("Error fetching data:", error);
            setSearchResults([]);
            setWithResults(false);
        }
    };
    

    const navigate = useNavigate();

    return (
        <>
            <ToastContainer />
            <div className={styles.container}>
                <div className={styles.containerBox}>
                    <div className={styles.leftContainer}>
                        <img src={UAlogo} alt="UA Logo" className={styles.logo} />
                        <span>UAVEHICLE</span>
                        <span style={{ fontSize: "1rem" }}>ADMIN</span>
                    </div>
                    <div className={styles.rightContainer}>
                        <div className={styles.cardLeft}>
                            <div className={styles.inputHolder}>
                                <input
                                    type="text"
                                    placeholder="Enter the Sticker Number"
                                    value={stickerNumber}
                                    onChange={(e) => setStickerNumber(e.target.value)}
                                    className={styles.inputField}
                                />
                                <input
                                    type="text"
                                    placeholder="Enter the Plate Number"
                                    value={plateNumber} // Bind the plate number state
                                    onChange={(e) => setPlateNumber(e.target.value)} // Update plate number state
                                    className={styles.inputField}
                                />
                                <select 
                                    name="vehicleType"
                                    onChange={(e) => setVehicleType(e.target.value)}
                                    className={styles.inputField}
                                >
                                    <option value="">Select...</option>
                                    <option value="Sedan">Sedan</option>
                                    <option value="Pick-up">Pick-up</option>
                                    <option value="SUV">SUV (Sports Utility Vehicle)</option>
                                    <option value="Hatchback">Hatchback</option>
                                    <option value="Crossover">Crossover</option>
                                    <option value="Van">Van</option>
                                    <option value="Motorcycle">Motorcycle</option>
                                    <option value="Tricycle">Tricycle</option>
                                    <option value="Other">Other</option>
                                </select>

                                <select 
                                    name="vehicleColor"
                                    onChange={(e) => setVehicleColor(e.target.value)}
                                    className={styles.inputField}
                                >
                                    <option value="">Select...</option>
                                    <option value="White">White</option>
                                    <option value="Black">Black</option>
                                    <option value="Silver">Silver</option>
                                    <option value="Red">Red</option>
                                    <option value="Blue">Blue</option>
                                    <option value="Orange">Orange</option>
                                    <option value="Other">Other</option>
                                </select>
                                <select
                                    name="vehicleBrand"
                                    onChange={(e) => setVehicleBrand(e.target.value)}
                                    className={styles.inputField}
                                >
                                    <option value="">Select...</option>
                                    <option value="Toyota">Toyota</option>
                                    <option value="Nissan">Nissan</option>
                                    <option value="Mitsubishi">Mitsubishi</option>
                                    <option value="Honda">Honda</option>
                                    <option value="Isuzu">Isuzu</option>
                                    <option value="Ford">Ford</option>
                                    <option value="Honda">Honda</option>
                                    <option value="Kawasaki">Kawasaki</option>
                                    <option value="BMW">BMW</option>
                                    <option value="Yamaha">Yamaha</option>
                                    <option value="Suzuki">Suzuki</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className={styles.searchButton} onClick={handleSearch}>
                                Search
                            </div>
                        </div>
                        <div className={styles.cardRight}>
                            {searchResults.length > 0 ? (
                                searchResults.map((result) => (
                                    <div key={result.id} className={styles.resultBox} onClick={() => navigate(`/view?id=${result.id}`)}>
                                        <div className={styles.detailHolder}>
                                            <span style={{fontWeight: "bold"}}>{result.fullName}</span>
                                            <span style={{fontSize: "0.8rem"}}>Sticker Number: {result.stickerNumber}</span>
                                        </div>
                                        <img
                                            src={result.carImage}
                                            alt="Car Image Preview"
                                            className={styles.previewImage}
                                        />
                                    </div>
                                ))
                            ) : (
                                <span>No results found.</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

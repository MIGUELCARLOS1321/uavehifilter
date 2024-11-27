import styles from "./View.module.css";
import UAlogo from "../assets/UAlogo.png";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function View() {

    const [selectedImage, setSelectedImage] = useState(null);

    const navigate = useNavigate();
    
    // Step 1: Get the document ID from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    // Step 2: Define state to store fetched data
    const [data, setData] = useState(null);

    // Step 3: Fetch the document from Firestore when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "confirmedData", id); // Reference to the specific document
                const docSnap = await getDoc(docRef); // Get the document
                
                if (docSnap.exists()) {
                    // If the document exists, set the data in state
                    setData(docSnap.data());
                } else {
                    // If no document is found
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document:", error);
            }
        };

        if (id) {
            fetchData(); // Fetch data if ID is available
        }
    }, [id]);

    const handleImageClick = (image) => {
        setSelectedImage(image); // Set the clicked image for viewing
    };

    const closeImageViewer = () => {
        setSelectedImage(null); // Close the viewer
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.containerBox}>
                    <div className={styles.leftContainer}>
                        <div className={styles.header}>
                            <img src={UAlogo} alt="UA Logo" className={styles.logo} />
                            <span>UAVEHICLE</span>
                            <span style={{ fontSize: "1rem" }}>ADMIN</span>
                        </div>
                        <div className={styles.footer}>
                            <div className={styles.backButton} onClick={() => navigate(-1)}>Go Back</div>
                        </div>
                    </div>
                    <div className={styles.rightContainer}>
                        <div className={styles.leftSide}>
                            <span style={{ fontWeight: "bold", fontSize: "1.5rem", marginBottom: "1rem" }}>Details:</span>
                            
                            {/* Step 5: Display the fetched data */}
                            <span>Registered as: <strong>{data?.type || "N/A"}</strong></span>
                            <span>Sticker Number: <strong>{data?.stickerNumber || "N/A"}</strong></span>
                            <span>Full Name: <strong>{data?.fullName || "N/A"}</strong></span>
                            <span>Address: <strong>{data?.address || "N/A"}</strong></span>
                            <span>Contact Number: <strong>{data?.contactNumber || "N/A"}</strong></span>
                            <span>License Number: <strong>{data?.licenseNumber || "N/A"}</strong></span>
                            <span>Expiry Date: <strong>{data?.expiryDate || "N/A"}</strong></span>
                            <span>Registered Owner: <strong>{data?.registeredOwner || "N/A"}</strong></span>
                            <span>Plate Number: <strong>{data?.plateNumber || "N/A"}</strong></span>
                            <span>Payment Receipt Number: <strong>{data?.receiptNumber || "N/A"}</strong></span>
                            <span>Registration Number: <strong>{data?.registrationNumber || "N/A"}</strong></span>
                            <span>LTO Receipt Number: <strong>{data?.ltoReceiptNumber || "N/A"}</strong></span>
                        </div>
                        <div className={styles.rightSide}>
                            <img src={data?.driverLicenseImage || ''} alt="Driver's License" className={styles.imgCard} onClick={() => handleImageClick(data?.driverLicenseImage)}/>
                            <img src={data?.ltoRegistrationImage || ''} alt="LTO Registration" className={styles.imgCard} onClick={() => handleImageClick(data?.ltoRegistrationImage)}/>
                            <img src={data?.ltoReceiptImage || ''} alt="LTO Receipt" className={styles.imgCard} onClick={() => handleImageClick(data?.ltoReceiptImage)}/>
                            <img src={data?.carImage || ''} alt="Vehicle" className={styles.imgCard} onClick={() => handleImageClick(data?.carImage)}/>
                            <img src={data?.receiptImage || ''} alt="Payment Receipt" className={styles.imgCard} onClick={() => handleImageClick(data?.receiptImage)}/>
                        </div>
                    </div>
                </div>
            </div>
            {selectedImage && (
                <div className={styles.imageViewer} onClick={closeImageViewer}>
                    <div className={styles.viewerContent} onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage} alt="Selected" className={styles.viewerImage} />
                        <button className={styles.closeButton} onClick={closeImageViewer}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
}
